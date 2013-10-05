define([
        'vendor/underscore',
        'lib/instructions/basic',
        'lib/instructions/literals',
        'lib/instructions/operators'
    ], function(_, basic, literals, operators) {
        var modules = [
            basic,
            literals,
            operators
        ];
        
        // Merge all the different instruction modules together to get a map of all
        // instructions to their implementations
        return _.reduce(modules, function(merged, module) {
            for (var key in module) {
                if (module.hasOwnProperty(key)) {
                    merged[key] = module[key];
                }
            }
            return merged;
        }, {});
    }
);
