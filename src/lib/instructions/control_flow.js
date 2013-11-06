define([
    ], function() {
        return {
            Jmp: function(offset) {
                // Compensate because the offset is relative to the beginning of the instruction
                // Add parameter length + compensate pc incremention
                offset -= 4 + 1;
                this.offsetPc(offset);
            },
            JmpZ: function(offset) {
                var value = this.stack.pop().value;
                if (!value) {
                    this.hhbc.Jmp(offset);
                }
            },
            JmpNZ: function(offset) {
                var value = this.stack.pop().value;
                if (value) {
                    this.hhbc.Jmp(offset);
                }
            },
            RetC: function() {
                this.dispatcher.functionReturn();
            },
            RetV: function() {
                this.hhbc.RetC();
            }
        };
    }
);
