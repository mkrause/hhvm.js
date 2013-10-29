define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref'
    ], function(_, Cell, Ref) {

        var cGetHelper = function(vm, cell, name) {
            if(cell === undefined) {
                vm.warning("Undefined variable: " + name);
                cell = new Cell(null);
            }
            vm.stack.push(cell);
        };
        var vGetHelper = function(vm, cell, name, store) {
            if(cell === undefined) {
                cell = new Cell(null);
                store.setByName(name, cell);
            }

            // Box if necessary and push on stack
            vm.stack.push((cell instanceof Ref) ? cell : new Ref(cell));
        };

        return {
            CGetL: function(id) {
                var value = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                cGetHelper(this, value, name);
            },
            CGetL2: function(id) {
                var top = this.stack.pop();
                this.hhbc.CGetL(id);
                this.stack.push(top);
            },
            CGetL3: function(id) {
                var top = this.stack.pop();
                var subtop = this.stack.pop();
                this.hhbc.CGetL(id);
                this.stack.push(subtop);
                this.stack.push(top);
            },
            CGetN: function() {
                var name = String(this.stack.pop().value);
                var value = this.currentFrame.localVars.getByName(name);
                cGetHelper(this, value, name);
            },
            CGetG: function() {
                var name = String(this.stack.pop().value);
                var value = this.globalVars.getByName(name);
                cGetHelper(this, value, name);
            },
            CGetS: function() {
                //TODO: implement
            },
            VGetL: function(id) {
                var value = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                vGetHelper(this, value, name, this.currentFrame.localVars);
            },
            VGetN: function() {
                var name = String(this.stack.pop().value);
                var value = this.currentFrame.localVars.getByName(name);
                vGetHelper(this, value, name, this.currentFrame.localVars);
            },
            VGetG: function() {
                var name = String(this.stack.pop().value);
                var value = this.globalVars.getByName(name);
                vGetHelper(this, value, name, this.globalVars);
            },
            VGetS: function() {
                //TODO: implement
            },
            AGetC: function() {
                //TODO: implement
            },
            AGetL: function(id) {
                //TODO: implement
            }
        };
    }
);
