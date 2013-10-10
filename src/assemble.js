define([
        'vendor/underscore',
        'lib/instructions/instructions',
        'lib/instructions/opcodes',
        'lib/util/binary'
    ], function(_, instructions, opcodes, binary) {
        // Very basic assembler
        return function(as) {
            var bytes = [];
            _.each(as.split("\n"), function(line) {
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
                
                // For each of the arguments the instruction expects, get one argument
                _.each(instr.spec, function(argType, key) {
                    if (argType === 'byte') {
                        var intValue = parseInt(args[key], 10);
                        bytes.push(intValue);
                    } else if (argType === 'int') {
                        var intValue = parseInt(args[key], 10);
                        
                        // Encode as a 64 bit number in big endian order
                        bytes.push.apply(bytes, binary.encodeInt64(intValue));
                    } else if (argType === 'double') {
                        var dbl = Number(args[key]); // Parse as double
                        bytes.push.apply(bytes, binary.encodeDouble(dbl));
                    }
                });
            });
            
            return bytes;
        };
    }
);
