define([
        'vendor/underscore',
    ], function(_) {
        return {
            //TODO: implement missing functions
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
            SetOpL: function(id, op) {
                var x = this.currentFrame.localVars.getById(id);
                //use impelemted instructions
                //TODO: test if this works for all instructions
                var value1 = this.stack.pop();
                this.stack.push(x);
                this.stack.push(value1);
                this.hhbc[op]();
                this.currentFrame.localVars.setById(id, this.stack.peek());
            },
            IncDecL: function(localVarId, op){
                var value = this.currentFrame.localVars.getById(localVarId);
                if(value == undefined){
                    value = null;
                    this.currentFrame.localVars.setById(localVarId, value);
                    this.warning("Local variable with id " + localVarId + " was not set yet. Now set to null.");
                }
                switch(op){
                    case "PreInc":
                        value++;
                        this.currentFrame.localVars.setById(localVarId, value);
                        this.stack.push(new Cell(value));
                        break;
                    case "PostInc":
                        this.stack.push(new Cell(value));
                        value++;
                        this.currentFrame.localVars.setById(localVarId, value);
                        break;
                    case "PreDec":
                        if(value != null){
                            value--;
                        }
                        this.currentFrame.localVars.setById(localVarId, value);
                        this.stack.push(new Cell(value));
                        break;
                    case "PostDec":
                        this.stack.push(new Cell(value));
                        if(value != null){
                            value--;
                        }
                        this.currentFrame.localVars.setById(localVarId, value);
                }
            },
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
