define([
        'lib/cell',
        'lib/ref'
    ], function(Cell, Ref) {
        return {
            Null: function() {
                this.stack.push(new Cell(null));
            },
            True: function() {
                this.stack.push(new Cell(true));
            },
            False: function() {
                this.stack.push(new Cell(false));
            },
            NullUninit: function() {
                this.stack.push(new Cell(undefined));
            },
            Int: function(intValue) {
                this.stack.push(new Cell(intValue));
            },
            Double: function(dbl) {
                this.stack.push(new Cell(dbl));
            },
            String: function(str) {
                this.stack.push(new Cell(str));
            },
            Array: function(arr) {
                this.stack.push(new Cell(arr));
            },
            NewArray: function() {
                this.stack.push(new Cell([]));
            },
            NewPackedArray: function(numElems) {
                var newArray = [];
                for (var i = 0; i < numElems; i++){
                    newArray.push(this.stack.pop());
                }
                this.stack.push(new Cell(newArray));
            },
            AddElemC: function() {
                var element = this.stack.pop();
                var position = this.stack.pop();
                var three = this.stack.pop();
                if (three.value instanceof Array){
                    three.value[position] = element;
                    this.stack.push(three);
                } else {
                    this.fatal("Stack error when executing AddElemC");
                }
            },
            AddElemV: function() {
                var element = new Ref(this.stack.pop());
                var position = this.stack.pop();
                var three = this.stack.pop();
                if (three.value instanceof Array){
                    three.value[position] = element;
                    this.stack.push(three);
                } else {
                    this.fatal("Stack error when executing AddElemV");
                }
            },
            AddNewElemC: function() {
                var value = this.stack.pop();
                var arrayCell = this.stack.pop();
                if(arrayCell.value instanceof Array){
                    arrayCell.value.push(value);
                    this.stack.push(arrayCell);
                } else {
                    this.fatal("Stack error when executing AddNewElemC");
                }
            },
            AddNewElemV: function() {
                var value = new Ref(this.stack.pop());
                var arrayCell = this.stack.pop();
                if(arrayCell.value instanceof Array){
                    arrayCell.push(value);
                    this.stack.push(arrayCell);
                } else {
                    this.fatal("stack error when executing AddNewElemV");
                }
            },
            //TODO: implement newCol, ColAddElemC, ColAddNewElemC when we have output from hhvm that shows what this is about.
            Cns: function(litstrId) {
                var constant = this.constant(litstrId);
                if(constant == undefined){
                    this.notice("NOTICE: constant not found by Cns.");
                    this.stack.push(new Cell(litstrId));
                } else {
                    this.stack.push(new Cell(constant));
                }
            },
            CnsE: function(litstrId) {
                var constant = this.constant(litstrId);
                if(constant == undefined){
                    this.fatal("constant not found by CnsE.");
                } else {
                    this.stack.push(new Cell(constant));
                }
            },
            CnsU: function(litstrId, litstrFallback) {
                var constant = this.constant(litstrId);
                if(constant == undefined){
                    this.hhbc.Cns(litstrFallback);
                } else {
                    this.stack.push(new Cell(constant));
                }
            },
            ClsCns: function(litstrId) {
                var clsClass = this.stack.pop().value;
                var clsConstant = this.classConstant(litstrId, clsClass);
                if(clsConstant == undefined){
                    this.fatal("class constant not found by ClsCns.");
                } else {
                    this.stack.push(new Cell(clsConstant));
                }
            },
            ClsCnsD: function(litstrId, classId) {
                var newClass = this.getClass(classId);
                //TODO: make sure autoload is invoked when class is not defined yet.
                if(newClass == undefined){
                    this.fatal("class could not be loaded by ClsCnsD");
                } else {
                    var clsConstant = this.classConstant(litstrId, newClass);
                    if(clsConstant == undefined){
                        this.fatal("class constant could not be loaded by ClsCnsD");
                    } else {
                        this.stack.push(new Cell(clsConstant));
                    }
                }
            },
            File: function(){
                this.stack.push(new Cell("__FILE__"));
            },
            Dir: function(){
                this.stack.push(new Cell("__DIR__"));
            }
        };
    }
);
