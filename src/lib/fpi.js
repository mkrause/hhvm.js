define([
        'vendor/underscore'
    ], function(_) {
        var FPI = function(func, numParameters) {
            this.func = func;
            this.address = this.getByteCodeAddress();
            this.numParameters = numParameters;

            // Indicates whether each parameter is passed by value or pass by reference
            this.parameterTable = this.initializeParameterTable();
        };
        
        FPI.prototype.getByteCodeAddress = function() {
            // TODO: Lookup in meta data of functionName
            return 0;
        };

        FPI.prototype.parameterType = {
            PASS_BY_VALUE: 0,
            PASS_BY_REFERENCE: 1
        };
        
        FPI.prototype.initializeParameterTable = function() {
            // TODO: Lookup in meta data of functionName
            return {};
        };
        
        FPI.prototype.getParameterTable = function () {
            return this.parameterTable;
        };
        
        FPI.prototype.toString = function() {
            return "[FPI: " + this.func + "]";
        };

        return FPI;
    }
);
