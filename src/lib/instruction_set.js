// Implementation of the HipHop bytecode instruction set
define([
        'vendor/underscore',
        'lib/instructions/instructions',
        'lib/instructions/opcodes',
        'lib/instructions/basic',
        'lib/instructions/literals',
        'lib/instructions/operators'
    ], function(_, opcodeToInstr, mnemonicToOpcode, basic, literals, operators) {
        // Instruction modules
        var modules = [
            basic,
            literals,
            operators
        ];
        
        // Merge all the different instruction modules together to get a map of all
        // instructions to their implementations
        var instructions = _.reduce(modules, function(merged, module) {
            // Add all of the instruction implementations in this module to the merged map
            _.each(module, function(implementation, mnemonic) {
                merged[mnemonic] = implementation;
            });
            
            return merged;
        }, {});
        
        var InstructionSet = function(vm) {
            this.vm = vm;
            
            // Add all instructions to this class
            _.each(instructions, function(implementation, mnemonic) {
                this[mnemonic] = _.bind(implementation, vm);
                this[mnemonic].arity = implementation.length;
                this[mnemonic].mnemonic = mnemonic;
                this[mnemonic].opcode = mnemonicToOpcode[mnemonic];
            }, this);
        };
        
        InstructionSet.prototype.byOpcode = function(opcode) {
            var mnemonic = opcodeToInstr[opcode].mnemonic;
            return this[mnemonic];
        };
        
        return InstructionSet;
    }
);
