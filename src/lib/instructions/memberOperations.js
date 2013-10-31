define([
        'vendor/underscore',
        'lib/base',
    ], function(_, Base) {
        return {
            BaseLWD: function(localVarId){
                var local = this.currentFrame.localVars.getById(localVarId);
                if(local === undefined){
                    this.warning("Local var with id " + localVarId + " not set. Setting it to null.");
                    this.currentFrame.localVars.setById(localVarId, null);
                    local = null;
                }
                return new Base(local);
            },
            IncDecElemC: function(op, base){
                var mnemonic = subopcodes.IncDec.getMnemonic(op);
                
                if(_.isArray(base.value)){
                    var offset = this.stack.pop().valueOf();
                    if(base.value[offset] === undefined){
                        this.warning("Value not set at " + offset + " in base. Setting it to null.");
                        base.value[offset] = null;
                    }
                    var x = base.value[offset];
                    var y = x;
                    //Inc/Dec
                    if(mnemonic == "PreInc" || mnemonic == "PostInc"){
                        y++;
                    } else if(mnemonic == "PreDec" || mnemonic == "PostDec"){
                        y--;
                    }
                    
                    //Assign
                    base.value[offset] = y;
                    
                    //Push on stack
                    if(mnemonic == "PreInc" || mnemonic == "PreDec"){
                        this.stack.push(new Cell(y));
                    } else if(mnemonic == "PostDec" || mnemonic == "PostInc"){
                        this.stack.push(new Cell(x));
                    }
                } else if(base.value === null || base.value === false || base.value == ""){
                    base.value = [];
                }
                
                if(base.value === true || _.isNumber(base.value)){
                    this.warning("Member of true or number cannot be incremented. Pushing null on the stack");
                    this.stack.push(new Cell(null));
                } else if(!_.isArray(base.value)){
                    throw new Error("Incrementing of members of objects is not yet supported");
                }
            }
            //TODO: implement missing functions
        };
    }
);
