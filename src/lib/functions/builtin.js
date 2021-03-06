define([
        'vendor/underscore',
        'lib/ref',
        'lib/cell'
    ], function(_, Ref, Cell) {
        var indent = function(value) {
            var lines = value.split("\n");
            var output = _.map(lines, function(line) { return "\t" +line; });
            return output.join("\n");
        };

        var print_r_helper = function(cell) {
            var value = cell instanceof Cell ? cell.value : cell;
            var output = "";
            if (_.isArray(value)) {
                output += "Array\n(\n";
            } else if (_.isObject(value)) {
                output += value.constructor + " Object\n(\n";
            } else {
                return value.toString();
            }

            _.each(Object.keys(value), function(key) {
                output += indent("[" + key + "] => " + print_r_helper(value[key])) + "\n";
            });
            output += ")\n";
            return output;
        };

        return {
            count: function(array_or_countable, mode) {
                var array = array_or_countable.value;
                this.stack.push(new Cell(array.length));
            },
            print_r: function(expression, doReturn) {
                doReturn = doReturn.value;
                var output = print_r_helper(expression, 0);

                if (doReturn) {
                    this.stack.push(new Cell(output));
                } else {
                    this.print(output);
                }
            },
            /* NOTE: the accuracy of this function is lower than
             *       described in the PHP documentation. */
            microtime: function(get_as_float) {
                if(typeof(get_as_float) === 'undefined') get_as_float = false;
                var output;

                if(get_as_float) {
                    this.hhbc.Double(Date.now() / 1000);
                } else {
                    var time = Date.now();
                    this.hhbc.String('' + (time % 1000) * 1000 + ' ' + time / 1000);
                }
            }
        };
    }
);
