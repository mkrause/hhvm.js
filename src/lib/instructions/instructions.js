define([
    ], function() {
      return [
            // Boundary
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
            { mnemonic: "NullUninit", spec: [] },
            { mnemonic: "True", spec: [] },
            { mnemonic: "False", spec: [] },
            { mnemonic: "Int", spec: ['int'] },
            { mnemonic: "Double", spec: ['double'] },
            { mnemonic: "String", spec: ['string'] },
            { mnemonic: "Array", spec: ['array'] },
            { mnemonic: "NewArray", spec: [] },
            { mnemonic: "NewPackedArray", spec: ['varInt'] },
            { mnemonic: "AddElemC", spec: [] },
            { mnemonic: "AddElemV", spec: [] },
            { mnemonic: "AddNewElemC", spec: [] },
            { mnemonic: "AddNewElemV", spec: [] },
            { mnemonic: "NewCol", spec: ['varInt', 'varInt'] },
            { mnemonic: "ColAddElemC", spec: [] },
            { mnemonic: "ColAddNewElemC", spec: [] },
            { mnemonic: "Cns", spec: ['string'] },
            { mnemonic: "CnsE", spec: ['string'] },
            { mnemonic: "CnsU", spec: ['string', 'string'] },
            { mnemonic: "ClsCns", spec: ['string'] },
            { mnemonic: "ClsCnsD", spec: ['string', 'string'] },
            { mnemonic: "File", spec: [] },
            { mnemonic: "Dir", spec: [] },

            // 3. Operator instructions
            { mnemonic: "Concat", spec: [] },
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
            { mnemonic: "CastBool", spec: [] },
            { mnemonic: "CastInt", spec: [] },
            { mnemonic: "CastDouble", spec: [] },
            { mnemonic: "CastString", spec: [] },
            { mnemonic: "CastArray", spec: [] },
            { mnemonic: "CastObject", spec: [] },
            { mnemonic: "InstanceOf", spec: [] },
            { mnemonic: "InstanceOfD", spec: ['string'] },
            { mnemonic: "Print", spec: [] },
            { mnemonic: "Clone", spec: [] },
            { mnemonic: "Exit", spec: [] },
            { mnemonic: "Fatal", spec: ['varInt'] },
            // Abs: see 99. Other/Abs
            // Ceil: see 99. Other/Ceil
            // Floor: see 99. Other/Floor
            // Strlen: see 99. Other/Strlen

            // 4. Control flow instructions
            { mnemonic: "Jmp", spec: ['byte'] },
            { mnemonic: "JmpZ", spec: ['byte'] },
            { mnemonic: "JmpNZ", spec: ['byte'] },
            { mnemonic: "Switch", spec: ['byteVector', 'int', 'varInt'] },
            { mnemonic: "SSwitch", spec: ['stringVector'] },
            { mnemonic: "RetC", spec: [] },
            { mnemonic: "RetV", spec: [] },
            { mnemonic: "Unwind", spec: [] },
            { mnemonic: "Throw", spec: [] },
            
            // 5. Get instructions
            { mnemonic: "CGetL", spec: ['varId']},
            { mnemonic: "CGetL2", spec: ['varId'] },
            { mnemonic: "CGetL3", spec: ['varId'] },
            { mnemonic: "CGetN", spec: [] },
            { mnemonic: "CGetG", spec: [] },
            { mnemonic: "CGetS", spec: [] },
            { mnemonic: "CGetM", spec: ['memberVector'] },
            { mnemonic: "VGetL", spec: ['varId'] },
            { mnemonic: "VGetN", spec: [] },
            { mnemonic: "VGetG", spec: [] },
            { mnemonic: "VGetS", spec: [] },
            { mnemonic: "VGetM", spec: ['memberVector'] },
            { mnemonic: "AGetC", spec: [] },
            { mnemonic: "AGetL", spec: ['varId'] },
            { mnemonic: "AKExists", spec: [] },
            
            // 6. Isset, Empty and type querying instructions
            // IssetC: deprecated?
            { mnemonic: "IssetL", spec: ['varId'] },
            { mnemonic: "IssetN", spec: [] },
            { mnemonic: "IssetG", spec: [] },
            { mnemonic: "IssetS", spec: [] },
            { mnemonic: "IssetM", spec: ['memberVector'] },
            { mnemonic: "EmptyL", spec: ['varId'] },
            { mnemonic: "EmptyN", spec: [] },
            { mnemonic: "EmptyG", spec: [] },
            { mnemonic: "EmptyS", spec: [] },
            { mnemonic: "EmptyM", spec: ['memberVector'] },
            { mnemonic: "IsNullC", spec: [] },
            { mnemonic: "IsBoolC", spec: [] },
            { mnemonic: "IsIntC", spec: [] },
            { mnemonic: "IsDoubleC", spec: [] },
            { mnemonic: "IsStringC", spec: [] },
            { mnemonic: "IsArrayC", spec: [] },
            { mnemonic: "IsObjectC", spec: [] },
            { mnemonic: "IsNullL", spec: ['varId'] },
            { mnemonic: "IsBoolL", spec: ['varId'] },
            { mnemonic: "IsIntL", spec: ['varId'] },
            { mnemonic: "IsDoubleL", spec: ['varId'] },
            { mnemonic: "IsStringL", spec: ['varId'] },
            { mnemonic: "IsArrayL", spec: ['varId'] },
            { mnemonic: "IsObjectL", spec: ['varId'] },
            
            // 7. Mutator instructions
            { mnemonic: "SetL", spec: ['varId'] },
            { mnemonic: "SetN", spec: [] },
            { mnemonic: "SetG", spec: [] },
            { mnemonic: "SetS", spec: [] },
            { mnemonic: "SetM", spec: ['memberVector'] },
            { mnemonic: "SetWithRefLM", spec: ['memberVector', 'varId'] },
            { mnemonic: "SetWithRefRM", spec: ['memberVector'] },
            { mnemonic: "SetOpL", spec: ['varId', 'subop'] },
            { mnemonic: "SetOpN", spec: ['subop'] },
            { mnemonic: "SetOpG", spec: ['subop'] },
            { mnemonic: "SetOpS", spec: ['subop'] },
            { mnemonic: "SetOpM", spec: ['subop', 'memberVector'] },
            { mnemonic: "IncDecL", spec: ['varId', 'subop'] },
            { mnemonic: "IncDecN", spec: ['subop'] },
            { mnemonic: "IncDecG", spec: ['subop'] },
            { mnemonic: "IncDecS", spec: ['subop'] },
            { mnemonic: "IncDecM", spec: ['subop', 'memberVector'] },
            { mnemonic: "BindL", spec: ['varId'] },
            { mnemonic: "BindN", spec: [] },
            { mnemonic: "BindG", spec: [] },
            { mnemonic: "BindS", spec: [] },
            { mnemonic: "BindM", spec: ['memberVector'] },
            { mnemonic: "UnsetL", spec: ['varId'] },
            { mnemonic: "UnsetN", spec: [] },
            { mnemonic: "UnsetG", spec: [] },
            { mnemonic: "UnsetM", spec: ['memberVector'] },
            
            // 8. Call instructions
            { mnemonic: "FPushFunc", spec: ['varInt'] },
            { mnemonic: "FPushFuncD", spec: ['varInt', 'string'] },
            { mnemonic: "FPushFuncU", spec: ['varInt', 'string', 'string'] },
            { mnemonic: "FPushObjMethod", spec: ['varInt'] },
            { mnemonic: "FPushObjMethodD", spec: ['varInt', 'string'] },
            { mnemonic: "FPushClsMethod", spec: ['varInt'] },
            { mnemonic: "FPushClsMethodF", spec: ['varInt'] },
            { mnemonic: "FPushClsMethodD", spec: ['varInt', 'string', 'string'] },
            { mnemonic: "FPushCtor", spec: ['varInt'] },
            { mnemonic: "FPushCtorD", spec: ['varInt', 'string'] },
            { mnemonic: "FPushCufIter", spec: ['varInt', 'iterId'] },
            { mnemonic: "FPushCuf", spec: ['varInt'] },
            { mnemonic: "FPushCufF", spec: ['varInt'] },
            { mnemonic: "FPushCufSafe", spec: ['varInt'] },
            { mnemonic: "FPassC", spec: ['varInt'] },
            { mnemonic: "FPassCW", spec: ['varInt'] },
            { mnemonic: "FPassCE", spec: ['varInt'] },
            { mnemonic: "FPassV", spec: ['varInt'] },
            { mnemonic: "FPassR", spec: ['varInt'] },
            { mnemonic: "FPassL", spec: ['varInt', 'varId'] },
            { mnemonic: "FPassN", spec: ['varInt'] },
            { mnemonic: "FPassG", spec: ['varInt'] },
            { mnemonic: "FPassS", spec: ['varInt'] },
            { mnemonic: "FPassM", spec: ['varInt', 'memberVector'] },
            { mnemonic: "FCall", spec: ['varInt'] },
            { mnemonic: "FCallArray", spec: [] },
            { mnemonic: "FCallBuiltin", spec: ['varInt', 'varInt', 'string'] },
            { mnemonic: "CufSafeArray", spec: [] },
            { mnemonic: "CufSafeReturn", spec: [] },
            
            // 9. Member operations
            // Member operations are shared across the Member instructions. Operations are not
            // considered instructions; they do not have opcodes associated with them.
            
            // 10. Member instructions
            // CGetM: see 5. Get/CGetM
            // VGetM: see 5. Get/VGetM
            // FPassM: see 8. Call/FPassM
            // IssetM: see 6. Isset/IssetM
            // EmptyM: see 6. Isset/EmptyM
            // SetM: see 7. Mutator/SetM
            // SetWithRefLM: see 7. Mutator/SetWithRefLM
            // SetWithRefRM: see 7. Mutator/SetWithRefRM
            // SetOpM: see 7. Mutator/SetOpM
            // IncDecM: see 7. Mutator/IncDecM
            // BindM: see 7. Mutator/BindM
            // UnsetM: see 7. Mutator/UnsetM
            
            // 11. Iterator instructions
            { mnemonic: "IterInit", spec: ['iterId', 'byte', 'varId'] },
            { mnemonic: "MIterInit", spec: ['iterId', 'byte', 'varId'] },
            { mnemonic: "WIterInit", spec: ['iterId', 'byte', 'varId'] },
            { mnemonic: "IterInitK", spec: ['iterId', 'byte', 'varId', 'varId'] },
            { mnemonic: "MIterInitK", spec: ['iterId', 'byte', 'varId', 'varId'] },
            { mnemonic: "WIterInitK", spec: ['iterId', 'byte', 'varId', 'varId'] },
            { mnemonic: "IterNext", spec: ['iterId', 'byte', 'varId'] },
            { mnemonic: "MIterNext", spec: ['iterId', 'byte', 'varId'] },
            { mnemonic: "WIterNext", spec: ['iterId', 'byte', 'varId'] },
            { mnemonic: "IterNextK", spec: ['iterId', 'byte', 'varId', 'varId'] },
            { mnemonic: "MIterNextK", spec: ['iterId', 'byte', 'varId', 'varId'] },
            { mnemonic: "WIterNextK", spec: ['iterId', 'byte', 'varId', 'varId'] },
            { mnemonic: "DecodeCufIter", spec: ['iterId', 'byte'] },
            { mnemonic: "IterFree", spec: ['iterId'] },
            { mnemonic: "MIterFree", spec: ['iterId'] },
            { mnemonic: "CIterFree", spec: ['iterId'] },
            { mnemonic: "IterBreak", spec: ['iterVector', 'byte'] },
            
            // 12. Include, eval, and define instructions
            { mnemonic: "Incl", spec: [] },
            { mnemonic: "InclOnce", spec: [] },
            { mnemonic: "Req", spec: [] },
            { mnemonic: "ReqOnce", spec: [] },
            { mnemonic: "ReqDoc", spec: [] },
            { mnemonic: "Eval", spec: [] },
            { mnemonic: "DefFunc", spec: ['varInt'] },
            { mnemonic: "DefCls", spec: ['varInt'] },
            { mnemonic: "DefCns", spec: ['string'] },
            { mnemonic: "DefTypeAlias", spec: ['varInt'] },
            
            // 13. Miscellaneous instructions
            { mnemonic: "This", spec: [] },
            { mnemonic: "BareThis", spec: ['subop'] },
            { mnemonic: "CheckThis", spec: [] },
            { mnemonic: "InitThisLoc", spec: ['varInt'] },
            { mnemonic: "StaticLoc", spec: ['varInt', 'string'] },
            { mnemonic: "StaticLocInit", spec: ['varInt', 'string'] },
            { mnemonic: "Catch", spec: [] },
            { mnemonic: "ClassExists", spec: [] },
            { mnemonic: "InterfaceExists", spec: [] },
            { mnemonic: "TraitExists", spec: [] },
            { mnemonic: "VerifyParamType", spec: ['varInt'] },
            { mnemonic: "Self", spec: [] },
            { mnemonic: "Parent", spec: [] },
            { mnemonic: "LateBoundCls", spec: [] },
            { mnemonic: "NativeImpl", spec: [] },
            { mnemonic: "CreateCl", spec: ['varInt', 'string'] },
            // IncStat: see 99. Other/IncStat
            // AKExists: see 99. Other/AKExists
            // ArrayIdx: see 99. Other/ArrayIdx
            
            // 14. Continuation creation and execution
            { mnemonic: "CreateCont", spec: ['string'] },
            { mnemonic: "CreateAsync", spec: ['string', 'varInt', 'varInt'] },
            { mnemonic: "ContEnter", spec: [] },
            { mnemonic: "UnpackCont", spec: [] },
            { mnemonic: "ContSuspend", spec: ['varInt'] },
            { mnemonic: "ContSuspendK", spec: ['varInt'] },
            { mnemonic: "ContRetC", spec: [] },
            { mnemonic: "ContCheck", spec: ['varInt'] },
            { mnemonic: "ContRaise", spec: [] },
            { mnemonic: "ContValid", spec: [] },
            { mnemonic: "ContKey", spec: [] },
            { mnemonic: "ContCurrent", spec: [] },
            { mnemonic: "ContStopped", spec: [] },
            { mnemonic: "ContHandle", spec: [] },

            // 99. Other
            { mnemonic: "Strlen", spec: [] },
            { mnemonic: "IncStat", spec: ['varInt','varInt'] },
            { mnemonic: "Abs", spec: [] },
            { mnemonic: "ArrayIdx", spec: [] },
            { mnemonic: "Floor", spec: [] },
            { mnemonic: "Ceil", spec: [] },

            // Boundary
            { mnemonic: "HighInvalid", spec: [] },
            
      ];
    }
);
