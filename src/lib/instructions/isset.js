define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref'
    ], function(_, Cell, Ref) {
        return {
            EmptyG: function(){
                var x = this.globalVars.getById(this.stack.pop());
                if(x === undefined){
                    this.hhbc.True();
                } else {
                    this.stack.push(new Cell(!x));
                }
            }
        };
    }
);
