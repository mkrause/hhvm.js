define([
        'vendor/underscore',
    ], function(_) {
        return {
           CGetL: function(localVariableId) {
               var local = this.getLocal(localVariableId);
               if(local === undefined){
                   this.warning("Could not find variable " + localVariableId + " in CGetL");
                   this.stack.push(new Cell(null));
               } else {
                   this.stack.push(new Cell(local));
               }
           },
           CGetL2: function(localVariableId) {
               var top = this.stack.pop();
               this.hhbc.CGetL(localVariableId);
               this.stack.push(top);
           },
           //TODO: implement missing functions
           VGetL: function(localVariableId) {
               var local = this.getLocal(localVariableId);
               if(local === undefined) {
                   newCell = new Cell(null);
                   this.setLocal(localVariableId, newCell);
                   this.stack.push(new Ref(newCell));
               } else {
                   if(local instanceof Ref){
                       this.stack.push(local);
                   } else {
                       this.stack.push(new Ref(local));
                   }
               }
           }
           //TODO: implement missing functions
        };
    }
);
