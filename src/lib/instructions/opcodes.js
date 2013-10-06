define([
        'vendor/underscore',
        'lib/instructions/instructions'
    ], function(_, instructions) {
        // Create a mapping from mnemonic to opcode from the instructions list
        var opcodes = {};
        _.each(instructions, function(instr, key) {
            opcodes[instr.mnemonic] = parseInt(key, 10);
        });
        
        return opcodes;
    }
);
