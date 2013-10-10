define([
    ], function() {
        return {
            Jmp: function(offset) {
                this.pc += offset;
            },
            //TODO: implement missing functions
            RetC: function() {
                return this.stack.pop();
            },
            RetV: function() {
                return this.stack.pop();
            }
        };
    }
);
