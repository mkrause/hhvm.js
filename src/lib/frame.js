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

        Frame.prototype.getLocalNameFromId = function(id) {
            return localVarNames[id];
        };

        Frame.prototype.getIteratorNameFromId = function(id) {
            return iteratorVarNames[id];
        };

        Frame.prototype.getLocalIdFromName = function(name) {
            return localVarNames.indexOf(name);
        };

        Frame.prototype.getIteratorIdFromName = function(name) {
            return iteratorVarNames.indexOf(name);
        };
        
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
