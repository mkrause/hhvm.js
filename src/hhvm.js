define([
        'vendor/underscore',
        'lib/stack',
        'lib/hhbc'
    ], function(_, Stack, hhbc) {
        var Hhvm = function(options) {
            this.output = "";
            
            this.pc = 0;
            this.sp = 0;
            this.stack = new Stack();
        };
        
        Hhvm.prototype.run = function(hhbc) {
        };
        
        return Hhvm;
    }
);
