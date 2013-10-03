require.config({
    shim: {
        'vendor/underscore': { exports: '_' }
    }
});

define([
        'vendor/underscore',
        'lib/stack',
        'lib/hhbc',
        'lib/instructions/instructions'
    ], function(_, Stack, hhbc, instructions) {
        var Hhvm = function(program, options) {
            this.instr = instructions;
            this.hhbc = {};
            // Bind all instruction functions to this instance
            this.hhbc = _.each(hhbc, function(fn, mnemonic, hhbc) {
                hhbc[mnemonic] = _.bind(fn, this);
            });
            
            this.program = program;
            
            this.running = false;
            this.output = "";
            
            this.pc = 0;
            this.sp = 0;
            this.stack = new Stack();
        };
        
        // Get the next instruction argument in the program, and increment the program counter
        Hhvm.prototype.arg = function() {
            var arg = this.program[this.pc + 1];
            this.pc += 1;
            return arg;
        };
        
        // Execute the next instruction
        Hhvm.prototype.step = function() {
            var opcode = this.program[this.pc];
            
            if (!this.instr[opcode]) {
                this.error("No such opcode: " + this.opcode);
                return;
            }
            
            var instr = this.instr[opcode];
            var fn = instr.func;
            
            // For each formal argument of the function, get one argument from the program
            var arity = fn.length;
            var args = _.map(_.range(arity), _.bind(this.arg, this));
            
            // Execute the instruction
            fn.apply(this, args);
        };
        
        Hhvm.prototype.print = function(str) {
            this.output += str;
        };
        
        Hhvm.prototype.error = function(message) {
            this.output += "\nERROR: " + message;
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
                this.pc += 1;
            }
        };
        
        return Hhvm;
    }
);
