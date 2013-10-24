define([
        'vendor/underscore',
        'lib/instructions/instructions',
        'lib/instructions/opcodes',
        'lib/util/binary_converter',
        'lib/program'
    ], function(_, instructions, opcodes, BinaryConverter, Program) {
        // Very basic assembler
        return function(as) {
            var binary = new BinaryConverter();
            var bytes = [];
            var litStrs = [];
            
            var splitOnSpace = function(line){
                var breakPos = line.indexOf(" ");
                if(breakPos < 0){
                    return [line, ""];
                } else {
                    return [line.substring(0, breakPos), line.substring(breakPos + 1, line.length)];
                }
            };
            
            as = _.isString(as) ? as.split("\n") : as;
            _.each(as, function(line) {
                // Remove comments
                line = line.replace(/#.+/, '');
                
                // Skip empty lines
                line = line.trim();
                if (line === "") {
                    return;
                }
                
                var parts = splitOnSpace(line);
                console.log("line: " + line);
                console.log("Parts: " + JSON.stringify(parts));
                var mnemonic = parts[0];
                var args = parts[1];
                
                var opcode = opcodes[mnemonic];
                var instr = instructions[opcode];
                
                // Push the opcode of the instruction
                bytes.push(opcode);
                
                // For each of the arguments the instruction expects, get one argument
                _.each(instr.spec, function(argType) {
                    if (argType === 'byte') {
                        //Parse argument from line
                        var argParts = splitOnSpace(args);
                        var arg = argParts[0];
                        args = argParts[1];
                        
                        var intValue = parseInt(arg, 10);
                        bytes.push(intValue);
                    } else if (argType === 'int') {
                        //Parse argument from line
                        var argParts = splitOnSpace(args);
                        var arg = argParts[0];
                        args = argParts[1];
                        
                        var intValue = parseInt(arg, 10);
                        
                        // Encode as a 64 bit number in little endian order
                        bytes.push.apply(bytes, binary.encodeInt64(intValue));
                    } else if (argType === 'double') {
                        //Parse argument from line
                        var argParts = splitOnSpace(args);
                        var arg = argParts[0];
                        args = argParts[1];
                        
                        var dbl = Number(arg); // Parse as double
                        bytes.push.apply(bytes, binary.encodeDouble(dbl));
                    }  else if (argType === 'varInt' || argType === 'varId' || argType === 'iteratorId') {
                        //Parse argument from line
                        var argParts = splitOnSpace(args);
                        var arg = argParts[0];
                        args = argParts[1];
                        
                        var varInt = Number(arg); // Parse as variable sized integer
                        bytes.push.apply(bytes, binary.encodeVarInt(varInt));
                    } else if (argType === 'array') {
                        //Parse argument from line
                        var argParts = splitOnSpace(args);
                        var arg = argParts[0];
                        args = argParts[1];
                        
                        var arr = JSON.parse(arg); // Parse as array
                        
                        if (!(type instanceof Array)) {
                            throw "Type error: expected array";
                        }
                        
                        // Add the array to the metadata and push the ID
                        bytes.push(unit.arrays.length - 1);
                    } else if(argType == 'string'){
                        //Parse argument from line
                        if(args.substring(0, 1) != '"'){
                            throw new Exception("No string supplied as argument");
                        }
                        args = args.substring(1, args.length);
                        var endPos = args.indexOf('"');
                        var arg = args.substring(0, endPos);
                        args = args.substring(endPos + 2, args.length); //chop off quote and space after string argument
                        litStrs.push(arg);
                        var litStrIdBytes = binary.encodeInt32(litStrs.length - 1);
                        bytes.push.apply(bytes, litStrIdBytes);
                    }
                    console.log("bytes: " + bytes);
                });
            });
            
            var data = { units: [ { bc: bytes, functions: [], litStrs: litStrs } ] };
            return new Program(data);
        };
    }
);
