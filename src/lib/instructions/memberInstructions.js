define([
        'vendor/underscore',
        'lib/instructions/memberOperations',
        'lib/instructions/subopcodes'
    ], function(_, operations, subopcodes) {
        return {
            //TODO: implement missing functions
            IncDecM: function(op, mVector) {
                //TODO: implement function
                var mnemonic = subopcodes.IncDec.getMnemonic(op);
                console.log("IncDecM: mnemonic: " + mnemonic + " vector: " + mVector);
                
                
            },
            CGetM: function(mVector) {
                //TODO: implement function
                console.log(mVector);
            }
        };
    }
);
