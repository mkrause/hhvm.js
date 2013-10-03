define([
        'vendor/underscore'
    ], function(_) {
        return {
            Null: function(vm) {
                vm.stack.push(vm.createNull());
            },
            True: function(vm) {
                vm.stack.push(vm.createTrue());
            },
            False: function(vm) {
                vm.stack.push(vm.createFalse());
            },
            NullUninit: function(vm) {
                vm.stack.push(vm.createUninit());
            },
            Int: function(vm) {
                vm.stack.push(vm.arg());
            },
            Double: function(vm) {
                vm.stack.push(vm.arg());
            },
            String: function(vm) {
                vm.stack.push(vm.litstr(vm.arg());
            },
            Array: function(vm) {
                vm.stack.push(vm.array(vm.arg()));
            },
        };
    }
);
