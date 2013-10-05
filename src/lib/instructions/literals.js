define([
        'vendor/underscore'
    ], function(_) {
        return {
            Null: function() {
                this.stack.push(null);
            },
            True: function() {
                this.stack.push(true);
            },
            False: function() {
                this.stack.push(false);
            },
            NullUninit: function() {
                this.stack.push(undefined);
            },
            Int: function() {
                this.stack.push(this.arg('int'));
            },
            Double: function() {
                this.stack.push(this.arg('double'));
            },
            String: function() {
                this.stack.push(this.arg('litstr'));
            },
            Array: function() {
                this.stack.push(this.arg('array'));
            },
            NewArray: function() {
                this.stack.push([]);
            },
            NewPackedArray: function(numElems) {
                var newArray = [];
                for (var i = 0; i < numElems; i++){
                    newArray.push(this.stack.pop());
                }
                this.stack.push(newArray);
            },
            AddElemC: function() {
                var three = this.stack.peek(2);
                if (typeof three == Array){
                    three[this.stack.peek(1)] = this.stack.peek();
                    this.stack.push(three);
                } else {
                    this.error("FATAL ERROR: Stack error when executing AddElemC")
                }
            },
            AddElemV: function() {
                /*
                var three = this.stack.peek(2);
                if (typeof three == Array){
                    three[this.stack.peek(1)] = this.stack.peek(); //TODO: push pointer...?
                    this.stack.push(three);
                } else {
                    this.error("FATAL ERROR: Stack error when executing AddElemC")
                }
                */
            }
        };
    }
);
