require.config({
    shim: {
        'vendor/underscore': { exports: '_' }
    }
});

define([
        'vendor/underscore',
        'lib/util/binary_converter',
        'lib/instruction_set',
        'lib/stack',
        'lib/dispatcher',
        'lib/variable_store'
    ], function(_, BinaryConverter, InstructionSet, Stack, Dispatcher, VariableStore) {
        var Hhvm = function(options) {
            options = options || {};
            this.options = _.defaults(options, {
                // Default output handler: just append to an internal string
                outputHandler: function(str) {
                    this.output += str;
                },
                // Default exit handler
                exitHandler: function(statusCode) {}
            });
            
            // Implementation of the HipHop bytecode instruction set
            this.hhbc = new InstructionSet(this);
            
            // The dispatcher that manages the activation frames
            this.dispatcher = new Dispatcher(this);

            // A binary converter helper
            this.bConverter = new BinaryConverter();
            
            this.running = false;
            
            // I/O
            this.output = "";
            
            // Events
            this.outputHandler = _.bind(this.options.outputHandler, this);
            this.exitHandler = _.bind(this.options.exitHandler, this);
            
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
        
        // Set the program counter
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
                var bytes8 = bc.slice(pc + 1, pc + 9);
                var id = this.bConverter.decodeInt64(bytes8);
                //TODO: lookup string with litstr id
                // arg = this.meta.litstr[id];
                this.offsetPc(8);
            } else if (type === 'array') {
                //TODO
            } else if (type === 'subop') {
                arg = bc[pc + 1];
                this.offsetPc(1);
            } else if (type === 'byte') {
                // Get one byte (as an integer between 0 and 255)
                arg = bc[pc + 1];
                this.offsetPc(1);
            } else {
                this.fatal("Invalid argument type: " + type);
                return;
            }
            
            return arg;
        };
        
        // Execute the next instruction
        Hhvm.prototype.step = function() {
            var bc = this.prog.getByteCode();
            var opcode = bc[this.currentFrame.pc];
            
            var instr = this.hhbc.byOpcode(opcode);
            if (!instr) {
                this.fatal("No such opcode: " + opcode);
                return;
            }
            
            // For each argument of the function, get one argument from the program
            var args = _.map(instr.spec, _.bind(this.arg, this));
            
            // Execute the instruction
            instr.apply(this, args);
            
            // Move the program counter to the next instruction
            this.offsetPc(1);
        };
        
        Hhvm.prototype.print = function(str) {
            this.outputHandler(str);
        };
        
        Hhvm.prototype.warning = function(message) {
            this.print("\nWARNING: " + message);
        };
        
        Hhvm.prototype.fatal = function(message) {
            this.print("\nFATAL ERROR: " + message);
            this.stop(1);
        };
        
        Hhvm.prototype.recoverable = function(message) {
            this.print("\nERROR: " + message);
        };
        
        Hhvm.prototype.stop = function(statusCode) {
            if (!this.running) {
                return;
            }
            
            statusCode = statusCode || 0;
            
            // Reset state
            this.running = false;
            this.callStack = new Stack();
            this.currentFrame = null;
            this.stack = null;
            this.fpiStack = null;

            // Call the exit handler
            this.exitHandler(statusCode);
        };
        
        Hhvm.prototype.run = function() {
            if (this.running) {
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
                // Stop when only the Application frame remains (containing the exit code on stack)
                if (vm.callStack.length() === 1) {
                    var cell = vm.currentFrame.stack.pop();
                    vm.stop(cell === undefined ? 1 : cell.value);
                    return;
                }

                // Program counter out of bounds
                if (vm.currentFrame.pc >= vm.prog.length() || vm.currentFrame.pc < 0) {
                    vm.fatal("Illegal program counter (" + vm.currentFrame.pc + ")");
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
            // Run in non-blocking mode
            } else {
                (function async() {
                    performStep();
                    if (vm.running) {
                        setTimeout(async, 0);
                    }
                })();
            }
        };
        
        return Hhvm;
    }
);
