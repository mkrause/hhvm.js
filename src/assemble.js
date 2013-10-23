define([
        'vendor/underscore',
        'lib/instructions/instructions',
        'lib/instructions/opcodes',
        'lib/util/binary_converter'
    ], function(_, instructions, opcodes, BinaryConverter) {
        // Very basic assembler
        return function(as) {
            var binary = new BinaryConverter();
            var bytes = [];
            
            as = _.isString(as) ? as.split("\n") : as;
            _.each(as, function(line) {
                // Remove comments
                line = line.replace(/#.+/, '');
                
                // Skip empty lines
                line = line.trim();
                if (line === "") {
                    return;
                }
                
                var parts = line.split(" ");
                var mnemonic = parts[0];
                var args = _.rest(parts);
                
                var opcode = opcodes[mnemonic];
                var instr = instructions[opcode];
                
                // Push the opcode of the instruction
                bytes.push(opcode);
                
                if (instr.spec.length !== args.length) {
                    throw "Invalid amount of arguments for instruction " + instr.mnemonic + ": " + instr.spec.length + " expected, but " + args.length + " supplied.";
                }
                
                // For each of the arguments the instruction expects, get one argument
                _.each(instr.spec, function(argType, key) {
                    var arg = args[key];
                    
                    if (argType === 'byte') {
                        var intValue = parseInt(arg, 10);
                        bytes.push(intValue);
                    } else if (argType === 'int') {
                        var intValue = parseInt(arg, 10);
                        
                        // Encode as a 64 bit number in little endian order
                        bytes.push.apply(bytes, binary.encodeInt64(intValue));
                    } else if (argType === 'double') {
                        var dbl = Number(arg); // Parse as double
                        bytes.push.apply(bytes, binary.encodeDouble(dbl));
                    }  else if (argType === 'varInt' || argType === 'varId' || argType === 'iteratorId') {
                        var varInt = Number(arg); // Parse as variable sized integer
                        bytes.push.apply(bytes, binary.encodeVarInt(varInt));
                    } else if (argType === 'array') {
                        var arr = JSON.parse(arr); // Parse as array
                        
                        if (!(type instanceof Array)) {
                            throw "Type error: expected array";
                        }
                        
                        // Add the array to the metadata and push the ID
                        bytes.push(unit.arrays.length - 1);
                    }
                });
            });
            
            return { units: [ { bc: bytes } ] };
        };
    }
);
