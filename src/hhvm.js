require.config({
    shim: {
        'vendor/underscore': { exports: '_' }
    }
});

define([
        'vendor/underscore',
        'lib/util/binary',
        'lib/instruction_set',
        'lib/stack'
    ], function(_, binary, InstructionSet, Stack) {
        var Hhvm = function(options) {
            this.hhbc = new InstructionSet(this);
            
            this.running = false;
            this.output = "";
            
            this.program = [];
            this.pc = 0;
            this.stack = new Stack();
        };
        
        // Add some program code to execute
        Hhvm.prototype.addProgram = function(program) {
            this.program = program;
        };
        
        // Get the next instruction argument in the program, and increment the program counter
        Hhvm.prototype.arg = function(type) {
            var arg;
            var prog = this.program;
            var pc = this.pc;
            if (type === 'int') {
                var bytes8 = this.program.slice(this.pc + 1, this.pc + 9);
                arg = binary.decodeInt64(bytes8);
                this.pc += 8;
            } else if (type === 'double') {
                var bytes8 = this.program.slice(this.pc + 1, this.pc + 9);
                arg = binary.decodeDouble(bytes8);
                this.pc += 8;
            } else if (type === 'litstr') {
                //TODO
            } else if (type === 'array') {
                //TODO
            } else {
                // Fallback: get one byte
                arg = prog[pc + 1];
                this.pc += 1;
            }
            
            return arg;
        };
        
        // Execute the next instruction
        Hhvm.prototype.step = function() {
            var opcode = this.program[this.pc];
            
            var instr = this.hhbc.getInstruction(opcode);
            if (!instr) {
                this.error("No such opcode: " + this.opcode);
                return;
            }
            
            // For each formal argument of the function, get one argument from the program
            var arity = this.hhbc.arity(opcode);
            var args = _.map(_.range(arity), _.bind(this.arg, this));
            
            // Execute the instruction
            this.hhbc.execute(opcode, args);
            
            // Move the program counter to the next instruction
            this.pc += 1;
        };
        
        Hhvm.prototype.print = function(str) {
            this.output += str;
        };
        
        Hhvm.prototype.error = function(message) {
            this.print("\nERROR: " + message);
            this.stop();
        };
        
        Hhvm.prototype.stop = function() {
            this.running = false;
        };
        
        Hhvm.prototype.run = function() {
            this.running = true;
            while (this.running) {
                if (this.pc >= this.program.length) {
                    this.stop();
                    break;
                }
                
                this.step();
            }
        };
        
        return Hhvm;
    }
);
