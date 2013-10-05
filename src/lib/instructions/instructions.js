define([
        'lib/hhbc'
    ], function(hhbc) {
      return [
            {name: "LowInvalid", func: null},
            // 1. Basic instructions
            {name: "Nop", func: hhbc.Nop},
            {name: "PopC", func: hhbc.PopC},
            {name: "PopV", func: hhbc.PopV},
            {name: "PopR", func: hhbc.PopR},
            {name: "Dup", func: hhbc.Dup},
            {name: "Box", func: hhbc.Box},
            {name: "Unbox", func: hhbc.Unbox},
            {name: "BoxR", func: hhbc.BoxR},
            {name: "UnboxR", func: hhbc.UnboxR},

            // 2. Literal and constant instructions
            {name: "Null", func: hhbc.Null},
            {name: "True", func: hhbc.True},
            {name: "False", func: hhbc.False},
            {name: "NullUninit", func: hhbc.NullUninit},
            {name: "Int", func: hhbc.Int},
            {name: "Double", func: hhbc.Double},
            {name: "String", func: hhbc.String},
            {name: "Array", func: hhbc.Array},
            {name: "NewArray", func: hhbc.NewArray},
            {name: "NewPackedArray", func: hhbc.NewPackedArray},
            {name: "AddElemC", func: hhbc.AddElemC},
            {name: "AddElemV", func: hhbc.AddElemV},
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