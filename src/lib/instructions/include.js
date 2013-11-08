define([
    ], function() {
        return {
            DefCns: function(name) {
                var cell = this.stack.pop();

                if (this.constantVars[name] !== undefined) {
                    this.notice("Constant " + name + " is already defined");
                    this.hhbc.False();
                } else if (_.isArray(cell.value) || _.isObject(cell.value)) {
                    this.notice("Constant value cannot be an array or object");
                    this.hhbc.False();
                } else {
                    this.constantVars[name] = cell.value;
                    this.hhbc.True();
                }
            }
        };
    }
);
