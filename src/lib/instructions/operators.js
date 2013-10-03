define([
        'vendor/underscore'
    ], function(_) {
        return {
            Print: function() {
                this.print(this.stack.pop());
            }
        };
    }
);
