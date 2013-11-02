define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref',
        'lib/base',
        'lib/instructions/subopcodes'
    ], function(_, Cell, Ref, Base, subopcodes) {
        var incDecElem = function(vm, base, op, offset) {
            var cell = base.value;
            if (cell === null) {
                vm.warning("Member of true or number cannot be incremented. Pushing null on the stack");
                vm.hhbc.Null();
                return;
            }

            if(cell.value === null || cell.value === false || cell.value === "") {
                cell.value = [];
            }
            var mnemonic = subopcodes.IncDec.getMnemonic(op);
            if(_.isArray(cell.value)) {
                if(cell.value[offset] === undefined) {
                    vm.warning("Undefined variable at offset: " + offset);
                    cell.value[offset] = null;
                }
                //Inc/Dec
                switch(mnemonic) {
                    case "PreInc":
                        cell.value[offset]++;
                        vm.stack.push(new Cell(cell.value[offset]));
                        break;
                    case "PostInc":
                        vm.stack.push(new Cell(cell.value[offset]));
                        cell.value[offset]++;
                        break;
                    case "PreDec":
                        cell.value[offset]--;
                        vm.stack.push(new Cell(cell.value[offset]));
                        break;
                    case "PostDec":
                        vm.stack.push(new Cell(cell.value[offset]));
                        cell.value[offset]--;
                        break;
                }
            } else if(cell.value === true || _.isNumber(cell.value)) {
                vm.warning("Member of true or number cannot be incremented. Pushing null on the stack");
                vm.hhbc.Null();
            } else {
                throw new Error("Objects or strings not supported yet for value " + cell.value);
            }
        };

        return {
            BaseC: function() {
                var value = this.stack.pop().value;
                return new Base(value);
            },
            BaseR: function() {
                this.hhbc.operations.BaseC();
            },
            BaseL: function(id) {
                var value = this.currentFrame.localVars.getById(id);
                if(value === undefined) {
                    value = null;
                }
                return new Base(value);
            },
            BaseLW: function(id) {
                var value = this.currentFrame.localVars.getById(id);
                if(value === undefined) {
                    this.warning("Undefined variable: " + id);
                    value = null;
                }
                return new Base(value);
            },
            BaseLD: function(id) {
                this.currentFrame.localVars.defineById(id);
                var value = this.currentFrame.localVars.getById(id);
                return new Base(value);
            },
            BaseLWD: function(id) {
                var wasDefined = this.currentFrame.localVars.defineById(id);
                if(!wasDefined) {
                    this.warning("Undefined variable: " + id);
                }
                var value = this.currentFrame.localVars.getById(id);
                return new Base(value);
            },
            //TODO: implement missing base operations
            CGetElemC: function(base) {
                var cell = base.value;
                if (cell === null) {
                    this.hhbc.Null();
                    return;
                }

                var value = cell.value;
                var index = this.stack.pop().value;
                var result = null;
                if (_.isArray(value)) {
                    if (value[index] !== undefined) {
                        result = value[index];
                    } else {
                        this.warning("Undefined variable at index: " + index);
                        result = null;
                    }
                } else if (_.isObject(value)) {
                    throw new Error("Objects not supported yet");
                } else if (_.isString(value)) {
                    index = parseInt(index, 10);
                    if (index >= 0 && index < value.length) {
                        result = value.charAt(index);
                    } else {
                        this.warning("Undefined variable at index: " + index);
                        result = "";
                    }
                }
                this.stack.push(new Cell(result));
            },
            IncDecElemC: function(base, op) {
                var offset = this.stack.pop().value;
                incDecElem(this, base, op, offset);
            },
            IncDecElemL: function(base, op, localVarId) {
                var offset = this.currentFrame.localVars.getById(localVarId);
                incDecElem(this, base, op, offset);
            }
            //TODO: implement missing operations
        };
    }
);
