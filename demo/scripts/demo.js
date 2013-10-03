$script.path('../src/');
$script(['../demo/scripts/vendor/jquery', 'hhvm'], function() {
    $(document).ready(function() {
        $('#btn-run').click(function() {
            var vm = new hhvm();
            vm.run();
            
            $('#output').text(vm.output);
        });
    });
});
