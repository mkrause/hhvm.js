define([
        'vendor/underscore',
        'lib/instructions/instructions'
    ], function(_, instructions) {
        var opcodes = _.invert(_.map(instructions, function(instr, index) {
            return instr.name;
        }));
        return opcodes;
    }
);
