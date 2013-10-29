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
            IncDecL: function(localVarId, op){
                var value = this.currentFrame.localVars.getById(localVarId);
                if(value == undefined){
                    value = null;
                    this.currentFrame.localVars.setById(localVarId, value);
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
