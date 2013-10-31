define([
        'vendor/underscore',
        'lib/ref',
        'lib/cell'
    ], function(_, Ref, Cell) {
        return {
            count: function(array_or_countable, mode) {
                var array = array_or_countable.value;
                this.stack.push(new Cell(array.length));
            }
        };
    }
);
