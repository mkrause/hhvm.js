define([
        'vendor/underscore',
        'lib/fpi',
        'lib/cell'
    ], function(_, FPI, Cell) {
        
        var pushFunc = function(vm, numParams, x) {
            if(_.isString(x)) {
                var fpi = vm.dispatcher.createFPI(x, numParams);
                if(fpi === undefined) {
                    throw new Error("Undefined function: " + x);
                } else {
                    vm.FPIstack.push(fpi);
                }
            } else if (x instanceof Object && _.isFunction(x)) {
                vm.FPIstack.push(new FPI(x, numParams));
            } else {
                throw new Error("Supplied function not a String or Object: " + typeof(x) + " " + JSON.stringify(x));
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
                var cell = this.stack.pop();
                cell = (cell instanceof Cell) ? cell : new Cell(cell);
                this.stack.push(cell);
            },
            FPassL: function(paramId, localVariableId) {
                var parameterType = this.FPIstack.peek().parameterTable[paramId].parameterType;
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
                }, this);

                var fpi = this.FPIstack.pop();
                this.dispatcher.functionCall(fpi, parameters);
            },
            //TODO: implement missing functions
            FCallBuiltin: function(totalParams, passedParams, funcName) {
                // TODO: implement
                throw new Error("Builtin function " + funcName + "() not supported (yet)");
            }
        };
    }
);
