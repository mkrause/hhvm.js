define([], function() {
    return function(objs) {
        var merged = {};
        for (var objIdx in objs) {
            var obj = objs[objIdx];
            for (var propName in obj) {
                merged[propName] = obj[propName];
            }
        }
        return merged;
    };
});
