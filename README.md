# hhvm.js

An implementation of Facebook's [HipHop VM](https://github.com/facebook/hiphop-php) runtime in JavaScript.


## Installation

hhvm.js is defined as a [RequireJS](http://requirejs.org) module.

    define([
            'hhvm'
        ], function(Hhvm) {
            var vm = new Hhvm();
            
            var myProgram = /* ... */;
            vm.program(myProgram);
            vm.run();
        }
    );


## Usage

To create and configure a new virtual machine:

    var options = {
        outputHandler: function(str) { // Do something with the output }
    };
    var vm = new Hhvm(options);


## Instructions

Use `vm.hhbc` to retrieve and execute HipHop bytecode instructions.

    vm.hhbc.Int(); // Execute the Int instruction
    
    console.log(vm.hhbc.Int.opcode); // 14
    console.log(vm.hhbc.Int.mnemonic); // "Int"
