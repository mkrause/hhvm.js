// TODO: shouldn't the test cases be in binary format? We are now using the assembler, but we cannot create an 100% covering assembler (Erik)

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
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                "Nop",
                "RetC"
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        test("HHVM1", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //Pseudo-main at 0 (ID 0)
                //Line 16
                
                'FPushFuncD 0 "foo"',
                'FCall 0',
                'PopR # i0:t=Null',
                //Line 17
                'FPushFuncD 0 "foobar"',
                'FCall 0',
                'UnboxR # Nop',
                'SetL 0 # i0:t=Int64*',
                'PopC',
                //Line 18
                'FPushFuncD 1 "bar"',
                'CGetL 0',
                'FPassC 0 # Nop',
                'FCall 1',
                'PopR # i0:t=Int64*',
                'Int 1',
                'RetC',
                
                //Function (leaf) foo at 44 (ID 1)
                //Line 4
                'Null',
                'RetC',
                
                //Function (leaf) bar at 46 (ID 2)
                //line 10
                'VerifyParamType 0',
                //Line 7
                'Int 42',
                'CGetL2 0',
                'Add',
                //Line 8
                'Int 2',
                'Mul',
                //Line 9
                'RetC',
                
                //Function (leaf) foorbar at 71 (ID 3)
                //Lin 13
                'Int 42',
                'RetC'
                
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        /*
         * Example programs from https://github.com/facebook/hiphop-php/blob/master/hphp/doc/bytecode.specification#L3936
         */
        
        //function f() { return $a = $b; }
        test("f1", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                "CGetL 1",
                "SetL 0",
                "RetC"
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        //function f() { g($a, $b); }
        test("f2", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                'FPushFuncD 2 "g"',
                'FPassL 0 0',
                'FPassL 1 1',
                'FCall 2',
                'PopR',
                'Null',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });

        //function f() { return $a + $b; }
        test("f3", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                'CGetL 1',
                'CGetL2 0',
                'Add',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        //function f() { echo "Hello world\n"; }
        test("f4", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                'String "Hello World\n"',
                'Print',
                'PopC',
                'Null',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "Hello World\n");
        });
        
        // function f($a) { return $a[0]++; }
        test("f5", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                'Int 0',
                'IncDecM PostInc <L:0 EC>',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f($a, $b) { $a[4] = $b; }
        test("f6", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //TODO: implement missing instructions
                'Int 4',
                'CGetL 1',
                'SetM <L:0 EC>',
                'PopC',
                'Null',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f($a, $b, $i) { $a[$i] = $b; }
        test("f7", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //TODO: implement missing instructions
                'CGetL 1',
                'SetM <L:0 EL:2>',
                'PopC',
                'Null',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f($a, $b) { return $a[4] = $b; }
        test("f8", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //TODO: implement missing instructions
                'Int 4',
                'CGetL 1',
                'SetM <L:0 EC>',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f($a, $b) { return $a[4][5] = $b[6]; }
        test("f9", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //TODO: implement missing instructions
                'Int 4',
                'Int 5',
                'Int 6',
                'CGetM <L:1 EC>',
                'SetM <L:0 EC EC>',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f($a, $b, $i) { return $a[$i][5] = $b[6]; }
        test("f10", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //TODO: implement missing instructions
                'Int 5',
                'Int 6',
                'CGetM <L:1 EC>',
                'SetM <L:0 EL:2 EC>',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f($a, $b) { $a->prop = $b; }
        test("f11", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //TODO: implement missing instructions
                'String "prop"',
                'CGetL 1',
                'SetM <L:0 PC>',
                'PopC',
                'Null',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f() { return FOO; }
        test("f12", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                'Cns "FOO"',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f() { return c::FOO; }
        test("f13", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                'ClsCnsD "FOO" "c"',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        // function f($cls) { return $cls::FOO; }
        test("f14", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //TODO: implement missing instructions
                'AGetL 0',
                'ClsCns "FOO"',
                'RetC'
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        /* 
        test("f", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1)
            });
            
            vm.program(assemble([
                //hbbc here
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        */
        
    }
);
