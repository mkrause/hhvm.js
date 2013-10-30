define([
        'vendor/underscore'
    ], function(_) {
        var Cell = function(value) {
            this.value = value !== undefined ? value : null;
        };
        
        Cell.prototype.valueOf = function() {
            return this.value;
        };
        
        Cell.prototype.clone = function() {
            return new Cell(JSON.parse(JSON.stringify(this.value)));
        };
        
        Cell.prototype.toString = function() {
            if (this.value === null || this.value === false) {
                return "";
            } else if (this.value === true) {
                return "1";
            }
            return "" + this.value;
        };
        
        return Cell;
    }
);
