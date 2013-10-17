define([
        'vendor/underscore',
    ], function(_) {
        return {
            //XXX: local variables are stored as cells
            SetL: function(id) {
                var value = this.stack.pop();
                this.currentFrame.setLocalVarById(id, value);
                this.stack.push(value);
            },
            SetN: function() {
                var name = String(this.stack.pop().value);
                var value = this.stack.pop();
                this.currentFrame.setLocalVarByName(name, value);
                this.stack.push(value);
            },
            SetG: function() {
                var name = String(this.stack.pop().value);
                var value = this.stack.pop();
                this.setGlobalVarByName(name, value);
                this.stack.push(value);
            },
            SetS: function() {
                // TODO: implement
            },
            //TODO: implement missing functions
            UnsetL: function(id) {
                this.currentFrame.unsetLocalVarById(id);
            },
            UnsetN: function(id) {
                var name = String(this.stack.pop().value);
                this.currentFrame.unsetLocalVarByName(name);
            },
            UnsetG: function(id) {
                var name = String(this.stack.pop().value);
                this.unsetGlobalVarByName(name);
            }
        };
    }
);
