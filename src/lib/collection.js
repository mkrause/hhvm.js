define([
        'vendor/underscore'
    ], function(_) {
        var Collection = function(type, capacity) {
            this.type = type;
            this.capacity = capacity;
            this.data = [];
        };

        Collection.prototype.collectionType = {
            VECTOR: 1,
            MAP: 2,
            STABLE_MAP: 3,
            SET: 4,
            PAIR: 5
        };
        
        Collection.prototype.add = function(value) {
            this.data.push(value);
        };

        Collection.prototype.set = function(index, value) {
            this.data[index] = value;
        };
        
        Collection.prototype.isEmpty = function() {
            return this.data.length === 0;
        };

        Collection.prototype.length = function() {
            return this.data.length;
        };
        
        Collection.prototype.toString = function() {
            return _.reduce(this.stack, function(stringRep, value) {
                return stringRep + value + "\n";
            }, "");
        };
        
        return Collection;
    }
);
