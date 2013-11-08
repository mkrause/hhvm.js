define([
        'vendor/underscore',
        'lib/cell',
        'lib/variable_store'
    ], function(_, Cell, VariableStore) {
        var ClassDef = function(metadata) {
            this.name = metadata.name;
            this.data = metadata;
            this.staticProperties = this.initializeStatic();
        };

        ClassDef.prototype.initializeStatic = function() {
            var sProps = _.filter(this.data.properties, function(prop) { return prop.attributes.static; });
            var names = _.map(sProps, function(prop) { return prop.name; });
            var values = _.map(sProps, function(prop) { return new Cell(prop.value.value); });
            return new VariableStore(names, values);
        };

        ClassDef.prototype.toString = function() {
            return "[ClassDef: " + this.data.name + "]";
        };

        ClassDef.prototype.getFunctionById = function(id) {
            return this.data.functions[id];
        };

        ClassDef.prototype.getFunctionByName = function(name) {
            return _.find(this.data.functions, function(func) {
                return func.name === name;
            });
        };

        ClassDef.prototype.getConstantByName = function(name) {
            var constant = _.find(this.data.constants, function(constant) {
                return constant.name === name;
            });
            return (constant === undefined) ? undefined : constant.value.value;
        };

        return ClassDef;
    }
);
