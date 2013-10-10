define([
    ], function() {
        return {
            Jmp: function(offset) {
                this.pc += offset;
            }
        };
    }
);
