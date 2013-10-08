define([
    ], function() {
        return {
            Jmp: function() {
                this.pc += this.arg('int');
            }
        };
    }
);
