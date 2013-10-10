define([
    ], function() {
        return {
            Jmp: function(offset) {
                this.offsetPc(offset);
            }
        };
    }
);
