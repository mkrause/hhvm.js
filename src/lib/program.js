define([
        'vendor/underscore',
        'lib/classdef'
    ], function(_, ClassDef) {
        var Program = function(programdata) {
            this.data = programdata;
            this.currentUnit = 0;
            this.classes = [];
        };

        Program.prototype.initialize = function() {
            this.classes = [];
            _.each(this.data.units[this.currentUnit].classes, function(classmeta, id) {
                this.classes[id] = new ClassDef(classmeta);
            }, this);
        };

        Program.prototype.getByteCode = function() {
            return this.data.units[this.currentUnit].bc;
        };
        
        Program.prototype.getUnit = function(unitId) {
            if (!this.data.units[unitId]) {
                throw new Error("No such unit: " + unitId);
            }
            return this.data.units[unitId].bc;
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

        Program.prototype.getScalarArray = function(id) {
            var array = [];
            var obj = this.data.units[this.currentUnit].arrays[id];
            _.each(obj, function(value, key) {
                array[key] = value;
            });
            return array;
        };

        Program.prototype.getClassById = function(id) {
            return this.classes[id];
        };

        Program.prototype.getClassByName = function(name) {
            return _.find(this.classes, function(classDef) {
                return classDef.name === name;
            });
        };
        
        return Program;
    }
);
