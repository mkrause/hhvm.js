require.config({
    baseUrl: '../src/'
});

var checkVMState = function(vm, output){
    ok(!vm.running);
    equal(vm.callStack.length(), 0);
    equal(vm.currentFrame, null);
    equal(vm.stack, null);
    equal(vm.fpiStack, null);
    equal(vm.output, output);
};

var checkExitCode = function(expected) {
    return function(exitCode){
        equal(exitCode, expected);
    };
};

define([
        'hhvm',
        'assemble'
    ], function(hhvm, assemble) {
        test("Nop", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(0)
            });
            
            vm.program(assemble("Nop\nRetC"));
            vm.run();
            checkVMState(vm, "");
        });
        
        
        //First example test script parsed by server
        /*
         Pseudo-main at 0 (ID 0)
          // line 16
            0: FPushFuncD 0 "foo"
            6: FCall 0
            8: PopR # i0:t=Null
          // line 17
            9: FPushFuncD 0 "foobar"
           15: FCall 0
           17: UnboxR # Nop
           18: SetL 0 # i0:t=Int64*
           20: PopC
          // line 18
           21: FPushFuncD 1 "bar"
           27: CGetL 0
           29: FPassC 0 # Nop
           31: FCall 1
           33: PopR # i0:t=Int64*
           34: Int 1
           43: RetC
        
        Function (leaf) foo at 44 (ID 1)
          // line 4
           44: Null
           45: RetC
        
        Function (leaf) bar at 46 (ID 2)
          // line 10
           46: VerifyParamType 0
          // line 7
           48: Int 42
           57: CGetL2 0
           59: Add
          // line 8
           60: Int 2
           69: Mul
          // line 9
           70: RetC
        
        Function (leaf) foobar at 71 (ID 3)
          // line 13
           71: Int 42
           80: RetC

         */
        
        
        /*
         * Example programs from https://github.com/facebook/hiphop-php/blob/master/hphp/doc/bytecode.specification#L3936
         */
        
        /*
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
        
        // function f($a) { return $a[0]++; }
        test("f5", function() {
            //TODO: implement missing instructions
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
            //TODO: implement missing functions
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
            //TODO: implement missing instructions
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
            //TODO: implement missing instructions
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
            //TODO: implement missing instructions
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
            //TODO: implement missing instructions
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
            //TODO: implement missing instructions
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
            //TODO: implement missing instructions
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
        */
        
    }
);
