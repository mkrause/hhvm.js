define([
        'vendor/underscore'
    ], function(_) {
        var Stack = function() {
            this.stack = [];
        };
        
        Stack.prototype.peek = function(index) {
            if (index == undefined){
                return this.stack[this.stack.length - 1];
            } else {
                return this.stack[this.stack.length - 1 - index];
            }
        };
        
        Stack.prototype.push = function(value) {
            this.stack.push(value);
        };
        
        Stack.prototype.pop = function() {
            return this.stack.pop();
        };
        
        Stack.prototype.toString = function() {
            return _.reduce(this.stack, function(stringRep, value) {
                return stringRep + value + "\n";
            }, "");
        };
        
        return Stack;
    }
);
