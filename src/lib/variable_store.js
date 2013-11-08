define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref'
    ], function(_, Cell, Ref) {
        var VariableStore = function(names, values) {
            // Local variables are stored as cells
            this.names = names || [];
            this.values = values || [];
        };
        
        VariableStore.prototype.defineById = function(id, value) {
            if (this.values[id] !== undefined) {
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
            return this.values[id];
        };

        VariableStore.prototype.getByName = function(name) {
            return this.getById(this.getIdFromName(name));
        };

        VariableStore.prototype.setById = function(id, value) {
            if (this.values[id] instanceof Cell && value instanceof Cell) {
                this.values[id].value = value.value;
            } else if (value instanceof Ref) {
                this.values[id] = value.cell;
            } else {
                this.values[id] = value;
            }
        };

        VariableStore.prototype.setByName = function(name, value) {
            this.setById(this.getIdFromName(name), value);
        };

        VariableStore.prototype.unsetById = function(id) {
            delete this.values[id];
        };

        VariableStore.prototype.unsetByName = function(name) {
            this.unsetById(this.getIdFromName(name));
        };

        VariableStore.prototype.getNameFromId = function(id) {
            return this.names[id];
        };

        VariableStore.prototype.getIdFromName = function(name) {
            return _.indexOf(this.names, name);
        };
        
        VariableStore.prototype.toString = function() {
            var pairs = _.zip(this.names, this.values);
            return _.object(pairs).toString();
        };

        return VariableStore;
    }
);
