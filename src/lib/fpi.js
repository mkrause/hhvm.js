define([
        'vendor/underscore'
    ], function(_) {
        var FPI = function(functionName, numParameters) {
            this.functionName = functionName;
            this.address = this.getByteCodeAddress();
            this.numParameters = numParameters;

            // Indicates whether each parameter is passed by value or pass by reference
            this.parameterTable = this.getParameterTable();
        };
        
        FPI.prototype.getByteCodeAddress = function() {
            // TODO: Lookup in meta data of functionName
            return 0;
        };

        FPI.prototype.getParameterTable = function() {
            // TODO: Lookup in meta data of functionName
            return {};
        };
        
        FPI.prototype.toString = function() {
            return "[FPI: " + this.functionName + "]";
        };

        return FPI;
    }
);
