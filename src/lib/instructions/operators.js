define([
    ], function() {
        return {
            Concat: function() {
                this.stack.push(this.stack.pop().toString() + this.stack.toString());
            },
            Abs: function() {
                this.stack.push(Math.abs(this.stack.pop()));
            },
            Add: function() {
                var T1 = this.stack.pop();
                var T2 = this.stack.pop();
                if(T1 instanceof Array && T2 instanceof Array){
                    var newArray = [];
                    newArray.concat(T1, T2);
                    this.stack.push(newArray);
                } else if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when executing Add");
                } else {
                    this.stack.push(T1 + T2);
                }
            },
            Sub: function() {
                var T1 = this.stack.pop();
                var T2 = this.stack.pop();
                if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when substracting in Sub");
                } else {
                    this.stack.push(T2 - T1);
                }
            },
            Mul: function() {
                var T1 = this.stack.pop();
                var T2 = this.stack.pop();
                if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when substracting in Mul");
                } else {
                    this.stack.push(T2 * T1);
                }
            },
            Div: function() {
                var T1 = this.stack.pop();
                var T2 = this.stack.pop();
                if(T1 instanceof Array || T2 instanceof Array){
                    this.fatal("error when substracting in Div");
                } else {
                    this.stack.push(T2 / T1);
                }
            },
            Mod: function() {
                var T1 = this.stack.pop();
                var T2 = this.stack.pop();
                if(!isNan(parseFloat(T1)) && isFinite(T1) && !isNaN(parseFloat(T2)) && isFinite(T2)){
                    this.stack.push(Math.floor(T2) % Math.floor(T1));
                } else {
                    this.stack.push(false);
                }
            },
            Sqrt: function() {
                var value = this.stack.pop();
                if(value < 0){
                    this.stack.push(NaN);
                } else if(value == undefined || value instanceof boolean || value instanceof int || value instanceof double || !isNaN(parseFloat(value))){
                    this.stack.push(Math.sqrt(value));
                } else {
                    this.warning("cannot take sqrt of a negative number in Sqrt");
                }
            },
            Xor: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(val2 && !val1 || !val2 && val1);
            },
            Not: function() {
                this.stack.push(!this.stack.pop());
            },
            Same: function() {
                this.stack.push(this.stack.pop() === this.stack.pop());
            },
            Nsame: function() {
                this.stack.push(this.stack.pop() !== this.stack.pop());
            },
            Eq: function() {
                this.stack.push(this.stack.pop() == this.stack.pop());
            },
            Neq: function() {
                this.stack.push(this.stack.pop() != this.stack.pop());
            },
            Lt: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(val2 < val1);
            },
            Lte: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(val2 <= val1);
            },
            Gt: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(val2 > val1);
            },
            Gte: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(val2 >= val1);
            },
            BitAnd: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                if(!(val1 instanceof String) && val1 instanceof Object || !(val2 instanceof String) && val2 instanceof Object){
                    this.fatal("BitAnd not supported for Objects");
                } else {
                    this.stack.push(val2 & val1);
                }
            },
            BitOr: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                if(!(val1 instanceof String) && val1 instanceof Object || !(val2 instanceof String) && val2 instanceof Object){
                    this.fatal("BitOr not supported for Objects");
                } else {
                    this.stack.push(val2 | val1);
                }
            },
            BitXor: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                if(!(val1 instanceof String) && val1 instanceof Object || !(val2 instanceof String) && val2 instanceof Object){
                    this.fatal("BitXor not supported for Objects");
                } else {
                    this.stack.push(val2 ^ val1);
                }
            },
            BitNot: function() {
                var value = this.stack.pop();
                if(!(value instanceof String) && !(value instanceof Array) && value instanceof Object){
                    this.fatal("BitNot not supported for Objects");
                } else {
                    this.stack.push(~value);
                }
            },
            Shl: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(val2 << val1);
            },
            Shr: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                this.stack.push(val2 >> val1);
            },
            Floor: function() {
                this.stack.push(Math.floor(this.stack.pop()));
            },
            Ceil: function(){
                this.stack.push(Math.ceil(this.stack.pop()));
            },
            CastBool: function() {
                var value = this.stack.pop();
                if(value instanceof String){
                    this.stack.push(value.toLowerCase() == "true" || value.toLowerCase() == "1");
                } else {
                    this.stack.push(value ? true : false);
                }
            },
            CastInt: function() {
                this.stack.push(parseInt(this.stack.pop()));
            },
            CastDouble: function() {
                this.stack.push(parseFloat(this.stack.pop()));
            },
            CastString: function() {
                var value = this.stack.pop();
                if(value != null){
                    this.stack.push(value.toString());
                } else {
                    this.fatal("Object does not implement toString. Needed for CastString.");
                }
            },
            CastArray: function() {
                this.stack.push(Array.prototype.slice.call(this.stack.pop()));
            },
            CastObject: function() {
                this.stack.push(Object(this.stack.pop()));
            },
            InstanceOf: function() {
                var val1 = this.stack.pop();
                var val2 = this.stack.pop();
                if(val1 instanceof String){
                    this.stack.push(typeof val2 == val1);
                } else if(val1 instanceof Object){
                    this.stack.push(typeof val1 == typeof val2);
                } else {
                    this.fatal("InstanceOf not supported for non-object");
                }
            },
            //TODO: implement instanceOfD if we know what it should do
            Print: function() {
                this.print(this.stack.pop());
                this.stack.push(1);
            },
            Clone: function() {
                var value = this.stack.pop();
                if(value instanceof Object){
                    this.stack.push(JSON.parse(JSON.stringify(value)));
                } else {
                    this. fatal("Clone not supported for non-objects");
                }
            },
            Exit: function() {
                var value = this.stack.pop();
                if(!isNaN(parseInt(value))){
                    intValue = parseInt(value);
                    this.stack.push(null);
                    this.stop(intValue);
                } else {
                    this.print(value);
                    this.stack.push(null);
                    this.stop(0);
                }
            },
            Fatal: function(){
                var errorMessage = this.stack.pop();
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
