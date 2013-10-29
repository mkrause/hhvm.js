define([
        'lib/cell',
        'lib/ref',
        'lib/collection'
    ], function(Cell, Ref, Collection) {

        var addElemHelper = function(vm, cell, array, position) {
            if (_.isArray(array)) {
                if (position === undefined) {
                    array.push(cell);
                } else {
                    array[position] = cell;
                }
                vm.stack.push(new Cell(array));
            } else {
                throw new Error("Not an instance of an array");
            }
        };

        var colAddElemHelper = function(vm, cell, collection, position) {
            if (collection instanceof Collection) {
                if (position === undefined) {
                    collection.add(cell);
                } else {
                    collection.set(position, cell);
                }
                this.stack.push(new Cell(collection));
            } else {
                throw new Error("Not an instance of a collection");
            }
        };

        var cnsHelper = function(vm, constant, name, errorLevel) {
            if(constant === undefined) {
                var message = "Undefined constant: " + name;
                if (errorLevel === "notice") {
                    vm.notify(message);
                } else if (errorLevel === "error") {
                    throw new Error(message);
                } else {
                    return false;
                }
                constant = name;
            }
            vm.stack.push(new Cell(constant));
            return true;
        };

        var clsCnsHelper = function(vm, classDef, name) {
            var constant = classDef.getConstantByName(name);
            if(constant === undefined){
                throw new Error("No constant named '" + name +"' in class '" + classDef.name + "'");
            }
            this.stack.push(new Cell(constant));
        };

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
                addElemHelper(this, value, array, position);
            },
            AddElemV: function() {
                var value = new Ref(this.stack.pop());
                var position = this.stack.pop().value;
                var array = this.stack.pop().value;
                addElemHelper(this, value, array, position);
            },
            AddNewElemC: function() {
                var value = this.stack.pop();
                var array = this.stack.pop().value;
                addElemHelper(this, value, array);
            },
            AddNewElemV: function() {
                var value = new Ref(this.stack.pop());
                var array = this.stack.pop().value;
                addElemHelper(this, value, array);
            },
            NewCol: function(colType, numElems) {
                var col = new Collection(colType, numElems);
                this.stack.push(new Cell(col));
            },
            ColAddElemC: function() {
                var value = this.stack.pop();
                var position = this.stack.pop().value;
                var collection = this.stack.pop().value;
                colAddElemHelper(this, value, collection, position);
            },
            ColAddNewElemC: function() {
                var value = this.stack.pop();
                var collection = this.stack.pop().value;
                colAddElemHelper(this, value, collection);
            },
            Cns: function(name) {
                var value = this.prog.getConstantByName(name);
                cnsHelper(this, value, name, "notice");
            },
            CnsE: function(name) {
                var value = this.prog.getConstantByName(name);
                cnsHelper(this, value, name, "error");
            },
            CnsU: function(name, strFallback) {
                var value = this.prog.getConstantByName(name);
                if (!cnsHelper(this, value, name)) {
                    this.hhbc.Cns(strFallback);
                }
            },
            ClsCns: function(name) {
                var classRef = this.stack.pop();
                var classDef = classRef.value;
                clsCnsHelper(this, classDef, name);
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

                clsCnsHelper(this, classDef, name);
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
