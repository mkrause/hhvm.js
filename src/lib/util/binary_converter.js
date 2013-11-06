// Utility functions for binary representations
define([
        'lib/util/binary_parser'
    ], function(BinaryParser) {

        var extendSign = function(byte) {
            return (byte & 128) ? 255 : 0;
        };

        var BinaryConverter = function(bigEndian) {
            this.bigEndian = bigEndian || false;
            this.parser = new BinaryParser(this.bigEndian, false);
        };

        // Encode the given number as a 32 bit integer in little endian order.
        BinaryConverter.prototype.encodeInt32 = function(num) {
            var bytes = [
                num & 255,
                num >> 8 & 255,
                num >> 16 & 255,
                num >> 24 & 255
            ];
            return bytes;
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
            return this.decodeInt32(bytes);
        };

        BinaryConverter.prototype.decodeInt32 = function(bytes) {
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

        BinaryConverter.prototype.encodeVarInt = function(num) {
            // Check if it fits in 7 bits
            if (num >= -64 && num <= 63) {
                return [ (num & 127) << 1 ];
            }

            // Return 4 bytes
            var bytes = [
                (num & 127) << 1 & 1, // add flag
                num >> 7 & 255,
                num >> 15 & 255,
                num >> 23 & 255
            ];
            return bytes;
        };

        BinaryConverter.prototype.decodeVarInt = function(bytes) {
            var varInt = {};

            // To determine which size the immediate is, examine the first byte where
            // the immediate is expected, and examine its low-order bit. If it is zero,
            // it's a 1-byte immediate; otherwise, it's 4 bytes.
            varInt.length = (bytes[0] & 1) ? 4 : 1;

            // The immediate has to be logical-shifted to the right by one to
            // get rid of the flag bit.
            if (varInt.length === 1) {
                varInt.value = bytes[0] >> 1
                    | extendSign(bytes[0]) << 7
                    | extendSign(bytes[0]) << 15
                    | extendSign(bytes[0]) << 23;
            } else {
                varInt.value = bytes[0] >> 1
                    | bytes[1] << 7
                    | bytes[2] << 15
                    | bytes[3] << 23;
            }
            return varInt;
        };

        return BinaryConverter;
    }
);
