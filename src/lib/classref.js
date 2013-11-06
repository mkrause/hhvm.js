define([
        'vendor/underscore'
    ], function(_) {
        var ClassRef = function(classDef) {
            this.classDef = classDef;
        };

        ClassRef.prototype.clone = function() {
            return new ClassRef(this.classDef);
        };

        // Cast to string
        ClassRef.prototype.toString = function() {
            return "[ClassRef: " + this.classDef.name + "]";
        };

        return ClassRef;
    }
);
