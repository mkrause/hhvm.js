define([
        'vendor/underscore',
    ], function(_) {`
        return {
           //XXX: local variables are stored as cells
           SetL: function(localVariableId) {
               var localValue = this.stack.pop();
               this.setLocal(localVariableId, localValue);
               this.stack.push(localValue);
           },
           //TODO: implement missing functions
        };
    }
);
