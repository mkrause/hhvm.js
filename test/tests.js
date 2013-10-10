require.config({
    baseUrl: '../src/'
});

var checkVMState(vm, hbbc, stackSize, output){
    ok(!vm.running);
    ok(vm.pc == hbbc.split("\n").length);
    ok(vm.stack.length == stackSize);
    ok(vm.output == output);
}

define([
        'hhvm'
    ], function(hhvm) {
        test("Nop", function() {
            var vm = new hhvm();
            var prog = assemble("Nop");
            vm.run(prog);
            checkVMState(vm, prog.length, 0, "");
        });
        
        /*
         * Example programs from https://github.com/facebook/hiphop-php/blob/master/hphp/doc/bytecode.specification#L3936
         */
        
        // function f() {return $a = $b}
        test("f1", function() {
            var vm = new hhvm();
            var hbbc = 
               "CGetL 1\
                SetL 0\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f() { g($a, $b); }
        test("f2", function() {
            var vm = new hhvm();
            //TODO: implement instructions
            var hbbc = 
               "FPushFuncD 2 \"g\"\
                FPassL 0 0\
                FPassL 1 1\
                FCall 2\
                PopR\
                Null\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f() { return $a + $b; }
        test("f3", function() {
            var vm = new hhvm();
            //TODO: implement instructions
            var hbbc = 
               "CGetL 1\
                CGetL2 0\
                Add\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f() { echo "Hello world\n"; }
        test("f4", function() {
            var vm = new hhvm();
            var hbbc = 
               "String \"Hello world\n\"\
                Print\
                PopC\
                Null\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        //TODO: implement missing instructions of tests below
        // function f($a) { return $a[0]++; }
        test("f5", function() {
            var vm = new hhvm();
            var hbbc = 
               "Int 0\
                IncDecM PostInc <L:0 EC>\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f($a, $b) { $a[4] = $b; }
        test("f6", function() {
            var vm = new hhvm();
            var hbbc = 
               "Int 4\
                CGetL 1\
                SetM <L:0 EC>\
                PopC\
                Null\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f($a, $b, $i) { $a[$i] = $b; }
        test("f7", function() {
            var vm = new hhvm();
            var hbbc = 
               "CGetL 1\
                SetM <L:0 EL:2>\
                PopC\
                Null\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f($a, $b) { return $a[4] = $b; }
        test("f8", function() {
            var vm = new hhvm();
            var hbbc = 
               "Int 4\
                CGetL 1\
                SetM <L:0 EC>\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f($a, $b) { return $a[4][5] = $b[6]; }
        test("f9", function() {
            var vm = new hhvm();
            var hbbc = 
               "Int 4\
                Int 5\
                Int 6\
                CGetM <L:1 EC>\
                SetM <L:0 EC EC>\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f($a, $b, $i) { return $a[$i][5] = $b[6]; }
        test("f10", function() {
            var vm = new hhvm();
            var hbbc = 
               "Int 5\
                Int 6\
                CGetM <L:1 EC>\
                SetM <L:0 EL:2 EC>\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f($a, $b) { $a->prop = $b; }
        test("f11", function() {
            var vm = new hhvm();
            var hbbc = 
               "String \"prop\"\
                CGetL 1\
                SetM <L:0 PC>\
                PopC\
                Null\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f() { return FOO; }
        test("f12", function() {
            var vm = new hhvm();
            var hbbc = 
               "Cns \"FOO\"\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f() { return c::FOO; }
        test("f13", function() {
            var vm = new hhvm();
            var hbbc = 
               "ClsCnsD \"FOO\" \"c\"\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // function f($cls) { return $cls::FOO; }
        test("f14", function() {
            var vm = new hhvm();
            var hbbc = 
               "AGetL 0\
                ClsCns \"FOO\"\
                RetC";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
        // 
        test("f", function() {
            var vm = new hhvm();
            var hbbc = 
               "";
            var prog = assemble(hbbc);
            vm.run(prog);
            //TODO: checkVMState
            checkVMState(vm, hbbc, 0, "");
        });
        
    }
);
