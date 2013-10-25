define([
    ], function() {
        return {
            Jmp: function(offset) {
                // Compensate because the offset is relative to the beginning of the instruction
                // Add parameter length + compensate pc incremention
                offset -= 4 + 1;
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
