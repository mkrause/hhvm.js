require.config({
    baseUrl: '../src/',
    paths: {
        demo: '../demo/scripts',
        jquery: '../demo/scripts/vendor/jquery'
    },
    shim: {
        jquery: { exports: 'jQuery' }
    }
});

define([
        'jquery',
        'hhvm',
        'assemble',
        'lib/instructions/opcodes'
    ], function($, Hhvm, assemble, opcodes) {
        $(document).ready(function() {
            var vm = new Hhvm({
                outputHandler: function(str) {
                    var currentOutput = $('#output').val();
                    $('#output').val(currentOutput + str);
                }
            });
            
            $('#btn-run').click(function() {
                // Clear the output
                $('#output').val("");
                
                var prog = assemble($('#input').val());
                vm.program(prog);
                vm.run();
            });
            
            $('#btn-stop').click(function() {
                vm.stop();
            });
        });
    }
);
