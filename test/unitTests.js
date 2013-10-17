require.config({
    baseUrl: '../src/',
    shim: {
        'vendor/underscore': { exports: '_' }
    }
});

var checkVMState = function(vm, stackSize, output){
    ok(!vm.running);
    equal(vm.stack.length(), stackSize);
    equal(vm.output, output);
};

define([
        'lib/instruction_set',
        'hhvm',
        'lib/ref'
    ], function(InstructionSet, hhvm, Ref) {
    //Basic instructions
        test("Nop", function() {
            var vm = new hhvm();
            vm.dispatcher.initialize();
            var hhbc = new InstructionSet(vm);
            
            hhbc.Nop();
            checkVMState(vm, 0, "");
        });
        test("PopC", function() {
            var vm = new hhvm();
            vm.dispatcher.initialize();
            var hhbc = new InstructionSet(vm);
            
            hhbc.Null();
            checkVMState(vm, 1, "");
            equal(vm.stack.pop().value, null);
            
            hhbc.PopC();
            checkVMState(vm, 0, "");
        });
        test("Dup", function(){
            var vm = new hhvm();
            vm.dispatcher.initialize();
            var hhbc = new InstructionSet(vm);
            
            hhbc.Int(42);
            checkVMState(vm, 1, "");
            equal(vm.stack.peek().value, 42);
            
            hhbc.Dup();
            checkVMState(vm, 2, "");
            equal(vm.stack.pop().value, 42);
            equal(vm.stack.pop().value, 42);
            equal(vm.stack.length(), 0);
        });
        test("Box", function(){
            var vm = new hhvm();
            vm.dispatcher.initialize();
            var hhbc = new InstructionSet(vm);
            
            hhbc.True();
            checkVMState(vm, 1, "");
            var original = vm.stack.peek();
            ok(original.value);
            
            hhbc.Box();
            checkVMState(vm, 1, "");
            var newRef = vm.stack.pop();
            ok(newRef instanceof Ref);
            equal(newRef.cell.value, original.value);
            notEqual(newRef.cell, original);
        });
        test("Unbox", function(){
            var vm = new hhvm();
            vm.dispatcher.initialize();
            var hhbc = new InstructionSet(vm);
            
            hhbc.String("Hello World!");
            hhbc.Box();
            checkVMState(vm, 1, "");
            var textRef = vm.stack.peek();
            equal(textRef.cell.value, "Hello World!");
            
            hhbc.Unbox();
            checkVMState(vm, 1, "");
            var newCell = vm.stack.peek();
            equal(newCell.value, textRef.cell.value);
            notEqual(newCell, textRef.cell);
        });
        test("BoxR", function(){
            var vm = new hhvm();
            vm.dispatcher.initialize();
            var hhbc = new InstructionSet(vm);
            
            hhbc.False();
            checkVMState(vm, 1, "");
            var originalCell = vm.stack.peek();
            ok(!originalCell.value);
            
            hhbc.BoxR();
            checkVMState(vm, 1, "");
            var newRef = vm.stack.peek();
            ok(newRef instanceof Ref);
            equal(newRef.cell.value, originalCell.value);
            notEqual(newRef.cell, originalCell);
            
            hhbc.BoxR();
            checkVMState(vm, 1, "");
            equal(vm.stack.pop(), newRef);
        });
        test("UnboxR", function(){
            var vm = new hhvm();
            vm.dispatcher.initialize();
            var hhbc = new InstructionSet(vm);
            
            hhbc.NullUninit();
            checkVMState(vm, 1, "");
            var originalCell = vm.stack.peek();
            equal(originalCell.value, undefined);
            
            hhbc.Box();
            hhbc.UnboxR();
            checkVMState(vm, 1, "");
            var newCell = vm.stack.peek();
            equal(newCell.value, originalCell.value);
            notEqual(newCell, originalCell);
            
            hhbc.UnboxR();
            checkVMState(vm, 1, "");
            equal(vm.stack.pop(), newCell);
        });
    //Literal instructions: are tested by other functions
    }
);
