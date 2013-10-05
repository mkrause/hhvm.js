define([
        'vendor/underscore',
        'lib/instructions/opcodes',
        'lib/util/binary'
    ], function(_, opcodes, binary) {
        // Very basic assembler
        return function(as) {
            var bytes = [];
            _.each(as.split("\n"), function(line) {
                var line = line.trim();
                
                // Skip empty lines
                if (line === "") {
                    return;
                }
                
                var parts = line.split(" ");
                var mnemonic = parts[0];
                var args = _.rest(parts);
                
                bytes.push(opcodes[mnemonic]);
                
                _.each(args, function(arg) {
                    // Numbers
                    if (/-?\d*(.\d*)?/.test(arg)) {
                        // Encode as a 64 bit number
                        var num = Number(arg);
                        
                        // Push bytes in big endian order
                        bytes.push.apply(bytes, binary.encodeInt64(num));
                    }
                });
            });
            
            return bytes;
        };
    }
);
