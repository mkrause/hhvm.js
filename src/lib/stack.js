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
        
        Stack.prototype.toString = function() {
            return _.reduce(this.stack, function(memo, value) {
                return memo + value + "\n";
            }, "");
        };
        
        return Stack;
    }
);
