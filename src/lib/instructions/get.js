define([
        'vendor/underscore',
    ], function(_) {
        return {
           CGetL: function(localVariableId) {
               var local = this.getLocal(localVariableId);
               if(local == undefined){
                   this.warning("Could not find variable " + localVariableId + " in CGetL");
                   this.stack.push(new Cell(null));
               } else {
                   this.stack.push(new Cell(local));
               }
           },
           //TODO: implement missing functions
        };
    }
);
