define([
    ], function() {
        return {
            Jmp: function(offset) {
                this.offsetPc(offset);
            },
            RetC: function() {
                // TODO: assert that frame.stack.peek() is of type Cell
                this.dispatcher.functionReturn();
            },
            RetV: function() {
                // TODO: assert that frame.stack.peek() is of type Ref
                this.dispatcher.functionReturn();
            }
        };
    }
);
