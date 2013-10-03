require.config({
    baseUrl: '../src/'
});

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
        
        //TODO: update tests for new program implementations? Heaps etc?
        test("Nop", function() {
            var vm = new hhvm();
            var prog = [opcodes.NOP, 42, 8];
            vm.run(prog);
            ok(vm.stack.length === 0);
            ok(vm.output == "");
        });
        //TODO: implement tests first by examples from github:
        //https://github.com/facebook/hiphop-php/blob/master/hphp/doc/bytecode.specification#L3936
    }
);
