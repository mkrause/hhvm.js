define([
        'vendor/underscore'
    ], function(_) {
        return {
            Nop: function() {},
            PopC: function(vm) {
                vm.stack.pop();
            },
            PopV: function(vm) {
                vm.stack.pop();
            },
            PopR: function(vm) {
                vm.stack.pop();
            },
            Dup: function(vm) {
                vm.stack.push(vm.stack.peek());
            },
            Box: function(vm) {
                var top = vm.stack.pop();
                vm.stack.push(vm.ref(top));
            },
            Unbox: function(vm) {
                var top = vm.stack.pop();
                vm.stack.push(top.value());
            },
            BoxR: function(vm) {
                if (vm.stack.peek().type != 'ref') {
                    vm.hhbc.Box(vm);
                }
            },
            UnboxR: function(vm) {
                if (vm.stack.peek().type != 'cell') {
                    vm.hhbc.Unbox(vm);
                }
            }
        };
    }
);
