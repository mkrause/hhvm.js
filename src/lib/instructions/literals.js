define([
        'lib/cell',
        'lib/ref',
        'lib/collection'
    ], function(Cell, Ref, Collection) {
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
                var array = [];
                _(numElems).times(function(n) {
                    array.push(this.stack.pop());
                }, this);
                this.stack.push(new Cell(array));
            },
            AddElemC: function() {
                var value = this.stack.pop();
                var position = this.stack.pop().value;
                var array = this.stack.pop().value;
                if (_.isArray(array)) {
                    array[position] = value;
                    this.stack.push(new Cell(array));
                } else {
                    throw new Error("Stack error when executing AddElemC");
                }
            },
            AddElemV: function() {
                var value = new Ref(this.stack.pop());
                var position = this.stack.pop().value;
                var array = this.stack.pop().value;
                if (_.isArray(array)) {
                    array[position] = value;
                    this.stack.push(new Cell(array));
                } else {
                    throw new Error("Stack error when executing AddElemV");
                }
            },
            AddNewElemC: function() {
                var value = this.stack.pop();
                var array = this.stack.pop().value;
                if(_.isArray(array)) {
                    array.push(value);
                    this.stack.push(new Cell(array));
                } else {
                    throw new Error("Stack error when executing AddNewElemC");
                }
            },
            AddNewElemV: function() {
                var value = new Ref(this.stack.pop());
                var array = this.stack.pop().value;
                if(_.isArray(array)) {
                    array.push(value);
                    this.stack.push(new Cell(array));
                } else {
                    throw new Error("Stack error when executing AddNewElemV");
                }
            },
            NewCol: function(colType, numElems) {
                var col = new Collection(colType, numElems);
                this.stack.push(new Cell(col));
            },
            ColAddElemC: function() {
                var value = this.stack.pop();
                var position = this.stack.pop().value;
                var collection = this.stack.pop().value;
                if (collection instanceof Collection) {
                    collection.set(position, value);
                    this.stack.push(new Cell(collection));
                } else {
                    throw new Error("Stack error when executing AddElemC");
                }
            },
            ColAddNewElemC: function() {
                var value = this.stack.pop();
                var collection = this.stack.pop().value;
                if(collection instanceof Collection) {
                    collection.add(value);
                    this.stack.push(new Cell(collection));
                } else {
                    throw new Error("Stack error when executing AddNewElemC");
                }
            },
            Cns: function(name) {
                var value = this.prog.getConstantByName(name);
                if(value === undefined) {
                    this.notify("No constant named '" + name +"'");
                    value = name;
                }
                this.stack.push(new Cell(value));
            },
            CnsE: function(name) {
                var value = this.prog.getConstantByName(name);
                if(value === undefined) {
                    throw new Error("No constant named '" + name +"'");
                }
                this.stack.push(new Cell(value));
            },
            CnsU: function(name, strFallback) {
                var value = this.prog.getConstantByName(name);
                if(value === undefined){
                    this.hhbc.Cns(strFallback);
                    return;
                }
                this.stack.push(new Cell(value));
            },
            ClsCns: function(name) {
                var classRef = this.stack.pop();
                var classDef = classRef.value;
                var value = classDef.getConstantByName(name);
                if(value === undefined){
                    throw new Error("No constant named '" + name +"' in class '" + classDef.name + "'");
                }
                this.stack.push(new Cell(value));
            },
            ClsCnsD: function(name, className) {
                var classDef = this.prog.getClassByName(className);
                if(classDef === undefined) {
                    //TODO: make sure autoload is invoked when class is not defined yet.
                }

                classDef = this.prog.getClassByName(className);
                if(classDef === undefined){
                    throw new Error("No class named '" + className + "'");
                }

                var value = classDef.getConstantByName(name);
                if(value === undefined){
                    throw new Error("No constant named '" + name +"' in class '" + classDef.name + "'");
                }
                this.stack.push(new Cell(value));
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
