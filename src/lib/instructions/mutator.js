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
            SetS: function() {
                // TODO: implement
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
                var vars = this.currentFrame.localVars;
                var cell = vars.getById(id);
                var mnemonic = subopcodes.IncDec.getMnemonic(op);
                if(cell === undefined) {
                    cell = new Cell(null);
                    vars.setById(id, value);
                    var name = vars.getNameFromId(id);
                    this.notify("Undefined variable: " + name);
                }
                var value = cell.value;
                switch (mnemonic) {
                    case "PreInc":
                        value++;
                        vars.setById(id, new Cell(value));
                        this.stack.push(new Cell(value));
                        break;
                    case "PostInc":
                        this.stack.push(new Cell(value));
                        value++;
                        vars.setById(id, new Cell(value));
                        break;
                    case "PreDec":
                        value--;
                        vars.setById(id, new Cell(value));
                        this.stack.push(new Cell(value));
                        break;
                    case "PostDec":
                        this.stack.push(new Cell(value));
                        value--;
                        vars.setById(id, new Cell(value));
                        break;
                }
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
