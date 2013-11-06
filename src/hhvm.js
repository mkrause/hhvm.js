define([
        'vendor/underscore',
        'lib/util/binary_converter',
        'lib/instruction_set',
        'lib/stack',
        'lib/dispatcher',
        'lib/variable_store',
        'lib/member_vector'
    ], function(_, BinaryConverter, InstructionSet, Stack, Dispatcher, VariableStore,
            MemberVector) {
        var Hhvm = function(options) {
            options = options || {};
            this.options = _.defaults(options, {
                // Whether or not to use a blocking execution model
                blocking: false,
                // Default output handler: just append to an internal string
                outputHandler: function(str) {
                    this.output += str;
                },
                // Default exit handler
                exitHandler: function(statusCode) {},
                // Default error handler
                errorHandler: function(errorMessage) {}
            });
            
            // Implementation of the HipHop bytecode instruction set
            this.hhbc = new InstructionSet(this);
            
            // The dispatcher that manages the activation frames
            this.dispatcher = new Dispatcher(this);

            // Utility for converting binary encodings
            this.bConverter = new BinaryConverter();
            
            // VM state
            this.running = false;
            this.statusCode = 0;
            
            // I/O
            this.output = "";
            
            // Events
            this.outputHandler = _.bind(this.options.outputHandler, this);
            this.exitHandler = _.bind(this.options.exitHandler, this);
            this.errorHandler = _.bind(this.options.errorHandler, this);
            
            // Registers, memory
            this.prog = null;
            this.heap = {};
            this.globalVars = null;

            // The call stack containing the activation frames.
            this.callStack = new Stack();
            this.currentFrame = null;

            // Points to the stack of the current frame (this.currentFrame.stack)
            this.stack = null;
            this.FPIstack = null;
        };
        
        // Reset state
        Hhvm.prototype.reset = function() {
            this.running = false;
            this.callStack = new Stack();
            this.currentFrame = null;
            this.stack = null;
            this.fpiStack = null;
            this.heap = {};
            this.globalVars = null;
        };
        
        // Change the program counter using an offset
        Hhvm.prototype.offsetPc = function(offset) {
            if (this.currentFrame !== null) {
                this.currentFrame.pc += offset;
            }
        };
        
        // Set the program code to execute
        Hhvm.prototype.program = function(program) {
            this.prog = program;
        };
        
        // Get the next instruction argument in the program, and increment the program counter
        Hhvm.prototype.arg = function(type) {
            var arg;
            var bc = this.prog.getByteCode();
            var pc = this.currentFrame.pc;
            
            if (type === 'int') {
                var bytes8 = bc.slice(pc + 1, pc + 9);
                arg = this.bConverter.decodeInt64(bytes8);
                this.offsetPc(8);
            } else if (type === 'double') {
                var bytes8 = bc.slice(pc + 1, pc + 9);
                arg = this.bConverter.decodeDouble(bytes8);
                this.offsetPc(8);
            } else if (type === 'varInt' || type === 'varId' || type === 'iteratorId') {
                var bytes4 = bc.slice(pc + 1, pc + 5);
                var varInt = this.bConverter.decodeVarInt(bytes4);
                arg = varInt.value;
                this.offsetPc(varInt.length);
            } else if (type === 'string') {
                var bytes4 = bc.slice(pc + 1, pc + 5);
                var id = this.bConverter.decodeInt32(bytes4);
                arg = this.prog.getLiteralString(id);
                this.offsetPc(4);
            } else if (type === 'array') {
                var bytes4 = bc.slice(pc + 1, pc + 5);
                var id = this.bConverter.decodeInt32(bytes4);
                arg = this.prog.getScalarArray(id);
                this.offsetPc(4);
            } else if (type === 'subop') {
                arg = bc[pc + 1];
                this.offsetPc(1);
            } else if (type === 'byteOffset') {
                var bytes4 = bc.slice(pc + 1, pc + 5);
                arg = this.bConverter.decodeInt32(bytes4);
                this.offsetPc(4);
            } else if (type === 'memberVector') {
                var length = bc[pc + 1] + 8;
                var bytes = bc.slice(pc + 1, pc + length + 1);
                arg = new MemberVector(bytes);
                this.offsetPc(length);
            } else {
                this.fatal(new Error("Invalid argument type: " + type));
                return;
            }
            
            return arg;
        };
        
        // Execute the next instruction
        Hhvm.prototype.step = function() {
            var bc = this.prog.getByteCode();
            var pc = this.currentFrame.pc;
            var opcode = bc[pc];
            
            var instr = this.hhbc.byOpcode(opcode);
            if (!instr) {
                this.fatal(new Error("No such opcode: " + opcode));
                return;
            }
            
            // For each argument of the function, get one argument from the program
            var args = _.map(instr.spec, _.bind(this.arg, this));
            
            try {
                // Execute the instruction
                instr.apply(this, args);
            } catch (e) {
                this.fatal(e);
            }
            
            // Move the program counter to the next instruction
            this.offsetPc(1);
        };
        
        Hhvm.prototype.print = function(str) {
            this.outputHandler(str);
        };
        
        Hhvm.prototype.warning = function(message) {
            this.print("Warning: " + message + "\n");
        };
        
        Hhvm.prototype.notify = function(message) {
            this.print("Notice: " + message + "\n");
        };
        
        Hhvm.prototype.fatal = function(error) {
            this.print("Fatal error: " + error.message);
            this.errorHandler(error);
            this.stop(1);
        };
        
        Hhvm.prototype.recoverable = function(message) {
            this.print("Recoverable error: " + message + "\n");
        };

        Hhvm.prototype.interrupt = function() {
            this.print("Interrupted");
            this.stop(1);
        };
        
        Hhvm.prototype.stop = function(statusCode) {
            if (!this.running) {
                return;
            }
            
            this.running = false;
            this.statusCode = statusCode || 0;
        };

        Hhvm.prototype.exit = function() {
            // Call the exit handler
            this.exitHandler(this.statusCode);
            this.reset();
        };
        
        Hhvm.prototype.run = function() {
            if (this.prog === null || this.running) {
                return;
            }
            
            this.running = true;
            this.dispatcher.initialize();
            this.globalVars = this.currentFrame.localVars;
            
            // Step function: perform one execution step, then call a timeout to asynchronously
            // call itself again as soon as possible.
            // Note that we don't just loop since that would hang up the browser.
            var vm = this;
            var performStep = function() {
                // Stop when only the Application frame remains
                if (vm.callStack.length() === 1) {
                    var returnValue = vm.currentFrame.stack.pop();
                    // Ignore the return value
                    vm.stop();
                    return;
                }

                // Program counter out of bounds
                if (vm.currentFrame.pc >= vm.prog.length() || vm.currentFrame.pc < 0) {
                    vm.fatal(new Error("Illegal program counter (" + vm.currentFrame.pc + ")"));
                    return;
                }

                // Execute current instruction
                vm.step();
            };
            
            // Run in blocking mode
            if(vm.options.blocking) {
                while (vm.running) {
                    performStep();
                }
                vm.exit();
            // Run in non-blocking mode
            } else {
                (function async() {
                    // How many ms to run before we return execution to the browser
                    var executionTime = 10;
                    var now = (new Date()).getTime();
                    var endTime = now + executionTime;
                    
                    while ((new Date()).getTime() < endTime) {
                        if (vm.running) {
                            performStep();
                        } else {
                            break;
                        }
                    }
                    
                    if (vm.running) {
                        setTimeout(async, 0);
                    } else {
                        vm.exit();
                    }
                })();
            }
        };
        
        return Hhvm;
    }
);
