define([
        'vendor/underscore'
    ], function(_) {
        return {
            Null: function() {
                this.stack.push(this.createNull());
            },
            True: function() {
                this.stack.push(this.createTrue());
            },
            False: function() {
                this.stack.push(this.createFalse());
            },
            NullUninit: function() {
                this.stack.push(this.createUninit());
            },
            Int: function(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8) {
                // Since JavaScript uses doubles, it can only represent integers exactly up to
                // 2^53. So for now, we only support only 32 bit integers
                var value = byte8 | byte7 << 8 | byte6 << 16 | byte5 << 24;
                this.stack.push(value);
            },
            Double: function() {
                this.stack.push(this.arg());
            },
            String: function() {
                this.stack.push(this.litstr(this.arg()));
            },
            Array: function() {
                this.stack.push(this.array(this.arg()));
            },
        };
    }
);
