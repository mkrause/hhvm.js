define([
        'vendor/underscore',
        'lib/instructions/subinstructions'
    ], function(_, instructions) {
        // Create a mapping from mnemonic to opcode from the instructions list
        var opcodes = {};
        opcodes.IncDec = {};
        opcodes.SetOp = {};
        
        _.each(instructions.IncDec, function(instr, key) {
            opcodes.IncDec[instr.mnemonic] = parseInt(key, 10);
        });
        _.each(instructions.SetOp, function(instr, key) {
            opcodes.SetOp[instr.mnemonic] = parseInt(key, 10);
        });
        
        return opcodes;
    }
);
