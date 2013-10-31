define([
        'vendor/underscore',
        'lib/instructions/subopcodes'
    ], function(_, subopcodes) {
        return {
            //TODO: implement missing functions
            IncDecM: function(op, vector){
                //TODO: implement function
                var mnemonic = subopcodes.IncDec.getMnemonic(op);
                console.log("IncDecM: mnemonic: " + mnemonic + " vector: " + vector);
                
                
            }
        };
    }
);
