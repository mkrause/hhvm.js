define([
        'vendor/underscore',
        'lib/util/merge',
        'lib/instructions/basic',
        'lib/instructions/literals',
        'lib/instructions/operators'
    ], function(_, merge, basic, literals, operators) {
        // Merge all the different instruction modules together to get a map of all
        // instructions to their implementations
        return merge([
            basic,
            literals,
            operators
        ]);
    }
);
