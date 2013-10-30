// Implementation of the HipHop bytecode instruction set
define([
        'vendor/underscore',
        'lib/instructions/instructions',
        'lib/instructions/opcodes',
        'lib/instructions/basic',
        'lib/instructions/literals',
        'lib/instructions/operators',
        'lib/instructions/control_flow',
        'lib/instructions/get',
        'lib/instructions/mutator',
        'lib/instructions/call',
        'lib/instructions/isset',
        'lib/instructions/misc'
    ], function(_, opcodeToInstr, mnemonicToOpcode, basic, literals, operators, controlFlow, getInstr, mutators, calls, isset, misc) {
        // Instruction modules
        var modules = [
            basic,
            literals,
            operators,
            controlFlow,
            getInstr,
            mutators,
            calls,
            isset,
            misc
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
                var opcode = mnemonicToOpcode[mnemonic];
                var instr = opcodeToInstr[opcode];
                
                this[mnemonic] = _.bind(implementation, vm);
                this[mnemonic].mnemonic = mnemonic;
                this[mnemonic].opcode = opcode;
                this[mnemonic].spec = instr.spec;
            }, this);
        };
        
        InstructionSet.prototype.byOpcode = function(opcode) {
            if (!opcodeToInstr[opcode]) {
                return undefined;
            }

            var mnemonic = opcodeToInstr[opcode].mnemonic;
            
            return this[mnemonic];
        };
        
        return InstructionSet;
    }
);
