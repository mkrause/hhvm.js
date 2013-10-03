define([
        'vendor/underscore',
        'lib/hhbc'
    ], function() {
        var hhvm = function(options) {
            this.output = "";
            this.stack = [];
        };
        
        hhvm.prototype.run = function(hhbc) {
            this.output = "FIXME";
        };
        
        return hhvm;
    }
);
