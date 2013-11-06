define([
        'vendor/underscore'
    ], function(_) {
        var FPI = function(metadata, numParameters) {
            this.functionName = metadata.name;
            this.address = metadata.base;
            this.localNames = metadata.localNames;
            this.numParameters = numParameters || 0;

            // Indicates whether each parameter is passed by value or pass by reference
            this.parameterTable = this.initializeParameterTable();
        };

        FPI.prototype.parameterType = {
            PASS_BY_VALUE: 0,
            PASS_BY_REFERENCE: 1
        };

        FPI.prototype.getParameterType = function(paramId) {
            return this.parameterTable[paramId] ? this.parameterTable[paramId].parameterType : undefined;
        };

        FPI.prototype.initializeParameterTable = function() {
            // TODO: Lookup in meta data of functionName
            return {};
        };

        FPI.prototype.toString = function() {
            return "[FPI: " + this.functionName + "]";
        };

        return FPI;
    }
);
