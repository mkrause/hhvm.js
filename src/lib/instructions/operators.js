define([
    ], function() {
        return {
            Concat: function() {
                this.stack.push(new Cell(this.stack.pop().value + this.stack.value));
            },
            Abs: function() {
                this.stack.push(new Cell(Math.abs(this.stack.pop().value)));
            },
            Add: function() {
                var T1 = this.stack.pop().value;
                var T2 = this.stack.pop().value;
                if(T1 instanceof Array && T2 instanceof Array){
                    var newArray = [];
                    newArray.concat(T1, T2);
                    this.stack.push(new Cell(newArray));
                } else if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when executing Add");
                } else {
                    this.stack.push(new Cell(T1 + T2));
                }
            },
            Sub: function() {
                var T1 = this.stack.pop().value;
                var T2 = this.stack.pop().value;
                if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when substracting in Sub");
                } else {
                    this.stack.push(new Cell(T2 - T1));
                }
            },
            Mul: function() {
                var T1 = this.stack.pop().value;
                var T2 = this.stack.pop().value;
                if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when substracting in Mul");
                } else {
                    this.stack.push(new Cell(T2 * T1));
                }
            },
            Div: function() {
                var T1 = this.stack.pop().value;
                var T2 = this.stack.pop().value;
                if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when substracting in Div");
                } else {
                    this.stack.push(new Cell(T2 / T1));
                }
            },
            Mod: function() {
                var T1 = this.stack.pop().value;
                var T2 = this.stack.pop().value;
                if(!isNan(parseFloat(T1)) && isFinite(T1) && !isNaN(parseFloat(T2)) && isFinite(T2)){
                    this.stack.push(new Cell(Math.floor(T2) % Math.floor(T1)));
                } else {
                    this.stack.push(new Cell(false));
                }
            },
            Sqrt: function() {
                var value = this.stack.pop().value;
                if(value < 0){
                    this.stack.push(new Cell(NaN));
                } else if(value == undefined || value instanceof boolean || value instanceof int || value instanceof double || !isNaN(parseFloat(value))){
                    this.stack.push(new Cell(Math.sqrt(value)));
                } else {
                    this.warning("cannot take sqrt of a negative number in Sqrt");
                }
            },
            Xor: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                this.stack.push(new Cell(val2 && !val1 || !val2 && val1));
            },
            Not: function() {
                this.stack.push(new Cell(!this.stack.pop().value));
            },
            Same: function() {
                this.stack.push(new Cell(this.stack.pop().value === this.stack.pop().value));
            },
            NSame: function() {
                this.stack.push(new Cell(this.stack.pop().value !== this.stack.pop().value));
                this.stack.push(this.stack.pop() !== this.stack.pop());
            },
            Eq: function() {
                this.stack.push(new Cell(this.stack.pop().value == this.stack.pop().value));
            },
            Neq: function() {
                this.stack.push(new Cell(this.stack.pop().value != this.stack.pop().value));
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
                if(!(val1 instanceof String) && val1 instanceof Object || !(val2 instanceof String) && val2 instanceof Object){
                    this.fatal("BitAnd not supported for Objects");
                } else {
                    this.stack.push(new Cell(val2 & val1));
                }
            },
            BitOr: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if(!(val1 instanceof String) && val1 instanceof Object || !(val2 instanceof String) && val2 instanceof Object){
                    this.fatal("BitOr not supported for Objects");
                } else {
                    this.stack.push(new Cell(val2 | val1));
                }
            },
            BitXor: function() {
                var val1 = this.stack.pop().value;
                var val2 = this.stack.pop().value;
                if(!(val1 instanceof String) && val1 instanceof Object || !(val2 instanceof String) && val2 instanceof Object){
                    this.fatal("BitXor not supported for Objects");
                } else {
                    this.stack.push(new Cell(val2 ^ val1));
                }
            },
            BitNot: function() {
                var value = this.stack.pop().value;
                if(!(value instanceof String) && !(value instanceof Array) && value instanceof Object){
                    this.fatal("BitNot not supported for Objects");
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
                this.stack.push(new Cell(Math.floor(this.stack.pop().value)));
            },
            Ceil: function(){
                this.stack.push(new Cell(Math.ceil(this.stack.pop())));
            },
            CastBool: function() {
                var value = this.stack.pop().value;
                if(value instanceof String){
                    this.stack.push(new Cell(value.toLowerCase() == "true" || value.toLowerCase() == "1"));
                } else {
                    this.stack.push(new Cell(value ? true : false));
                }
            },
            CastInt: function() {
                this.stack.push(new Cell(parseInt(this.stack.pop().value)));
            },
            CastDouble: function() {
                this.stack.push(new Cell(parseFloat(this.stack.pop().value)));
            },
            CastString: function() {
                var value = this.stack.pop().value;
                if(value != null){
                    this.stack.push(new Cell(value.toString()));
                } else {
                    this.fatal("Object does not implement toString. Needed for CastString.");
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
                if(val1 instanceof String){
                    this.stack.push(new Cell(typeof val2 == val1));
                } else if(val1 instanceof Object){
                    this.stack.push(new Cell(typeof val1 == typeof val2));
                } else {
                    this.fatal("InstanceOf not supported for non-object");
                }
            },
            //TODO: implement instanceOfD if we know what it should do
            Print: function() {
                this.print(this.stack.pop().value);
                this.stack.push(new Cell(1));
            },
            Clone: function() {
                var value = this.stack.pop().value;
                if(value instanceof Object){
                    this.stack.push(new Cell(JSON.parse(JSON.stringify(value))));
                } else {
                    this. fatal("Clone not supported for non-objects");
                }
            },
            Exit: function() {
                var value = this.stack.pop().value;
                if(!isNaN(parseInt(value))){
                    intValue = parseInt(value);
                    this.stack.push(new Cell(null));
                    this.stop(intValue);
                } else {
                    this.print(value);
                    this.stack.push(new Cell(null));
                    this.stop(0);
                }
            },
            Fatal: function(){
                var errorMessage = this.stack.pop().value;
                if(errorMessage instanceof String){
                    this.fatal(errorMessage);
                } else {
                    //TODO: if %1 is 0, include backtrace
                    //TODO: if %1 is 1, include backtrace without topmost frame.
                    this.fatal("(No String Error Mesage Provided): " + errorMessage);
                }
            }
        };
    }
);
