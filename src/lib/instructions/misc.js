define([
        'vendor/underscore',
    ], function(_) {
        return {
            //TODO: implement missing functions
            VerifyParamType: function(paramId) {
                var param = this.FPIstack.peek().getParameterTable[paramId];
                if(typeof(param) != param.type){
                    this.recoverable("Type mismatch: " + typeof(param) + " while expecting " + param.type);
                }
            }
            //TODO: implement missing functions
        };
    }
);
