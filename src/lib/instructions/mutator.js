define([
        'vendor/underscore',
        'lib/cell',
        'lib/instructions/subopcodes'
    ], function(_, Cell, subopcodes) {
        return {
            //TODO: implement missing functions
            SetL: function(id) {
                var value = this.stack.pop();
                this.currentFrame.localVars.setById(id, value);
                this.stack.push(value);
            },
            SetN: function() {
                var name = String(this.stack.pop().value);
                var value = this.stack.pop();
                this.currentFrame.localVars.setByName(name, value);
                this.stack.push(value);
            },
            SetG: function() {
                var name = String(this.stack.pop().value);
                var value = this.stack.pop();
                this.globalVars.setByName(name, value);
                this.stack.push(value);
            },
            SetS: function() {
                // TODO: implement
            },
            SetOpL: function(id, op) {
                var mnemonic = subopcodes.SetOp.getMnemonic(op);
                this.hhbc.CGetL2(id);
                this.hhbc[mnemonic]();
                this.currentFrame.localVars.setById(id, this.stack.peek());
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
                var name = String(this.stack.pop().value);
                this.currentFrame.localVars.unsetByName(name);
            },
            UnsetG: function(id) {
                var name = String(this.stack.pop().value);
                this.globalVars.unsetByName(name);
            }
        };
    }
);
