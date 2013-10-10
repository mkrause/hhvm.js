define([
    ], function() {
        return {
            Jmp: function(offset) {
<<<<<<< HEAD
                this.pc += offset;
            },
            //TODO: implement missing functions
            RetC: function() {
                return this.stack.pop();
            },
            RetV: function() {
                return this.stack.pop();
=======
                this.offsetPc(offset);
>>>>>>> ae60293f441d03794c391963a5a15b6ecbb0a440
            }
        };
    }
);
