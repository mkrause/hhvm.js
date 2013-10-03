define([
        'vendor/underscore',
        'lib/instructions/instructions'
    ], function(_, instructions) {
        return _.invert(_.map(instructions, function(index, instr) {
            return instr.name;
        }));
    }
);