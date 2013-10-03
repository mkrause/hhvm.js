define([
        'vendor/underscore',
        'lib/util/merge',
        'lib/instructions/basic',
        'lib/instructions/literals',
        'lib/instructions/operators'
    ], function(_, merge, basic, literals, operators) {
        return merge([
            basic,
            literals,
            operators
        ]);
    }
);
