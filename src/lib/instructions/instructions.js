define([
        'lib/hhbc'
    ], function(hhbc) {
      return [
            {name: "LowInvalid", func: null},
            // 1. Basic instructions
            {name: "Nop", func: hhbc.Nop},
            {name: "PopC", func: null},
            {name: "PopV", func: null},
            {name: "PopR", func: null},
            {name: "Dup", func: null},
            {name: "Box", func: null},
            {name: "Unbox", func: null},
            {name: "BoxR", func: null},
            {name: "UnboxR", func: null},

            // 2. Literal and constant instructions
            {name: "Null", func: hhbc.Null},
            {name: "True", func: hhbc.True},
            {name: "False", func: hhbc.False},
            {name: "NullUninit", func: hhbc.NullUninit},
            {name: "Int", func: hhbc.Int},
            {name: "Double", func: hhbc.Double},
            {name: "String", func: null},
            {name: "Array", func: null},
            {name: "NewArray", func: null},
            {name: "NewPackedArray", func: null},
            {name: "AddElemC", func: null},
            {name: "AddElemV", func: null},
            {name: "AddNewElemC", func: null},
            {name: "AddNewElemV", func: null},
            {name: "NewCol", func: null},
            {name: "ColAddElemC", func: null},
            {name: "ColAddNewElemC", func: null},
            {name: "Cns", func: null},
            {name: "CnsE", func: null},
            {name: "CnsU", func: null},
            {name: "ClsCns", func: null},
            {name: "ClsCnsD", func: null},

            // 3. Operator instructions
            {name: "Print", func: hhbc.Print},

            // 4. Control flow instructions
            //TODO
            // 5. Get instructions
            //TODO
            // 6. Isset, Empty and type querying instructions
            //TODO
            // 7. Mutator instructions
            //TODO
            // 8. Call instructions
            //TODO
            // 9. Member operations
            //TODO
            // 10. Member instructions
            //TODO
            // 11. Iterator instructions
            //TODO
            // 12. Include, eval, and define instructions
            //TODO
            // 13. Miscellaneous instructions
            //TODO
            // 14. Continuation creation and execution
            //TODO
      ]
    }
);