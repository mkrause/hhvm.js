define([
        'vendor/underscore'
    ], function(_) {
        var Stack = function() {
            this.stack = [];
        };
        
        Stack.prototype.peek = function() {
            return this.stack[this.stack.length - 1];
        };
        
        Stack.prototype.push = function(value) {
            this.stack.push(value);
        };
        
        Stack.prototype.pop = function() {
            return this.stack.pop();
        };
        
        Stack.prototype.isEmpty = function() {
            return this.stack.length === 0;
        };

        Stack.prototype.length = function() {
            return this.stack.length;
        };
        
        Stack.prototype.toString = function() {
            return _.reduce(this.stack, function(stringRep, value) {
                return stringRep + value + "\n";
            }, "");
        };
        
        return Stack;
    }
);
