define([
        'vendor/underscore'
    ], function(_) {
        return {
            Null: function() {
                this.stack.push(null);
            },
            True: function() {
                this.stack.push(true);
            },
            False: function() {
                this.stack.push(false);
            },
            NullUninit: function() {
                this.stack.push(undefined);
            },
            Int: function() {
                this.stack.push(this.arg('int'));
            },
            Double: function() {
                this.stack.push(this.arg('double'));
            },
            String: function() {
                this.stack.push(this.arg('litstr'));
            },
            Array: function() {
                this.stack.push(this.arg('array'));
            },
            NewArray: function() {
                this.stack.push([]);
            },
            NewPackedArray: function(numElems) {
                var newArray = [];
                for (var i = 0; i < numElems; i++){
                    newArray.push(this.stack.pop());
                }
                this.stack.push(newArray);
            },
            AddElemC: function() {
            	var element = this.stack.pop();
            	var position = this.stack.pop();
                var three = this.stack.pop();
                if (three instanceof Array){
                    three[position] = element;
                    this.stack.push(three);
                } else {
                    this.fatal("Stack error when executing AddElemC");
                }
            },
            AddElemV: function() {
            	var element = this.ref(this.stack.pop);
            	var position = this.stack.pop();
                var three = this.stack.pop();
                if (three instanceof Array){
                    three[position] = element;
                    this.stack.push(three);
                } else {
                    this.fatal("Stack error when executing AddElemV");
                }
            },
            AddNewElemC: function() {
            	var value = this.stack.pop();
            	var array = this.stack.pop();
            	if(array instanceof Array){
            		array.push(value);
            		this.stack.push(array);
            	} else {
            		this.fatal("Stack error when executing AddNewElemC");
            	}
            },
            AddNewElemV: function() {
            	var value = this.ref(this.stack.pop());
            	var array = this.stack.pop();
            	if(array instanceof Array){
            		array.push(value);
            		this.stack.push(array);
            	} else {
            		this.fatal("stack error when executing AddNewElemV");
            	}
            },
            //TODO: implement newCol, ColAddElemC, ColAddNewElemC when we have output from hhvm that shows what this is about.
            Cns: function() {
            	var ref = this.stack.pop();
            	var constant = this.constant(ref);
            	if(constant == undefined){
            		this.notice("NOTICE: constant not found by Cns.");
            		this.stack.push(ref);
            	} else {
            		this.stack.push(this.newCell(constant));
            	}
            },
            CnsE: function() {
            	var ref = this.stack.pop();
            	var constant = this.constant(ref);
            	if(constant == undefined){
            		this.fatal("constant not found by CnsE.");
            	} else {
            		this.stack.push(this.newCell(constant));
            	}
            },
            CnsU: function() {
            	var ref = this.stack.pop();
            	var constant = this.constant(ref);
            	if(constant == undefined){
            		this.hhbc.Cns();
            	} else {
            		this.stack.push(this.newCell(constant));
            	}
            },
            ClsCns: function() {
            	var ref = this.stack.pop();
            	var clsConstant = this.classConstant(ref);
            	if(clsConstant == undefined){
            		this.fatal("class constant not found by ClsCns.");
            	} else {
            		this.stack.push(clsConstant);
            	}
            },
            ClsCnsD: function() {
            	var clsConstantRef = this.stack.pop();
            	var classRef = this.stack.pop();
            	var newClass = this.getClass(classRef);
            	if(newClass == undefined){
            		newClass = this.loadClass(classRef);
            	}
            	if(newClass == undefined){
            		this.fatal("class could not be loaded by ClsCnsD");
            	} else {
            		var clsConstant = this.classConstant(clsConstantRef);
            		if(clsConstant == undefined){
            			this.fatal("class constant could not be loaded by ClsCnsD");
            		} else {
            			this.stack.push(clsConstant);
            		}
            	}
            },
            //TODO: implement File and Dir when we know what they should do.
        };
    }
);
