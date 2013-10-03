$script([
        'vendor/underscore'
    ], function() {
        var hhvm = window.hhvm = function(options) {
            this.output = "";
            this.stack = [];
        };
        
        hhvm.prototype.run = function(hhbc) {
            this.output = "FIXME";
        };
    }
);
