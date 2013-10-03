define([], function() {
    return function() {
        var merged = {};
        for (var argIdx in arguments) {
            var obj = arguments[argIdx];
            for (var propName in obj) {
                merged[propName] = obj[propName];
            }
        }
        return merged;
    };
});
