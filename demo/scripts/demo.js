require.config({
    baseUrl: '../src/',
    paths: {
        demo: '../demo/scripts',
        jquery: '../demo/scripts/vendor/jquery'
    },
    shims: {
        jquery: { exports: 'jQuery' }
    }
});

define([
        'jquery',
        'hhvm'
    ], function($, hhvm) {
        $(document).ready(function() {
            $('#btn-run').click(function() {
                var vm = new hhvm();
                vm.run();
                
                $('#output').text(vm.output);
            });
        });
    }
);
