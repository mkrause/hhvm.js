define([
        'vendor/underscore'
    ], function(_) {
        var Program = function(programdata) {
            this.data = programdata;
            this.currentUnit = 0;
        };

        Program.prototype.getByteCode = function() {
            return this.data.units[this.currentUnit].bc;
        };

        Program.prototype.length = function() {
            return this.data.units[this.currentUnit].bc.length;
        };

        Program.prototype.getLiteralString = function(id) {
            return this.data.units[this.currentUnit].litStrs[id];
        };

        Program.prototype.getFunctionById = function(id) {
            return this.data.units[this.currentUnit].functions[id];
        };

        Program.prototype.getFunctionByName = function(name) {
            return _.find(this.data.units[this.currentUnit].functions, function(func) {
                return func.name === name;
            });
        };

        Program.prototype.getConstantByName = function(name) {
            // TODO: implement
            return undefined;
        };

        Program.prototype.getClassByName = function(name) {
            // TODO: implement
            return undefined;
        };
        
        return Program;
    }
);