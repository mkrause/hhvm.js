define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref',
        'lib/base',
        'lib/instructions/subopcodes'
    ], function(_, Cell, Ref, Base, subopcodes) {
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
                var cell = base.value;
                if (cell === null) {
                    this.hhbc.Null();
                    return;
                }

                if(cell.value === null || cell.value === false || cell.value === "") {
                    cell.value = [];
                }

                var index = this.stack.pop().value;
                var mnemonic = subopcodes.IncDec.getMnemonic(op);
                if(_.isArray(cell.value)) {
                    if(cell.value[index] === undefined) {
                        this.warning("Undefined variable at index: " + index);
                        cell.value[index] = null;
                    }
                    //Inc/Dec
                    switch(mnemonic) {
                        case "PreInc":
                            cell.value[index]++;
                            this.stack.push(new Cell(cell.value[index]));
                            break;
                        case "PostInc":
                            this.stack.push(new Cell(cell.value[index]));
                            cell.value[index]++;
                            break;
                        case "PreDec":
                            cell.value[index]--;
                            this.stack.push(new Cell(cell.value[index]));
                            break;
                        case "PostDec":
                            this.stack.push(new Cell(cell.value[index]));
                            cell.value[index]--;
                            break;
                    }
                } else if(cell.value === true || _.isNumber(cell.value)) {
                    this.warning("Member of true or number cannot be incremented. Pushing null on the stack");
                    this.hhbc.Null();
                } else {
                    throw new Error("Objects or strings not supported yet");
                }
            }
            //TODO: implement missing operations
        };
    }
);
