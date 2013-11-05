define([
        'lib/cell',
        'lib/ref'
    ], function(Cell, Ref) {

        var opBitAnd = function (a, b) { return a & b; };
        var opBitOr  = function (a, b) { return a | b; };
        var opBitXor = function (a, b) { return a ^ b; };
        var opBitNot = function (a, b) { return ~a;    };

        var checkArrayType = function (val1, val2) {
            if(_.isArray(val1) || _.isArray(val2)) {
                throw new Error("Argument is of type array");
            }
        };

        var bitwiseHelper = function (val1, val2, op) {
            if (_.isObject(val1) || _.isObject(val2)) {
                throw new Error("Bitwise operation not supported on objects");
            } else if (_.isString(val1) && _.isString(val2)) {
                var str = "";
                var len = Math.min(val1.length, val2.length);
                _.times(len, function(i) {
                    str += String.fromCharCode(op(val2.charCodeAt(i), val1.charCodeAt(i)));
                });
                this.stack.push(new Cell(str));
            } else {
                this.stack.push(new Cell(op(val2, val1)));
            }
        };

        return {
            Concat: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(new Cell(val2.toString() + val1.toString()));
            },
            Abs: function() {
                this.stack.push(new Cell(Math.abs(this.stack.pop().value)));
            },
            Add: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if(_.isArray(val1) && _.isArray(val2)) {
                    var array = [];
                    array.concat(val2, val1);
                    this.stack.push(new Cell(array));
                    return;
                }

                checkArrayType(val2, val1);
                this.stack.push(new Cell(val2 + val1));
            },
            Sub: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                checkArrayType(val2, val1);
                this.stack.push(new Cell(val2 - val1));
            },
            Mul: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                checkArrayType(val2, val1);
                this.stack.push(new Cell(val2 * val1));
            },
            Div: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                checkArrayType(val2, val1);
                this.stack.push(new Cell(val2 / val1));
            },
            Mod: function() {
                var val1 = parseInt(this.stack.pop().value, 10);
                var val2 = parseInt(this.stack.pop().value, 10);
                if(!_.isNaN(val1) && !_.isNaN(val2)) {
                    this.stack.push(new Cell(val2 % val1));
                } else {
                    this.hhbc.False();
                }
            },
            Sqrt: function() {
                var value = this.stack.pop().value;
                if(value < 0) {
                    this.stack.push(new Cell(NaN));
                } else if(value === null) {
                    value = 0;
                } else if(_.isBoolean(value)) {
                    value = value ? 1 : 0;
                } else if(_.isFinite(parseFloat(value, 10))) {
                    value = parseFloat(value, 10);
                } else if (!_.isFinite(value)) {
                    this.warning("Cannot calculate square root of given value");
                    this.hhbc.Null();
                    return;
                }
                this.stack.push(new Cell(Math.sqrt(value)));
            },
            Strlen: function() {
                var cell = this.stack.pop();
                var string = "";
                if (_.isArray(cell)) {
                    this.warning("Argument type is array instead of string");
                    this.hhbc.Null();
                    return;
                } else if (_.isString(cell.value)) {
                    string = cell.value;
                } else {
                    string = cell.toString();
                }
                this.stack.push(new Cell(string.length));
            },
            Xor: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 && !val1 || !val2 && val1));
            },
            Not: function() {
                var val1 = this.stack.pop().value;
                this.stack.push(new Cell(!val1));
            },
            Same: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 === val1));
            },
            NSame: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 !== val1));
            },
            Eq: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 == val1));
            },
            Neq: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 != val1));
            },
            Lt: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 < val1));
            },
            Lte: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 <= val1));
            },
            Gt: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 > val1));
            },
            Gte: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 >= val1));
            },
            BitAnd: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                var result = bitwiseHelper(val1, val2, opBitAnd);
                this.stack.push(new Cell(result));
            },
            BitOr: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                var result = bitwiseHelper(val1, val2, opBitOr);
                this.stack.push(new Cell(result));
            },
            BitXor: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                var result = bitwiseHelper(val1, val2, opBitXor);
                this.stack.push(new Cell(result));
            },
            BitNot: function() {
                var value = this.stack.pop().value;
                if (value === null || _.isBoolean(value) || _.isArray(value) || _.isObject(value)) {
                    throw new Error("Bitwise operation not supported");
                }

                var result = bitwiseHelper(value, value, opBitNot);
                this.stack.push(new Cell(result));
            },
            Shl: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 << val1));
            },
            Shr: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 >> val1));
            },
            Floor: function() {
                var value = parseInt(this.stack.pop().value, 10);
                this.stack.push(new Cell(Math.floor(value)));
            },
            Ceil: function(){
                var value = parseInt(this.stack.pop().value, 10);
                this.stack.push(new Cell(Math.ceil(value)));
            },
            CastBool: function() {
                var value = this.stack.pop().value;
                if(_.isString(value)) {
                    value = !(value === "" || value === "0");
                } else {
                    value = !!value;
                }
                this.stack.push(new Cell(value));
            },
            CastInt: function() {
                var value = parseInt(this.stack.pop().value, 10);
                this.stack.push(new Cell(value));
            },
            CastDouble: function() {
                var value = parseFloat(this.stack.pop().value, 10);
                this.stack.push(new Cell(value));
            },
            CastString: function() {
                var cell = this.stack.pop();
                if(cell.value !== null){
                    this.stack.push(new Cell(cell.toString()));
                } else {
                    throw new Error("Object does not implement toString. Needed for CastString.");
                }
            },
            CastArray: function() {
                this.stack.push(new Cell(Array.prototype.slice.call(this.stack.pop().value)));
            },
            CastObject: function() {
                this.stack.push(new Cell(Object(this.stack.pop().value)));
            },
            InstanceOf: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                var className = "";
                if(_.isString(val1)) {
                    className = val1;
                } else if(_.isObject(val1)) {
                    className = typeof val1;
                } else {
                    throw new Error("InstanceOf not supported for non-object");
                }

                var def = this.prog.getClassByName(className) !== undefined;
                this.stack.push(new Cell(def && typeof val2 === className));
            },
            InstanceOfD: function(className) {
                var value = this.stack.pop().value;
                var def = this.prog.getClassByName(className) !== undefined;
                this.stack.push(new Cell(def && typeof value === className));
            },
            Print: function() {
                var message = this.stack.pop().toString();
                this.print(message);
                this.stack.push(new Cell(1));
            },
            Clone: function() {
                var value = this.stack.pop().value;
                if(_.isObject(value)) {
                    this.stack.push(new Cell(JSON.parse(JSON.stringify(value))));
                } else {
                    throw new Error("Clone not supported for non-objects");
                }
            },
            Exit: function() {
                var value = this.stack.pop().value;
                var intValue = parseInt(value, 10);
                if(isNaN(intValue)) {
                    this.print(value);
                    intValue = 0;
                }
                this.hhbc.Null();
                this.stop(intValue);
            },
            Fatal: function(subop) {
                var errorMessage = this.stack.pop().value;
                if(_.isString(errorMessage)){
                    // TODO: use subop
                    // case 0: throw a runtime fatal error with a full backtrace.
                    // case 1: throw a parse fatal error with a full backtrace.
                    // case 2: throw a runtime fatal error with the backtrace omitting the top frame.
                    throw new Error(errorMessage);
                } else {
                    throw new Error("No string error mesage provided");
                }
            }
        };
    }
);
