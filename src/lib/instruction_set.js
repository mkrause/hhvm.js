define([
        'vendor/underscore',
        'lib/instructions/instructions',
        'lib/instructions/basic',
        'lib/instructions/literals',
        'lib/instructions/operators'
    ], function(_, mnemonics, basic, literals, operators) {
        var modules = [
            basic,
            literals,
            operators
        ];
        
        // Merge all the different instruction modules together to get a map of all
        // instructions to their implementations
        var instructions = _.reduce(modules, function(merged, module) {
            for (var key in module) {
                if (module.hasOwnProperty(key)) {
                    merged[key] = module[key];
                }
            }
            return merged;
        }, {});
        
        var InstructionSet = function(vm) {
            this.vm = vm;
        };
        
        // Get an instruction. Key can be either a string (mnemonic) or number (opcode).
        InstructionSet.prototype.getInstruction = function(key) {
            var mnemonic;
            if (typeof key !== 'string') {
                mnemonic = mnemonics[key].name;
            } else {
                mnemonic = key;
            }
            
            return instructions[mnemonic];
        }
        
        // Return the number of formal arguments for the given instruction
        InstructionSet.prototype.arity = function(key) {
            var instr = this.getInstruction(key);
            return instr.length;
        };
        
        // Execute an instruction
        InstructionSet.prototype.execute = function(key, args) {
            var instr = this.getInstruction(key);
            instr.apply(this.vm, args);
        };
        
        return InstructionSet;
    }
);
