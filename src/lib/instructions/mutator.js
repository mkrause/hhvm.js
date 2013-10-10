define([
        'vendor/underscore',
    ], function(_) {
        return {
           SetL: function(localVariableId) {
               var localValue = this.stack.pop();
               this.setLocal(localVariableId, localValue);
               this.stack.push(localValue);
           },
           //TODO: implement missing functions
        };
    }
);
