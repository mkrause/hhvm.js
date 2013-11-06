define([
        'vendor/underscore'
    ], function(_) {
        var Obj = function(classDef, properties) {
            this.classDef = classDef || { name: "stdClass" };
            this.properties = properties || [];
        };
        
        Obj.prototype.getClassName = function() {
            return classDef.name;
        };
        
        Obj.prototype.clone = function() {
            return new Obj(classDef, properties);
        };
        
        Obj.prototype.toString = function() {
            return "Object";
        };
        
        return Obj;
    }
);
