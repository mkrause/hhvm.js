define([
        'vendor/underscore',
        'lib/stack',
        'lib/fpi',
        'lib/variable_store'
    ], function(_, Stack, FPI, VariableStore) {
        var Frame = function(fpi, parameters) {
            parameters = parameters || [];

            // Header info
            this.functionName = fpi.functionName;

            // Program counter
            this.pc = fpi.address;

            // Local variable store
            this.localVars = new VariableStore(fpi.localNames);

            // Iterator variable store
            this.iteratorVars = new VariableStore();

            // Evaluation stack
            this.stack = new Stack();

            // Function Parameter Info stack
            this.FPIstack = new Stack();

            // Add parameters to local variable store
            _(parameters.length).times(function(i) {
                this.localVars.setById(i, parameters[i]);
            });
        };
        
        Frame.prototype.toString = function() {
            return "[Frame: " + this.functionName + "]";
        };

        return Frame;
    }
);
