define([
        'vendor/underscore'
    ], function(_) {
        return {
            Nop: function() { this.print("NOP"); },
            PopC: function() {
                this.stack.pop();
            },
            PopV: function() {
                this.stack.pop();
            },
            PopR: function() {
                this.stack.pop();
            },
            Dup: function() {
                this.stack.push(this.stack.peek());
            },
            Box: function() {
                var top = this.stack.pop();
                this.stack.push(this.ref(top));
            },
            Unbox: function() {
                var top = this.stack.pop();
                this.stack.push(top.value());
            },
            BoxR: function() {
                if (this.stack.peek().type != 'ref') {
                    this.hhbc.Box();
                }
            },
            UnboxR: function() {
                if (this.stack.peek().type != 'cell') {
                    this.hhbc.Unbox(this);
                }
            }
        };
    }
);
