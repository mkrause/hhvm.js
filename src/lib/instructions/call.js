define([
        'vendor/underscore',
    ], function(_) {
        
        var pushFunc = function(numParams, x){
            if(x instanceof String){
                var y = this.getFunction(x);
                if(y = undefined){
                    this.fatal("No such function: " + x);
                } else {
                    //TODO: push new FPI structure on stack
                    this.FPIstack.push(new FPI(/*TODO*/))
                }
            } else if (x instanceof Object){
                //TODO
            } else {
                //TODO
            }
        };
        
        return {
            FPushFunc: function(numParams) {
                pushFunc(this.stack.pop().value);
                //TODO
            },
            FPushFuncD: function(numParams, litstrId){
                pushFunc(numParams, litstrId);
                //TODO
            }
           //TODO: implement missing functions
        };
    }
);
