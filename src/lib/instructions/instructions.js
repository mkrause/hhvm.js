define([
    ], function() {
      return [
            { mnemonic: "LowInvalid", spec: [] },
            // 1. Basic instructions
            { mnemonic: "Nop", spec: [] },
            { mnemonic: "PopC", spec: [] },
            { mnemonic: "PopV", spec: [] },
            { mnemonic: "PopR", spec: [] },
            { mnemonic: "Dup", spec: [] },
            { mnemonic: "Box", spec: [] },
            { mnemonic: "Unbox", spec: [] },
            { mnemonic: "BoxR", spec: [] },
            { mnemonic: "UnboxR", spec: [] },

            // 2. Literal and constant instructions
            { mnemonic: "Null", spec: [] },
            { mnemonic: "True", spec: [] },
            { mnemonic: "False", spec: [] },
            { mnemonic: "NullUninit", spec: [] },
            { mnemonic: "Int", spec: [] },
            { mnemonic: "Double", spec: [] },
            { mnemonic: "String", spec: [] },
            { mnemonic: "Array", spec: [] },
            { mnemonic: "NewArray", spec: [] },
            { mnemonic: "NewPackedArray", spec: [] },
            { mnemonic: "AddElemC", spec: [] },
            { mnemonic: "AddElemV", spec: [] },
            { mnemonic: "AddNewElemC", spec: [] },
            { mnemonic: "AddNewElemV", spec: [] },
            { mnemonic: "NewCol", spec: [] },
            { mnemonic: "ColAddElemC", spec: [] },
            { mnemonic: "ColAddNewElemC", spec: [] },
            { mnemonic: "Cns", spec: [] },
            { mnemonic: "CnsE", spec: [] },
            { mnemonic: "CnsU", spec: [] },
            { mnemonic: "ClsCns", spec: [] },
            { mnemonic: "ClsCnsD", spec: [] },
            { mnemonic: "File"},
           	{ mnemonic: "Dir"},

            // 3. Operator instructions
            { mnemonic: "Concat"},
            { mnemonic: "Abs"},
            { mnemonic: "Add"},
            { mnemonic: "Sub"},
            { mnemonic: "Mul"},
            { mnemonic: "Div"},
            { mnemonic: "Mod"},
            { mnemonic: "Sqrt"},
            { mnemonic: "Xor"},
            { mnemonic: "Not"},
            { mnemonic: "Same"},
            { mnemonic: "NSame"},
            { mnemonic: "Eq"},
            { mnemonic: "Neq"},
            { mnemonic: "Lt"},
            { mnemonic: "Lte"},
            { mnemonic: "Gt"},
            { mnemonic: "Gte"},
            { mnemonic: "BitAnd"},
            { mnemonic: "BitOr"},
            { mnemonic: "BitXor"},
            { mnemonic: "BitNot"},
            { mnemonic: "Shl"},
            { mnemonic: "Shr"},
            { mnemonic: "Floor"},
            { mnemonic: "Ceil"},
            { mnemonic: "CastBool"},
            { mnemonic: "CastInt"},
            { mnemonic: "CastDouble"},
            { mnemonic: "CastString"},
            { mnemonic: "CastArray"},
            { mnemonic: "CastObject"},
            { mnemonic: "InstanceOf"},
            { mnemonic: "InstanceOfD"},
            { mnemonic: "Print", spec: [] },
            { mnemonic: "Clone"},
            { mnemonic: "Exit"},
            { mnemonic: "Fatal"},

            // 4. Control flow instructions
            { mnemonic: "Jmp", spec: [] },
            //TODO: implement missing functions
            
            // 5. Get instructions
            //TODO: implmeent missing funtions
            
            // 6. Isset, Empty and type querying instructions
            //TODO: implement missing functions
            
            // 7. Mutator instructions
            //TODO: implement missing functions
            
            // 8. Call instructions
            //TODO: implement missing functions
            
            // 9. Member operations
            //TODO: implement missing functions
            
            // 10. Member instructions
            //TODO: implement missing functions
            
            // 11. Iterator instructions
            //TODO: implement missing functions
            
            // 12. Include, eval, and define instructions
            //TODO: implement missing functions
            
            // 13. Miscellaneous instructions
            //TODO: implement missing functions
            
            // 14. Continuation creation and execution
            //TODO: implement missing functions
            
      ];
    }
);
