define([
        'vendor/underscore',
        'lib/instructions/subinstructions'
    ], function(_, instructions) {
        // Create a mapping from mnemonic to opcode from the instructions list
        var opcodes = {};
        opcodes.IncDec = {};
        opcodes.SetOp = {};

        opcodes.IncDec.getMnemonic = function (opcode) {
            return instructions.IncDec[opcode] ? instructions.IncDec[opcode].mnemonic : undefined;
        };

        opcodes.SetOp.getMnemonic = function (opcode) {
            return instructions.SetOp[opcode] ? instructions.SetOp[opcode].mnemonic : undefined;
        };
        
        _.each(instructions.IncDec, function(instr, key) {
            opcodes.IncDec[instr.mnemonic] = parseInt(key, 10);
        });
        _.each(instructions.SetOp, function(instr, key) {
            opcodes.SetOp[instr.mnemonic] = parseInt(key, 10);
        });
        
        return opcodes;
    }
);
