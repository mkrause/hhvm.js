define([
        'vendor/underscore',
        'lib/cell',
    ], function(_, Cell) {
        var Base = function(value) {
            this.value = value !== undefined ? value : null;
        };
        
        Cell.prototype.valueOf = function() {
            return this.value;
        };
        
        Cell.prototype.clone = function() {
            return new Base(this.value);
        };
        
        Cell.prototype.toString = function() {
            if (this.value === null || this.value === false) {
                return "";
            } else if (this.value === true) {
                return "1";
            } else if (_.isArray(this.value)) {
                return "Array";
            }
            return "" + this.value;
        };
        
        return Base;
    }
);
