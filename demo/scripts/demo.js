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
        'lib/instructions/opcodes'
    ], function($, Hhvm, opcodes) {
        $(document).ready(function() {
            $('#btn-run').click(function() {
                var vm = new Hhvm([opcodes.Int, 0, 0, 0, 0, 0, 0, 0, 42, opcodes.Print]);
                vm.run();
                
                var output = vm.output;
                //output += "\n\n====\n\nStack:\n" + vm.stack;
                $('#output').text(output);
            });
        });
    }
);
