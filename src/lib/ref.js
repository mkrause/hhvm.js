define([
        'vendor/underscore',
        'lib/cell'
    ], function(_, Cell) {
        var Ref = function(value) {
            var cell;
            if (value instanceof Ref) {
                cell = value.cell;
            } else if (value instanceof Cell) {
                cell = value;
            } else {
                throw "Ref type: given a value of incorrect type";
            }
            
            this.cell = cell;
        };
        
        // Cast to primitive value
        Ref.prototype.valueOf = function() {
            return this.cell.valueOf();
        };
        
        // Cast to string
        Ref.prototype.toString = function() {
            return "[Ref: " + this.cell + "]";
        };
        
        return Ref;
    }
);
