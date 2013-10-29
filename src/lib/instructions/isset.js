define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref'
    ], function(_, Cell, Ref) {

        var emptyHelper = function(vm, cell) {
            if(cell === undefined) {
                vm.hhbc.True();
            } else {
                vm.stack.push(new Cell(!cell.value));
            }
        };

        return {
            EmptyL: function(id) {
                var x = this.currentFrame.localVars.getById(id);
                emptyHelper(this, x);
            },
            EmptyN: function() {
                var name = this.stack.pop().value;
                var x = this.currentFrame.localVars.getByName(name);
                emptyHelper(this, x);
            },
            EmptyG: function() {
                var name = this.stack.pop().value;
                var x = this.globalVars.getByName(name);
                emptyHelper(this, x);
            }
        };
    }
);
