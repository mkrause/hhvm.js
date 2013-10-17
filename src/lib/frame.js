define([
        'vendor/underscore',
        'lib/stack',
        'lib/fpi'
    ], function(_, Stack, FPI) {
        var Frame = function(fpi, parameters) {
            // Header info
            this.functionName = fpi.functionName;
            this.numParameters = fpi.numParameters;

            // Program counter
            this.pc = fpi.address;

            // Local variable store
            this.localVarStore = {};
            this.localVarNames = this.loadLocalVariableNames();

            // Iterator variable store
            this.iteratorVarStore = {};
            this.iteratorVarNames = this.loadIteratorVariableNames();

            // Evaluation stack
            this.stack = new Stack();

            // Function Parameter Info stack
            this.FPIstack = new Stack();

            // Add parameters to local variable store
            _(parameters.length).times(function(i) {
                var name = this.getLocalNameFromId(i);
                this.localVarStore[name] = parameters[i];
            });
        };

        /* Local variable getter and setters */
        Frame.prototype.getLocalVarById = function(id) {
            return this.getLocalVarByName(this.getLocalNameFromId(id));
        };

        Frame.prototype.getLocalVarByName = function(name) {
            return this.localVarStore[name];
        };

        Frame.prototype.setLocalVarById = function(id, value) {
            this.getLocalVarByName(this.getLocalNameFromId(id), value);
        };

        Frame.prototype.setLocalVarByName = function(name, value) {
            this.localVarStore[name] = value;
        };

        Frame.prototype.unsetLocalVarById = function(id) {
            this.unsetLocalVarByName(this.getLocalNameFromId(id));
        };

        Frame.prototype.unsetLocalVarByName = function(name) {
            delete this.localVarStore[name];
        };

        Frame.prototype.getLocalNameFromId = function(id) {
            return this.localVarNames[id];
        };

        Frame.prototype.getLocalIdFromName = function(name) {
            return this.localVarNames.indexOf(name);
        };

        /* Iterator variable getter and setters */
        Frame.prototype.getIteratorVarById = function(id) {
            return this.getIteratorVarByName(this.getIteratorNameFromId(id));
        };

        Frame.prototype.getIteratorVarByName = function(name) {
            return this.iteratorVarStore[name];
        };

        Frame.prototype.setIteratorVarById = function(id, value) {
            this.setIteratorVarByName(this.getIteratorNameFromId(id), value);
        };

        Frame.prototype.setIteratorVarByName = function(name, value) {
            this.iteratorVarStore[name] = value;
        };

        Frame.prototype.unsetIteratorVarById = function(id) {
            this.unsetIteratorVarByName(this.getIteratorNameFromId(id));
        };

        Frame.prototype.unsetIteratorVarByName = function(name) {
            delete this.iteratorVarStore[name];
        };

        Frame.prototype.getIteratorNameFromId = function(id) {
            return this.iteratorVarNames[id];
        };

        Frame.prototype.getIteratorIdFromName = function(name) {
            return this.iteratorVarNames.indexOf(name);
        };
        
        /* Load stores */
        Frame.prototype.loadLocalVariableNames = function() {
            // TODO: Lookup parameter names in meta data of functionName
            return [];
        };
        
        Frame.prototype.loadIteratorVariableNames = function() {
            // TODO: Lookup parameter names in meta data of functionName
            return [];
        };
        
        Frame.prototype.toString = function() {
            return "[Frame: " + this.functionName + "]";
        };

        return Frame;
    }
);
