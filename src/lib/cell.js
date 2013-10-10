define([
        'vendor/underscore'
    ], function(_) {
        var Cell = function(value) {
            this.value = value || null;
        };
        
        Cell.prototype.valueOf = function() {
            return this.value;
        };
        
        Cell.prototype.toString = function() {
            return "[Cell: " + this.value + "]";
        };
    }
);
