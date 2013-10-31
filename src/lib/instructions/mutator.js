define([
        'vendor/underscore',
        'lib/cell',
        'lib/instructions/subopcodes'
    ], function(_, Cell, subopcodes) {

        var setOpHelper = function(vm, store, name, op, pushArguments) {
            var mnemonic = subopcodes.SetOp.getMnemonic(op);
            var wasDefined = store.defineByName(name);

            if (!wasDefined) {
                vm.warning("Undefined variable: " + name);
            }

            pushArguments();
            vm.hhbc[mnemonic]();
            store.setByName(name, vm.stack.peek());
        };

        var incDecHelper = function(vm, store, name, op) {
            var mnemonic = subopcodes.IncDec.getMnemonic(op);
            var wasDefined = store.defineByName(name);

            if (!wasDefined) {
                vm.warning("Undefined variable: " + name);
            }

            var cell = store.getByName(name);
            switch (mnemonic) {
                case "PreInc":
                    cell.value++;
                    store.setByName(name, cell);
                    vm.stack.push(cell.clone());
                    break;
                case "PostInc":
                    vm.stack.push(cell.clone());
                    cell.value++;
                    store.setByName(name, cell);
                    break;
                case "PreDec":
                    cell.value--;
                    store.setByName(name, cell);
                    vm.stack.push(cell.clone());
                    break;
                case "PostDec":
                    vm.stack.push(cell.clone());
                    cell.value--;
                    store.setByName(name, cell);
                    break;
            }
        };

        return {
            //TODO: implement missing functions
            SetL: function(id) {
                var value = this.stack.pop();
                this.currentFrame.localVars.setById(id, value);
                this.stack.push(value);
            },
            SetN: function() {
                var name = this.stack.pop().toString();
                var value = this.stack.pop();
                this.currentFrame.localVars.setByName(name, value);
                this.stack.push(value);
            },
            SetG: function() {
                var name = this.stack.pop().toString();
                var value = this.stack.pop();
                this.globalVars.setByName(name, value);
                this.stack.push(value);
            },
            SetOpL: function(id, op) {
                var name = this.currentFrame.localVars.getNameFromId(id);
                var pushArguments = _.bind(function() {
                    this.hhbc.CGetL2(id);
                }, this);

                setOpHelper(this, this.currentFrame.localVars, name, op, pushArguments);
            },
            SetOpN: function(op) {
                var cell = this.stack.pop();
                var name = this.stack.peek().toString();
                var pushArguments = _.bind(function() {
                    this.hhbc.CGetN();
                    this.stack.push(cell);
                }, this);

                setOpHelper(this, this.currentFrame.localVars, name, op, pushArguments);
            },
            SetOpG: function(op) {
                var cell = this.stack.pop();
                var name = this.stack.peek().toString();
                var pushArguments = _.bind(function() {
                    this.hhbc.CGetG();
                    this.stack.push(cell);
                }, this);

                setOpHelper(this, this.globalVars, name, op, pushArguments);
            },
            IncDecL: function(id, op) {
                var name = this.currentFrame.localVars.getNameFromId(id);
                incDecHelper(this, this.currentFrame.localVars, name, op);
            },
            IncDecN: function(op) {
                var name = this.stack.pop().toString();
                incDecHelper(this, this.currentFrame.localVars, name, op);
            },
            IncDecG: function(op) {
                var name = this.stack.pop().toString();
                incDecHelper(this, this.globalVars, name, op);
            },
            BindL: function(id) {
                var ref = this.stack.peek();
                this.currentFrame.localVars.setById(id, ref);
            },
            BindN: function() {
                var ref = this.stack.pop();
                var name = this.stack.pop().toString();
                this.currentFrame.localVars.setByName(name, ref);
                this.stack.push(ref);
            },
            BindG: function() {
                var ref = this.stack.pop();
                var name = this.stack.pop().toString();
                this.globalVars.getByName(name, ref);
                this.stack.push(ref);
            },
            UnsetL: function(id) {
                this.currentFrame.localVars.unsetById(id);
            },
            UnsetN: function(id) {
                var name = this.stack.pop().toString();
                this.currentFrame.localVars.unsetByName(name);
            },
            UnsetG: function(id) {
                var name = this.stack.pop().toString();
                this.globalVars.unsetByName(name);
            }
        };
    }
);
