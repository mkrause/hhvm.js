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
var throwError = function(e) {
    //console.log(e.stack);
    throw e;
};

var checkOpcodes = function(vm){
    var instructionSet = vm.hhbc;
    var data = vm.prog.data;
    for(var i = 0; i < data.units.length; i++){
        var unit = data.units[i];
        for(var k = 0; k < unit.bc.length; k++){
            var bc = unit.bc[k];
            if(bc != 0 && instructionSet.byOpcode(bc) == undefined){
                console.log("Unimplemented opcode: " + bc);
            }
        }
    }
};

define([
        'hhvm',
        'assemble',
        'lib/program',
        'lib/instruction_set',
        '../test/scripts/p1',
        '../test/scripts/p2',
        '../test/scripts/p3',
        '../test/scripts/p4',
        '../test/scripts/p5',
        '../test/scripts/p6',
    ], function(hhvm, assemble, Program, instructionSet, p1, p2, p3, p4, p5, p6) {
        
        test("Nop", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1),
                onError: throwError
            });
            
            vm.program(assemble([
                "Nop",
                "RetC"
            ]));
            vm.run();
            checkVMState(vm, "");
        });
        
        //Test scripts
        test("p1", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1),
                onError: throwError
            });
            
            vm.program(new Program(p1));
            checkOpcodes(vm);
            vm.run();
            checkVMState(vm, "Hello World");
        });
        
        test("p2", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1),
                onError: throwError
            });
            
            vm.program(new Program(p2));
            checkOpcodes(vm);
            vm.run();
            checkVMState(vm, "43");
        });
        
        test("p3", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1),
                onError: throwError
            });
            
            vm.program(new Program(p3));
            checkOpcodes(vm);
            vm.run();
            checkVMState(vm, "84");
        });
        
        test("p4", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1),
                onError: throwError
            });
            
            vm.program(new Program(p4));
            checkOpcodes(vm);
            vm.run();
            checkVMState(vm, "Result: 92");
        });
        
        test("p5", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1),
                onError: throwError
            });
            
            vm.program(new Program(p5));
            checkOpcodes(vm);
            vm.run();
            checkVMState(vm, "result of round 1: 128\nresult of round 2: 128\nresult of round 3: 192\nresult of round 4: 128\n");
        });
        
        test("p6", function() {
            var vm = new hhvm({
                blocking: true,
                exitHandler: checkExitCode(1),
                onError: throwError
            });
            
            vm.program(new Program(p6));
            checkOpcodes(vm);
            vm.run();
            checkVMState(vm, "");
        });
    }
);
