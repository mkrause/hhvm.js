define([
        'lib/cell',
        'lib/ref'
    ], function(Cell, Ref) {
        return {
            Concat: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell("" + val2 + val1));
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
                } else if(_.isArray(val1) || _.isArray(val2)) {
                    throw new Error("error when executing Add");
                } else {
                    this.stack.push(new Cell(val2 + val1));
                }
            },
            Sub: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if(_.isArray(val1) || _.isArray(val2)) {
                    throw new Error("error when substracting in Sub");
                } else {
                    this.stack.push(new Cell(val2 - val1));
                }
            },
            Mul: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if(_.isArray(val1) || _.isArray(val2)) {
                    throw new Error("error when substracting in Mul");
                } else {
                    this.stack.push(new Cell(val2 * val1));
                }
            },
            Div: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if(_.isArray(val1) || _.isArray(val2)) {
                    throw new Error("error when substracting in Div");
                } else {
                    this.stack.push(new Cell(val2 / val1));
                }
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
                    this.hhbc.Null();
                } else if(_.isBoolean(value)) {
                    value = value ? 1 : 0;
                } else if(_.isFinite(parseFloat(value, 10))) {
                    value = parseFloat(value, 10);
                } else if (!_.isFinite(value)) {
                    this.warning("cannot take sqrt of a negative number in Sqrt");
                    this.hhbc.Null();
                    return;
                }
                this.stack.push(new Cell(Math.sqrt(value)));
            },
            Strlen: function() {
                var string = this.stack.pop().value;
                if (_.isArray(string)) {
                    this.warning("Argument is an array instead of a string");
                    this.hhbc.Null();
                    return;
                } else if (!_.isString(string)) {
                    string = string.toString();
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
                if (_.isObject(val1) || _.isObject(val2)) {
                    throw new Error("BitAnd not supported for Objects");
                } else if (_.isString(val1) && _.isString(val2)) {
                    var str = "";
                    var len = Math.min(val1.length, val2.length);
                    _.times(len, function(i) {
                        str += String.fromCharCode(val1.charCodeAt(i) & val2.charCodeAt(i));
                    });
                    this.stack.push(new Cell(str));
                } else {
                    this.stack.push(new Cell(val2 & val1));
                }
            },
            BitOr: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if (_.isObject(val1) || _.isObject(val2)) {
                    throw new Error("BitOr not supported for Objects");
                } else if (_.isString(val1) && _.isString(val2)) {
                    var str = "";
                    var len = Math.min(val1.length, val2.length);
                    _.times(len, function(i) {
                        str += String.fromCharCode(val1.charCodeAt(i) | val2.charCodeAt(i));
                    });
                    this.stack.push(new Cell(str));
                } else {
                    this.stack.push(new Cell(val2 | val1));
                }
            },
            BitXor: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if (_.isObject(val1) || _.isObject(val2)) {
                    throw new Error("BitXor not supported for Objects");
                } else if (_.isString(val1) && _.isString(val2)) {
                    var str = "";
                    var len = Math.min(val1.length, val2.length);
                    _.times(len, function(i) {
                        str += String.fromCharCode(val1.charCodeAt(i) ^ val2.charCodeAt(i));
                    });
                    this.stack.push(new Cell(str));
                } else {
                    this.stack.push(new Cell(val2 ^ val1));
                }
            },
            BitNot: function() {
                var value = this.stack.pop().value;
                if (value === null || _.isBoolean(value) || _.isArray(value) || _.isObject(value)) {
                    throw new Error("BitXor not supported");
                } else if (_.isString(value)) {
                    var str = "";
                    _.times(value.length, function(i) {
                        str += String.fromCharCode(~value.charCodeAt(i));
                    });
                    this.stack.push(new Cell(str));
                } else {
                    this.stack.push(new Cell(~value));
                }
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
                var value = this.stack.pop().value;
                if(value !== null){
                    this.stack.push(new Cell(value.toString()));
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
                this.print(this.stack.pop().value);
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
