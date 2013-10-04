require.config({
    baseUrl: '../src/'
});

var checkVMState(vm, pc, stackSize, output){
    ok(!vm.running);
    ok(vm.pc == pc);
    ok(vm.stack.length == stackSize);
    ok(vm.output == output);
}

define([
        'hhvm'
    ], function(hhvm) {
        function program(instr, size) {
            var size = size || 256;
            var ab = new ArrayBuffer(size);
            var arr = new Uint8Array(ab);
            
            instr.forEach(function(index, byte) {
                arr[index] = byte;
            });
            
            return arr;
        }
        
        test("Nop", function() {
            var vm = new hhvm();
            var prog = [opcodes.NOP];
            vm.run(prog);
            checkVMState(vm, prog.length, 0, "");
        });
        //TODO: implement tests first by examples from github:
        //https://github.com/facebook/hiphop-php/blob/master/hphp/doc/bytecode.specification#L3936
    }
);
