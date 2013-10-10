define([
        'vendor/underscore'
    ], function(_) {
        var FPI = function(functionName, numParams) {
            this.functionName = functionName;
            this.address = this.getByteCodeAddress();
            this.numParameters = this.getNumParameters();

            // Indicates whether each parameter is passed by value or pass by reference
            this.parameterTable = this.getParameterTable();
        };
        
        FPI.prototype.getByteCodeAddress = function() {
            // TODO: Lookup in meta data of functionName
            return 0;
        };

        FPI.prototype.getNumParameters = function() {
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
