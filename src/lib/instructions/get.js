define([
        'vendor/underscore',
    ], function(_) {
        return {
            CGetL: function(id) {
                var value = this.currentFrame.getLocalVarById(id);
                if(value === undefined) {
                    this.warning("Could not find variable " + id);
                    this.stack.push(new Cell(null));
                    return;
                }
                this.stack.push(value);
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
                var name = String(this.stack.pop().value);
                var value = this.currentFrame.getLocalVarByName(name);
                if(value === undefined) {
                    this.warning("Could not find variable " + name);
                    this.stack.push(new Cell(null));
                    return;
                }
                this.stack.push(value);
            },
            CGetG: function() {
                var name = String(this.stack.pop().value);
                var value = this.getGlobalVarByName(name);
                if(value === undefined) {
                    this.warning("Could not find global variable " + name);
                    this.stack.push(new Cell(null));
                    return;
                }
                this.stack.push(value);
            },
            CGetS: function() {
                //TODO: implement
            },
            VGetL: function(id) {
                var value = this.currentFrame.getLocalVarById(id);
                if(value === undefined) {
                    value = new Cell(null);
                    this.currentFrame.setLocalVarById(id, value);
                }

                // Box if necessary and push on stack
                this.stack.push((value instanceof Ref) ? value : new Ref(value));
            },
            VGetN: function() {
                var name = String(this.stack.pop().value);
                var value = this.currentFrame.getLocalVarByName(name);
                if(value === undefined) {
                    value = new Cell(null);
                    this.currentFrame.setLocalVarByName(name, value);
                }

                // Box if necessary and push on stack
                this.stack.push((value instanceof Ref) ? value : new Ref(value));
            },
            VGetG: function() {
                var name = String(this.stack.pop().value);
                var value = this.getGlobalVarByName(name);
                if(value === undefined) {
                    value = new Cell(null);
                    this.setGlobalVarByName(name, value);
                }

                // Box if necessary and push on stack
                this.stack.push((value instanceof Ref) ? value : new Ref(value));
            },
            VGetS: function() {
                //TODO: implement
            },
            AGetC: function() {
                //TODO: implement
            },
            AGetL: function(id) {
                //TODO: implement
            }
        };
    }
);
