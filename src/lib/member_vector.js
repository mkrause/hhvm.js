define([
        'vendor/underscore',
        'lib/util/binary_converter'
    ], function(_, BinaryConverter) {
        var MemberVector = function(bytes) {
            this.bytes = bytes;
            this.binConverter = new BinaryConverter();
            this.pointer = 0;
            this.size = this.parseSize();
            this.locationDescriptor = this.parseLocDescription();
            this.members = this.parseMembers();
            delete this['binConverter'];
            delete this['pointer'];
            delete this['bytes'];
        };

        MemberVector.prototype.parseSize = function() {
            var size = this.bytes[this.pointer];
            this.pointer++;
            return size;
        };

        MemberVector.prototype.parseLocDescription = function() {
            var lc = {};

            // These two ints probably indicate the location descriptor type
            var type1 = this.binConverter.decodeInt32(this.bytes.slice(this.pointer, this.pointer + 4).reverse());
            this.pointer += 4;
            var type2 = this.binConverter.decodeInt32(this.bytes.slice(this.pointer, this.pointer + 4).reverse());
            this.pointer += 4;

            switch (type2) {
                case 0:
                    lc.type = "L";
                    var varint = this.binConverter.decodeVarInt(this.bytes.slice(this.pointer, this.pointer + 4));
                    this.pointer += varint.length;
                    lc.value = varint.value;
                    break;
                case 1:
                    lc.type = "C";
                    break;
                // TODO: support more location descriptors types
                default:
                    throw new Error("Unsupported location descriptor type");
            }

            return lc;
        };

        MemberVector.prototype.parseMembers = function() {
            var members = [];
            while (this.pointer < this.bytes.length) {
                members.push(this.parseMember());
            }
            return members;
        };

        MemberVector.prototype.parseMember = function() {
            var member = {};
            switch (this.bytes[this.pointer]) {
                // TODO: support more member types
                case 0:
                    member.type = "EC";
                    this.pointer++;
                    break;
                case 2:
                    member.type = "EL";
                    this.pointer++;
                    var varint = this.binConverter.decodeVarInt(this.bytes.slice(this.pointer, this.pointer + 4));
                    this.pointer += varint.length;
                    member.value = varint.value;
                    break;
                case 4:
                    member.type = "ET";
                    this.pointer++;
                    member.value = this.binConverter.decodeInt32(this.bytes.slice(this.pointer, this.pointer + 4));
                    this.pointer += 4;
                    break;
                case 6:
                    member.type = "EI";
                    this.pointer++;
                    member.value = this.binConverter.decodeInt64(this.bytes.slice(this.pointer, this.pointer + 8));
                    this.pointer += 8;
                    break;
                default:
                    throw new Error("Unsupported member vector type");
            }
            return member;
        };
        
        return MemberVector;
    }
);
