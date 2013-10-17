define([
        'vendor/underscore',
    ], function(_) {
        
        var pushFunc = function(numParams, x){
            if(x instanceof String){
                var y = this.getFunction(x);
                if(y === undefined){
                    this.fatal("No such function: " + x);
                } else {
                    this.FPIstack.push(new FPI(y, numParams));
                }
            } else if (x instanceof Object && _.isFunction(x)){
                this.FPIstack.push(new FPI(x, numParams));
            } else {
                this.fatal("No such function: " + x);
            }
        };
        
        return {
            FPushFunc: function(numParams) {
                pushFunc(this.stack.pop().value);
            },
            FPushFuncD: function(numParams, litstrId){
                pushFunc(numParams, litstrId);
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
               //TODO
               var args = [];
               for(var i = 0; i < numParams; i++){
                   args.unshift(this.stack.pop());
               }
               currentFPI = this.FPIstack.pop();
               this.hhbc.PushR(new Cell(this.dispatcher.callFunction(currentFPI.func, args)));
           },
           //TODO: implement missing functions
        };
    }
);
