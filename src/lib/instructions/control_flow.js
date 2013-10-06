define([
        'vendor/underscore'
    ], function(_) {
        return {
            Jmp: function() {
                this.pc += this.arg('int');
            }
        };
    }
);
