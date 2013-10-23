define([
        'vendor/underscore',
    ], function(_) {
        return {
            SetL: function(id) {
                var value = this.stack.pop();
                this.currentFrame.localVars.setById(id, value);
                this.stack.push(value);
            },
            SetN: function() {
                var name = String(this.stack.pop().value);
                var value = this.stack.pop();
                this.currentFrame.localVars.setByName(name, value);
                this.stack.push(value);
            },
            SetG: function() {
                var name = String(this.stack.pop().value);
                var value = this.stack.pop();
                this.globalVars.setByName(name, value);
                this.stack.push(value);
            },
            SetS: function() {
                // TODO: implement
            },
            //TODO: implement missing functions
            UnsetL: function(id) {
                this.currentFrame.localVars.unsetById(id);
            },
            UnsetN: function(id) {
                var name = String(this.stack.pop().value);
                this.currentFrame.localVars.unsetByName(name);
            },
            UnsetG: function(id) {
                var name = String(this.stack.pop().value);
                this.globalVars.unsetByName(name);
            }
        };
    }
);
