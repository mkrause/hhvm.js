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
            $('#btn-run').click(function() {
                var vm = new Hhvm(assemble($('#input').val()));
                vm.run();
                
                var output = vm.output;
                //output += "\n\n====\n\nStack:\n" + vm.stack;
                $('#output').text(output);
            });
        });
    }
);
