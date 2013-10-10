// Utility functions for binary representations
define([
        'lib/util/binary_parser'
    ], function(BinaryParser) {

        var BinaryConverter = function() {
            this.bigEndian = false;
            this.parser = new BinaryParser(this.bigEndian, false);
        };

        // Encode the given number as a 64 bit integer in little endian order.
        // Since JS doubles can't represent 64 bit integers exactly, we only support
        // 32 bits for now.
        BinaryConverter.prototype.encodeInt64 = function(num) {
            var bytes = [
                num & 255,
                num >> 8 & 255,
                num >> 16 & 255,
                num >> 24 & 255,
                0,
                0,
                0,
                0
            ];
            return bytes;
        };

        // Read a 64 bit signed integer from the program, in little endian format.
        // Note that since JavaScript uses doubles, it can only represent integers
        // exactly up to 2^53. So for now, we only support 32 bit integers.
        // (http://stackoverflow.com/questions/14200071)
        //
        // Also note that JS bit shift operators act on a 32 bit 2's complement
        // representation of the operand, so negative numbers work as expected.
        // (http://stackoverflow.com/questions/2373791)
        BinaryConverter.prototype.decodeInt64 = function(bytes) {
            var num = bytes[0]
                | bytes[1] << 8
                | bytes[2] << 16
                | bytes[3] << 24;
            return num;
        };

        BinaryConverter.prototype.encodeDouble = function(doubleVal) {
            return this.parser.encodeFloat(doubleVal, 52, 11);
        };

        BinaryConverter.prototype.decodeDouble = function(bytes) {
            return this.parser.decodeFloat(bytes, 52, 11);
        };

        return BinaryConverter;
    }
);
