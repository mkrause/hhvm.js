define([
        'vendor/underscore',
        'lib/cell'
    ], function(_, Cell) {
        var memberHelper = function(vector, baseOperations, intermediateOperations, finalOperations) {
            // Get base
            var base = baseOperations[vector.locationDescriptor.type](vector.locationDescriptor.value);

            // Perform intermediate operations
            for(var i = 0; i < vector.members.length - 1; i++) {
                intermediateOperations[members[i].type](base, members[i].value);
            }

            // Perform final operation
            var lastMember = vector.members[vector.members.length - 1];
            finalOperations[lastMember.type](base, lastMember.value);
        };

        var pushInt = function(vm, value) {
            vm.stack.push(new Cell(value));
        };

        var pushString = function(vm, id) {
            var str = vm.prog.getLiteralString(id);
            vm.stack.push(new Cell(str));
        };

        return {
            //TODO: implement missing functions
            CGetM: function (vector) {
                var vm = this;

                var baseOperations = {
                    C:  function(param) { return vm.hhbc.operations.BaseC(); },
                    R:  function(param) { return vm.hhbc.operations.BaseR(); },
                    L:  function(param) { return vm.hhbc.operations.BaseLW(param); },
                    NC: function(param) { return vm.hhbc.operations.BaseNCW(); },
                    NL: function(param) { return vm.hhbc.operations.BaseNLW(param); },
                    GC: function(param) { return vm.hhbc.operations.BaseGCW(); },
                    GL: function(param) { return vm.hhbc.operations.BaseGLW(param); },
                    SC: function(param) { return vm.hhbc.operations.BaseSC(); },
                    SL: function(param) { return vm.hhbc.operations.BaseSL(param); },
                    H:  function(param) { return vm.hhbc.operations.BaseH(); }
                };

                var intermediateOperations = {
                    EC: function(base, param) { vm.hhbc.operations.ElemCW(base); },
                    PC: function(base, param) { vm.hhbc.operations.PropCW(base); },
                    EL: function(base, param) { vm.hhbc.operations.ElemLW(base, param); },
                    PL: function(base, param) { vm.hhbc.operations.PropLW(base, param); },
                    EI: function(base, param) { pushInt(vm, param); vm.hhbc.operations.ElemCW(base); },
                    ET: function(base, param) { pushString(vm, param); vm.hhbc.operations.ElemCW(base); },
                    PT: function(base, param) { pushString(vm, param); vm.hhbc.operations.PropCW(base); }
                };

                var finalOperations = {
                    EC: function(base, param) { vm.hhbc.operations.CGetElemC(base); },
                    PC: function(base, param) { vm.hhbc.operations.CGetPropC(base); },
                    EL: function(base, param) { vm.hhbc.operations.CGetElemL(base, param); },
                    PL: function(base, param) { vm.hhbc.operations.CGetPropL(base, param); },
                    EI: function(base, param) { pushInt(vm, param); vm.hhbc.operations.CGetElemC(base); },
                    ET: function(base, param) { pushString(vm, param); vm.hhbc.operations.CGetElemC(base); },
                    PT: function(base, param) { pushString(vm, param); vm.hhbc.operations.CGetElemC(base); }
                };

                memberHelper(vector, baseOperations, intermediateOperations, finalOperations);
            },
            IncDecM: function(op, vector) {
                var vm = this;

                var baseOperations = {
                    C:  function(param) { return vm.hhbc.operations.BaseC(); },
                    R:  function(param) { return vm.hhbc.operations.BaseR(); },
                    L:  function(param) { return vm.hhbc.operations.BaseLWD(param); },
                    NC: function(param) { return vm.hhbc.operations.BaseNCWD(); },
                    NL: function(param) { return vm.hhbc.operations.BaseNLWD(param); },
                    GC: function(param) { return vm.hhbc.operations.BaseGCWD(); },
                    GL: function(param) { return vm.hhbc.operations.BaseGLWD(param); },
                    SC: function(param) { return vm.hhbc.operations.BaseSC(); },
                    SL: function(param) { return vm.hhbc.operations.BaseSL(param); },
                    H:  function(param) { return vm.hhbc.operations.BaseH(); }
                };

                var intermediateOperations = {
                    EC: function(base, param) { vm.hhbc.operations.ElemCWD(base); },
                    PC: function(base, param) { vm.hhbc.operations.PropCWD(base); },
                    EL: function(base, param) { vm.hhbc.operations.ElemLWD(base, param); },
                    PL: function(base, param) { vm.hhbc.operations.PropLWD(base, param); },
                    EI: function(base, param) { pushInt(vm, param); vm.hhbc.operations.ElemCWD(base); },
                    ET: function(base, param) { pushString(vm, param); vm.hhbc.operations.ElemCWD(base); },
                    PT: function(base, param) { pushString(vm, param); vm.hhbc.operations.PropCWD(base); },
                    W:  function(base, param) { vm.hhbc.operations.NewElem(base); }
                };

                var finalOperations = {
                    EC: function(base, param) { vm.hhbc.operations.IncDecElemC(base, op); },
                    PC: function(base, param) { vm.hhbc.operations.IncDecPropC(base, op); },
                    EL: function(base, param) { vm.hhbc.operations.IncDecElemL(base, op, param); },
                    PL: function(base, param) { vm.hhbc.operations.IncDecPropL(base, op, param); },
                    EI: function(base, param) { pushInt(vm, param); vm.hhbc.operations.IncDecElemC(base, op); },
                    ET: function(base, param) { pushString(vm, param); vm.hhbc.operations.IncDecElemC(base, op); },
                    PT: function(base, param) { pushString(vm, param); vm.hhbc.operations.IncDecPropC(base, op); },
                    W:  function(base, param) { vm.hhbc.operations.IncDecNewElem(base, op); }
                };

                memberHelper(vector, baseOperations, intermediateOperations, finalOperations);
            }
        };
    }
);
