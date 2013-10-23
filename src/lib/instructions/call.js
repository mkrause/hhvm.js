define([
        'vendor/underscore',
        'lib/fpi'
    ], function(_, FPI) {
        
        var pushFunc = function(vm, numParams, x) {
            if(x instanceof String) {
                var fpi = vm.dispatcher.getFPI(x, numParams);
                if(fpi === undefined) {
                    vm.fatal("No such function: " + x);
                } else {
                    vm.FPIstack.push(fpi);
                }
            } else if (x instanceof Object && _.isFunction(x)) {
                vm.FPIstack.push(new FPI(x, numParams));
            } else {
                vm.fatal("Supplied function not a String or Object: " + x);
            }
        };
        
        return {
            FPushFunc: function(numParams) {
                var name = String(this.stack.pop().value);
                pushFunc(this, numParams, name);
            },
            FPushFuncD: function(numParams, name) {
                pushFunc(this, numParams, name);
            },
            //TODO: implement missing functions
            FPassC: function(paramId) {
                this.stack.push(new Cell(this.stack.pop()));
            },
            FPassL: function(paramId, localVariableId) {
                var parameterType = this.FPIstack.peek().getParameterTable[paramId].parameterType;
                if(parameterType == FPI.parameterType.PASS_BY_VALUE){
                    this.hhbc.CGetL(localVariableId);
                } else if(parameterType == FPI.parameterType.PASS_BY_REFERENCE){
                    this.hhbc.VGetL(localVariableId);
                }
            },
            //TODO: implement missing functions
            FCall: function(numParams) {
                var parameters = [];
                _(numParams).times(function(n) {
                    parameters.unshift(this.stack.pop());
                });

                var fpi = this.FPIstack.pop();
                this.dispatcher.functionCall(fpi, parameters);
            },
            //TODO: implement missing functions
        };
    }
);
