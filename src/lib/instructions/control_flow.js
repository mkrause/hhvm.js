define([
    ], function() {
        return {
            Jmp: function(offset) {
                this.offsetPc(offset);
            },
            RetC: function() {
                var frame = this.callStack.pop();
                var returnValue = frame.stack.pop();
                this.stack.push(returnValue);

                // TODO: assert that frame.stack is empty
                // TODO: assert that returnValue is of type Cell
            },
            RetV: function() {
                var frame = this.callStack.pop();
                var returnValue = frame.stack.pop();
                this.stack.push(returnValue);

                // TODO: assert that frame.stack is empty
                // TODO: assert that returnValue is of type Ref
            }
        };
    }
);
