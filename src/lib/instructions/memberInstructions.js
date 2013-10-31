define([
        'vendor/underscore',
        'lib/instructions/subopcodes'
    ], function(_, subopcodes) {
        return {
            //TODO: implement missing functions
            
            
            
            IncDecM: function(op, vector){
                //retrieve base
                var base = null;
                switch(vector.locationDescriptor.type){
                    case 'C':
                        base = this.hhbc.BaseC();
                        break;
                    case 'R':
                        base = this.hhbc.BaseR();
                        break;
                    case 'L':
                        base = this.hhbc.BaseLWD(vector.LocationDescriptor.param);
                        break;
                    case 'NC':
                        base = this.hhbc.BaseNCWD();
                        break;
                    case 'NL':
                        base = this.hhbc.BaseNLWD(vector.LocationDescriptor.param);
                        break;
                    case 'GC':
                        base = this.hhbc.BaseGCWD();
                        break;
                    case 'GL':
                        base = this.hhbc.BaseGLWD(vector.LocationDescriptor.param);
                        break;
                    case 'SC':
                        base = this.hhbc.BaseSC();
                        break;
                    case 'SL':
                        base = this.hhbc.BaseSL(vector.LocationDescriptor.param);
                        break;
                    case 'H':
                        base = this.hhbc.BaseH();
                        break;
                }
                
                //Perform intermediate operations
                for(var i = 0; i < vector.members.length - 1; i++){
                    var member = members[i];
                    switch(member.type){
                        case 'EC':
                            this.hhbc.ElemCWD(base);
                            break;
                        case 'PC':
                            this.hhbc.PropCWD(base);
                            break;
                        case 'EL':
                            this.hhbc.ElemLWD(member.value, base);
                            break;
                        case 'PL':
                            this.hhbc.PropLWD(member.value, base);
                            break;
                        case 'W':
                            this.hhbc.NewElem(base);
                            break;
                    }
                }
                
                //Perform final operation
                var lastMember = vector.members[vector.members.length - 1];
                switch(lastMember.type){
                    case 'EC':
                        this.hhbc.IncDecElemC(op, base);
                        break;
                    case 'PC':
                        this.hhbc.IncDecPropC(op, base);
                        break;
                    case 'EL':
                        this.hhbc.IncDecElemL(op, lastMember.value, base);
                        break;
                    case 'PL':
                        this.hhbc.IncDecPropL(op, lastMember.value, base);
                        break;
                    case 'W':
                        this.hhbc.IncDecNewElem(op, base);
                        break;
                }
            }
        };
    }
);
