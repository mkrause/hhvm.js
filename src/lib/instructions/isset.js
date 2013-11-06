define([
        'vendor/underscore',
        'lib/cell',
        'lib/ref'
    ], function(_, Cell, Ref) {

        var issetHelper = function(vm, cell) {
            var isset = cell !== undefined && cell.value !== null;
            vm.stack.push(new Cell(isset));
        };

        var emptyHelper = function(vm, cell) {
            if(cell === undefined) {
                vm.hhbc.True();
            } else {
                vm.stack.push(new Cell(!cell.value));
            }
        };

        var isTypeHelper = function(vm, cell, name, x) {
            if(cell === undefined) {
                x = x || false;
                vm.warning("Undefined variable: " + name);
                vm.stack.push(new Cell(x));
                return false;
            }
            return true;
        };

        return {
            IssetL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                issetHelper(this, cell);
            },
            IssetN: function(id) {
                var name = this.stack.pop().value;
                var cell = this.currentFrame.localVars.getByName(name);
                issetHelper(this, cell);
            },
            EmptyL: function(id) {
                var x = this.globalVars.getById(id);
                emptyHelper(this, x);
            },
            IssetG: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                issetHelper(this, cell);
            },
            EmptyN: function() {
                var name = this.stack.pop().value;
                var x = this.currentFrame.localVars.getByName(name);
                emptyHelper(this, x);
            },
            EmptyG: function() {
                var name = this.stack.pop().value;
                var x = this.globalVars.getByName(name);
                emptyHelper(this, x);
            },
            IsNullC: function() {
                var value = this.stack.pop().value;
                this.stack.push(new Cell(value === null));
            },
            IsBoolC: function() {
                var value = this.stack.pop().value;
                this.stack.push(new Cell(_.isBoolean(value)));
            },
            IsIntC: function() {
                var value = this.stack.pop().value;
                this.stack.push(new Cell(_.isFinite(value) && Math.floor(value) == value));
            },
            IsDoubleC: function() {
                var value = this.stack.pop().value;
                this.stack.push(new Cell(_.isNumber(value)));
            },
            IsStringC: function() {
                var value = this.stack.pop().value;
                this.stack.push(new Cell(_.isString(value)));
            },
            IsArrayC: function() {
                var value = this.stack.pop().value;
                this.stack.push(new Cell(_.isArray(value)));
            },
            IsObjectC: function() {
                var value = this.stack.pop().value;
                this.stack.push(new Cell(_.isObject(value)));
            },
            IsNullL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                if (isTypeHelper(this, cell, name)) {
                    this.stack.push(cell);
                    this.hhbc.IsNullC();
                }
            },
            IsBoolL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                if (isTypeHelper(this, cell, name)) {
                    this.stack.push(cell);
                    this.hhbc.IsBoolC();
                }
            },
            IsIntL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                if (isTypeHelper(this, cell, name)) {
                    this.stack.push(cell);
                    this.hhbc.IsIntC();
                }
            },
            IsDoubleL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                if (isTypeHelper(this, cell, name)) {
                    this.stack.push(cell);
                    this.hhbc.IsDoubleC();
                }
            },
            IsStringL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                if (isTypeHelper(this, cell, name)) {
                    this.stack.push(cell);
                    this.hhbc.IsStringC();
                }
            },
            IsArrayL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                if (isTypeHelper(this, cell, name)) {
                    this.stack.push(cell);
                    this.hhbc.IsArrayC();
                }
            },
            IsObjectL: function(id) {
                var cell = this.currentFrame.localVars.getById(id);
                var name = this.currentFrame.localVars.getNameFromId(id);
                if (isTypeHelper(this, cell, name)) {
                    this.stack.push(cell);
                    this.hhbc.IsObjectC();
                }
            }
        };
    }
);
