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
            { mnemonic: "Int", spec: ['int'] },
            { mnemonic: "Double", spec: [] },
            { mnemonic: "String", spec: [] },
            { mnemonic: "Array", spec: ['array'] },
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
            { mnemonic: "File", spec: [] },
            { mnemonic: "Dir", spec: [] },

            // 3. Operator instructions
            { mnemonic: "Concat", spec: [] },
            { mnemonic: "Abs", spec: [] },
            { mnemonic: "Add", spec: [] },
            { mnemonic: "Sub", spec: [] },
            { mnemonic: "Mul", spec: [] },
            { mnemonic: "Div", spec: [] },
            { mnemonic: "Mod", spec: [] },
            { mnemonic: "Sqrt", spec: [] },
            { mnemonic: "Xor", spec: [] },
            { mnemonic: "Not", spec: [] },
            { mnemonic: "Same", spec: [] },
            { mnemonic: "NSame", spec: [] },
            { mnemonic: "Eq", spec: [] },
            { mnemonic: "Neq", spec: [] },
            { mnemonic: "Lt", spec: [] },
            { mnemonic: "Lte", spec: [] },
            { mnemonic: "Gt", spec: [] },
            { mnemonic: "Gte", spec: [] },
            { mnemonic: "BitAnd", spec: [] },
            { mnemonic: "BitOr", spec: [] },
            { mnemonic: "BitXor", spec: [] },
            { mnemonic: "BitNot", spec: [] },
            { mnemonic: "Shl", spec: [] },
            { mnemonic: "Shr", spec: [] },
            { mnemonic: "Floor", spec: [] },
            { mnemonic: "Ceil", spec: [] },
            { mnemonic: "CastBool", spec: [] },
            { mnemonic: "CastInt", spec: [] },
            { mnemonic: "CastDouble", spec: [] },
            { mnemonic: "CastString", spec: [] },
            { mnemonic: "CastArray", spec: [] },
            { mnemonic: "CastObject", spec: [] },
            { mnemonic: "InstanceOf", spec: [] },
            { mnemonic: "InstanceOfD", spec: [] },
            { mnemonic: "Print", spec: [] },
            { mnemonic: "Clone", spec: [] },
            { mnemonic: "Exit", spec: [] },
            { mnemonic: "Fatal", spec: [] },

            // 4. Control flow instructions
            { mnemonic: "Jmp", spec: ['byte'] },
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
