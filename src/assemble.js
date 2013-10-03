define([
        'vendor/underscore',
        'lib/instructions/opcodes'
    ], function(_, opcodes) {
        // Very basic assembler
        return function(as) {
            var bytes = [];
            _.each(as.split("\n"), function(line) {
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
                        // Note that we don't support 64 bit numbers yet (due to JS limitations),
                        // so the first four bytes are 0
                        bytes.push(0);
                        bytes.push(0);
                        bytes.push(0);
                        bytes.push(0);
                        bytes.push(num >> 24 & 255);
                        bytes.push(num >> 16 & 255);
                        bytes.push(num >> 8 & 255);
                        bytes.push(num & 255);
                    }
                });
            });
            
            return bytes;
        };
    }
);
