// TODO: shouldn't the test cases be in binary format? We are now using the assembler, but we cannot create an 100% covering assembler (Erik)

require.config({
    baseUrl: '../src/'
});


define([
        'lib/instructions/instructions'
    ], function(opcodes) {
        for(var i = 0; i < opcodes.length; i++){
            document.write(i + " " + JSON.stringify(opcodes[i]) + "<br />");
        }
        console.log("done");
    }
);
