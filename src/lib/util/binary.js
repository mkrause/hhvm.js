// Utility functions for binary representations
define([], {
    // Encode the given number as a 64 bit integer in big endian order.
    // Since JS doubles can't represent 64 bit integers exactly, we only support
    // 32 bits for now.
    encodeInt64: function(num) {
        var bytes = [
            0,
            0,
            0,
            0,
            num >> 24 & 255,
            num >> 16 & 255,
            num >> 8 & 255,
            num & 255
        ];
        return bytes;
    },
    
    // Read a 64 bit signed integer from the program, in big endian format.
    // Note that since JavaScript uses doubles, it can only represent integers
    // exactly up to 2^53. So for now, we only support 32 bit integers.
    // (http://stackoverflow.com/questions/14200071)
    // 
    // Also note that JS bit shift operators act on a 32 bit 2's complement
    // representation of the operand, so negative numbers work as expected.
    // (http://stackoverflow.com/questions/2373791)
    decodeInt64: function(bytes) {
        var num = bytes[7] << 0
            | bytes[6] << 8
            | bytes[5] << 16
            | bytes[4] << 24;
        return num;
    },
    
    encodeDouble: function(bytes) {
        //TODO see:
        // http://stackoverflow.com/questions/4414077
        // http://jsfromhell.com/classes/binary-parser
        return [0, 0, 0, 0, 0, 0, 0, 0];
    },
    
    decodeDouble: function(bytes) {
        //TODO
        return 0;
    }
});
