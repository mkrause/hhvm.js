define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref',
        'lib/classref'
    ], function(_, Cell, Ref, ClassRef) {

        var cGetHelper = function(vm, cell, name) {
            if(cell === undefined) {
                vm.warning("Undefined variable: " + name);
                cell = new Cell(null);
            }
            vm.stack.push(cell);
        };
        var vGetHelper = function(vm, cell, name, store) {
            if(cell === undefined) {
                cell = new Cell(null);
                store.setByName(name, cell);
            }

            // Box if necessary and push on stack
            vm.stack.push((cell instanceof Ref) ? cell : new Ref(cell));
        };
        var sHelper = function(classDef, name) {
            var prop = classDef.staticProperties.getByName(name);
            if (prop === undefined) {
                throw new Error("No accessible static property named " + name + " in class " + classDef.name);
            }
            return prop;
        };
        var aGetHelper = function(vm, value) {
            var className;
            if(_.isString(value)) {
                className = value;
            } else if(_.isObject(value)) {
                className = value.getClassName();
            } else {
                throw new Error("Operation not supported on types other than strings and objects");
            }

            var classDef = vm.prog.getClassByName(className);
            if(classDef === undefined) {
                //TODO: make sure autoload is invoked when class is not defined yet.
                classDef = vm.prog.getClassByName(className);
            }

            if(classDef === undefined) {
                throw new Error("No class named " + className);
            }
            vm.stack.push(new ClassRef(classDef));
        };

        return {
            CGetL: function(id) {
                var value = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                cGetHelper(this, value, name);
            },
            CGetL2: function(id) {
                var top = this.stack.pop();
                this.hhbc.CGetL(id);
                this.stack.push(top);
            },
            CGetL3: function(id) {
                var top = this.stack.pop();
                var subtop = this.stack.pop();
                this.hhbc.CGetL(id);
                this.stack.push(subtop);
                this.stack.push(top);
            },
            CGetN: function() {
                var name = this.stack.pop().toString();
                var value = this.currentFrame.localVars.getByName(name);
                cGetHelper(this, value, name);
            },
            CGetG: function() {
                var name = this.stack.pop().toString();
                var value = this.globalVars.getByName(name);
                cGetHelper(this, value, name);
            },
            CGetS: function() {
                var classDef = this.stack.pop().classDef;
                var name = this.stack.pop().toString();
                var prop = sHelper(classDef, name);
                this.stack.push(new Cell(prop.value));
            },
            VGetL: function(id) {
                var value = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                vGetHelper(this, value, name, this.currentFrame.localVars);
            },
            VGetN: function() {
                var name = this.stack.pop().toString();
                var value = this.currentFrame.localVars.getByName(name);
                vGetHelper(this, value, name, this.currentFrame.localVars);
            },
            VGetG: function() {
                var name = this.stack.pop().toString();
                var value = this.globalVars.getByName(name);
                vGetHelper(this, value, name, this.globalVars);
            },
            VGetS: function() {
                var classDef = this.stack.pop().classDef;
                var name = this.stack.pop().toString();
                var prop = sHelper(classDef, name);
                this.stack.push(new Ref(prop));
            },
            AGetC: function() {
                var value = this.stack.pop().toString();
                aGetHelper(this, value);
            },
            AGetL: function(id) {
                var value = this.currentFrame.localVars.getById(id).value;
                aGetHelper(this, value);
            }
        };
    }
);
