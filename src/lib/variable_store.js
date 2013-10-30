define([
        'vendor/underscore',
        'lib/cell'
    ], function(_, Cell) {
        var VariableStore = function(names) {
            // Local variables are stored as cells
            this.store = [];
            this.names = names || [];
        };
        
        VariableStore.prototype.defineById = function(id, value) {
            if (this.store[id] !== undefined) {
                return true;
            }

            value = value || new Cell(null);
            this.setById(id, value);
            return false;
        };

        VariableStore.prototype.defineByName = function(name, value) {
            return this.defineById(this.getIdFromName(name), value);
        };

        VariableStore.prototype.getById = function(id) {
            return this.store[id];
        };

        VariableStore.prototype.getByName = function(name) {
            return this.store[this.getIdFromName(name)];
        };

        VariableStore.prototype.setById = function(id, value) {
            this.store[id] = value;
        };

        VariableStore.prototype.setByName = function(name, value) {
            this.store[this.getIdFromName(name)] = value;
        };

        VariableStore.prototype.unsetById = function(id) {
            delete this.store[id];
        };

        VariableStore.prototype.unsetByName = function(name) {
            delete this.store[this.getIdFromName(name)];
        };

        VariableStore.prototype.getNameFromId = function(id) {
            return this.names[id];
        };

        VariableStore.prototype.getIdFromName = function(name) {
            return _.indexOf(this.names, name);
        };
        
        VariableStore.prototype.toString = function() {
            var pairs = _.zip(names, store);
            return _.object(pairs).toString();
        };

        return VariableStore;
    }
);
