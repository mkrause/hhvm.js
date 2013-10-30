define([
        'vendor/underscore',
        'lib/fpi',
        'lib/cell',
        'lib/ref'
    ], function(_, FPI, Cell, Ref) {
        
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

        var isPassedByValue = function(vm, paramId) {
            return vm.FPIstack.peek().parameterTable[paramId].parameterType === FPI.parameterType.PASS_BY_VALUE;
        };

        var isPassedByReference = function(vm, paramId) {
            return vm.FPIstack.peek().parameterTable[paramId].parameterType === FPI.parameterType.PASS_BY_REFERENCE;
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
                // Nop
            },
            FPassCW: function(paramId) {
                if(isPassedByReference(this, paramId)) {
                    this.warning("Cannot pass parameter by value");
                }
            },
            FPassCE: function(paramId) {
                if(isPassedByReference(this, paramId)) {
                    this.fatal("Cannot pass parameter by value");
                }
            },
            FPassV: function(paramId) {
                var parameterType = this.FPIstack.peek().parameterTable[paramId].parameterType;
                if(isPassedByValue(this, paramId)) {
                    this.hhbc.Unbox();
                } else if(isPassedByReference(this, paramId)) {
                    // Nop
                }
            },
            FPassVNop: function(paramId) {
                // Nop
            },
            FPassR: function(paramId) {
                var value = this.stack.peek();
                if (value instanceof Cell) {
                    this.hhbc.FPassC();
                } else if (value instanceof Ref) {
                    this.hhbc.FPassV();
                }
            },
            FPassL: function(paramId, localVariableId) {
                if(isPassedByValue(this, paramId)) {
                    this.hhbc.CGetN(localVariableId);
                } else if(isPassedByReference(this, paramId)) {
                    this.hhbc.VGetN(localVariableId);
                }
            },
            FPassN: function(paramId) {
                if(isPassedByValue(this, paramId)) {
                    this.hhbc.CGetL();
                } else if(isPassedByReference(this, paramId)) {
                    this.hhbc.VGetL();
                }
            },
            FPassG: function(paramId) {
                if(isPassedByValue(this, paramId)) {
                    this.hhbc.CGetG();
                } else if(isPassedByReference(this, paramId)) {
                    this.hhbc.VGetG();
                }
            },
            FPassS: function(paramId) {
                if(isPassedByValue(this, paramId)) {
                    this.hhbc.CGetS();
                } else if(isPassedByReference(this, paramId)) {
                    this.hhbc.VGetS();
                }
            },
            FCall: function(numParams) {
                var parameters = [];
                _(numParams).times(function(n) {
                    parameters.unshift(this.stack.pop());
                }, this);

                var fpi = this.FPIstack.pop();
                this.dispatcher.functionCall(fpi, parameters);
            },
            FCallArray: function() {
                var parameters = this.stack.pop().value;
                var fpi = this.FPIstack.pop();
                this.dispatcher.functionCall(fpi, parameters);
            },
            FCallBuiltin: function(totalParams, passedParams, funcName) {
                // TODO: implement
                throw new Error("Builtin function " + funcName + "() not supported (yet)");
            }
        };
    }
);
