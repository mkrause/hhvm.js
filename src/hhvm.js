require.config({
    shim: {
        'vendor/underscore': { exports: '_' }
    }
});

define([
        'vendor/underscore',
        'lib/util/binary',
        'lib/instruction_set',
        'lib/stack',
        'lib/frame',
        'lib/fpi'
    ], function(_, binaryUtil, InstructionSet, Stack, Frame, FPI) {
        var Hhvm = function(options) {
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
            
            this.running = false;
            
            // I/O
            this.output = "";
            
            // Events
            this.outputHandler = _.bind(this.options.outputHandler, this);
            this.exitHandler = _.bind(this.options.exitHandler, this);
            
            // Registers, memory
            this.prog = [];

            // The call stack containing the activation frames.
            this.callStack = new Stack();

            // Alias for this.getCurrentFrame().stack (for now)
            this.stack = null;
        };
        
        // Get the top frame
        Hhvm.prototype.getCurrentFrame = function() {
            return this.callStack.peek();
        };
        
        // Set the program counter
        Hhvm.prototype.offsetPc = function(offset) {
            this.getCurrentFrame().pc += offset;
        };
        
        // Set the program code to execute
        Hhvm.prototype.program = function(program) {
            this.prog = program;
        };
        
        // Get the next instruction argument in the program, and increment the program counter
        Hhvm.prototype.arg = function(type) {
            var arg;
            var prog = this.prog;
            var pc = this.getCurrentFrame().pc;
            
            if (type === 'int') {
                var bytes8 = prog.slice(pc + 1, pc + 9);
                arg = binaryUtil.decodeInt64(bytes8);
                this.offsetPc(8);
            } else if (type === 'double') {
                var bytes8 = prog.slice(pc + 1, pc + 9);
                arg = binaryUtil.decodeDouble(bytes8);
                this.offsetPc(8);
            } else if (type === 'litstr') {
                //TODO
            } else if (type === 'array') {
                //TODO
            } else if (type === 'byte') {
                // Get one byte (as an integer between 0 and 255)
                arg = prog[pc + 1];
                this.offsetPc(1);
            } else {
                this.fatal("Invalid argument type: " + type);
                return;
            }
            
            return arg;
        };
        
        // Execute the next instruction
        Hhvm.prototype.step = function() {
            var opcode = this.prog[this.getCurrentFrame().pc];
            
            var instr = this.hhbc.byOpcode(opcode);
            if (!instr) {
                this.error("No such opcode: " + opcode);
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
        
        Hhvm.prototype.error = function(message) {
            this.print("\nERROR: " + message);
            this.stop(1);
        };
        
        Hhvm.prototype.fatal = function(message) {
            this.print("\nFATAL ERROR: " + message);
            this.stop(1);
        };
        
        Hhvm.prototype.stop = function(statusCode) {
            if (!this.running) {
                return;
            }
            
            statusCode = statusCode || 0;
            
            // Reset state
            this.running = false;
            this.callStack = new Stack();
            
            // Call the exit handler
            this.exitHandler(statusCode);
        };
        
        Hhvm.prototype.run = function() {
            if (this.running) {
                return;
            }
            
            this.running = true;

            // Push temporaily a main frame until the fpush* instructions are implemented
            var frame = new Frame(new FPI("main"), []);
            this.callStack.push(frame);
            this.stack = frame.stack;
            
            // Step function: perform one execution step, then call a timeout to asynchronously
            // call itself again as soon as possible.
            // Note that we don't just loop since that would hang up the browser.
            var vm = this;
            (function performStep() {
                // We may have stopped in the mean time, in which case we just return
                if (!vm.running) {
                    return;
                }
                
                vm.step();
                
                if (vm.callStack.isEmpty()) {
                    vm.stop();
                    return;
                }
                
                setTimeout(performStep, 0);
            })();
        };
        
        return Hhvm;
    }
);
