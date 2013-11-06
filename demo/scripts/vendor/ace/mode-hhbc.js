ace.define('ace/mode/hhbc', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/hhbc_highlight_rules'], function(require, exports, module) {
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var HhbcHighlightRules = require("./hhbc_highlight_rules").HhbcHighlightRules;

    var Mode = function(opts) {
        this.HighlightRules = HhbcHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.lineCommentStart = ["//", "#"];
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

ace.define('ace/mode/hhbc_highlight_rules', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) {
    var oop = require("../lib/oop");
    var lang = require("../lib/lang");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var HhbcHighlightRules = function() {
        var instructions = (
            "Abs|Add|AddElemC|AddElemV|AddNewElemC|AddNewElemV|AGetC|AGetL|" +
            "AKExists|Array|ArrayIdx|BareThis|BindG|BindL|BindM|BindN|BindS|" +
            "BitAnd|BitNot|BitOr|BitXor|Box|BoxR|CastArray|CastBool|CastDouble|" +
            "CastInt|CastObject|CastString|Catch|Ceil|CGetG|CGetL|CGetL2|CGetL3|" +
            "CGetM|CGetN|CGetS|CheckThis|CIterFree|ClassExists|Clone|ClsCns|" +
            "ClsCnsD|Cns|CnsE|CnsU|ColAddElemC|ColAddNewElemC|Concat|ContCheck|" +
            "ContCurrent|ContEnter|ContHandle|ContKey|ContRaise|ContRetC|" +
            "ContStopped|ContSuspend|ContSuspendK|ContValid|CreateAsync|" +
            "CreateCl|CreateCont|CufSafeArray|CufSafeReturn|DecodeCufIter|" +
            "DefCls|DefCns|DefFunc|DefTypeAlias|Dir|Div|Double|Dup|EmptyG|" +
            "EmptyL|EmptyM|EmptyN|EmptyS|Eq|Eval|Exit|False|Fatal|FCall|" +
            "FCallArray|FCallBuiltin|File|Floor|FPassC|FPassCE|FPassCW|FPassG|" +
            "FPassL|FPassM|FPassN|FPassR|FPassS|FPassV|FPushClsMethod|" +
            "FPushClsMethodD|FPushClsMethodF|FPushCtor|FPushCtorD|FPushCuf|" +
            "FPushCufF|FPushCufIter|FPushCufSafe|FPushFunc|FPushFuncD|" +
            "FPushFuncU|FPushObjMethod|FPushObjMethodD|Gt|Gte|IncDecG|IncDecL|" +
            "IncDecM|IncDecN|IncDecS|Incl|InclOnce|IncStat|InitThisLoc|" +
            "InstanceOf|InstanceOfD|Int|InterfaceExists|IsArrayC|IsArrayL|" +
            "IsBoolC|IsBoolL|IsDoubleC|IsDoubleL|IsIntC|IsIntL|IsNullC|IsNullL|" +
            "IsObjectC|IsObjectL|IssetG|IssetL|IssetM|IssetN|IssetS|IsStringC|" +
            "IsStringL|IterBreak|IterFree|IterInit|IterInitK|IterNext|IterNextK|" +
            "Jmp|JmpNZ|JmpZ|LateBoundCls|Lt|Lte|MIterFree|MIterInit|MIterInitK|" +
            "MIterNext|MIterNextK|Mod|Mul|NativeImpl|Neq|NewArray|NewCol|" +
            "NewPackedArray|Nop|Not|NSame|Null|NullUninit|Parent|PopC|PopR|PopV|" +
            "Print|Req|ReqDoc|ReqOnce|RetC|RetV|Same|Self|SetG|SetL|SetM|SetN|" +
            "SetOpG|SetOpL|SetOpM|SetOpN|SetOpS|SetS|SetWithRefLM|SetWithRefRM|" +
            "Shl|Shr|Sqrt|SSwitch|StaticLoc|StaticLocInit|String|Strlen|Sub|" +
            "Switch|This|Throw|TraitExists|True|Unbox|UnboxR|UnpackCont|UnsetG|" +
            "UnsetL|UnsetM|UnsetN|Unwind|VerifyParamType|VGetG|VGetL|VGetM|" +
            "VGetN|VGetS|WIterInit|WIterInitK|WIterNext|WIterNextK|Xor"
        );

        var keywordMapper = this.createKeywordMapper({
            "support.function.instruction": instructions
        }, "identifier");
        
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        this.$rules = {
            start: [
                { token: 'constant.numeric.decimal', regex: '[+-]?[0-9]+(?:\\.[0-9]+)?\\b' },
                { token: 'constant.numeric.hexadecimal', regex: '0x[A-F0-9]+\\b' },
                { token : keywordMapper, regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b" },
                { token: 'string.quoted.single',  regex: /'([^\\']|\\.)*'/ },
                { token: 'string.quoted.double',  regex: /"([^\\"]|\\.)*"/ },
                { token: 'comment.line.number-sign', regex: '#.*$' },
                { token: 'comment.line.double-slash', regex: '\\/\\/.*$' }
            ]
        };
        
        this.normalizeRules();
    };

    HhbcHighlightRules.metaData = {
        fileTypes: [ 'hhbc' ],
        name: 'HipHop Bytecode'
    };

    oop.inherits(HhbcHighlightRules, TextHighlightRules);
    exports.HhbcHighlightRules = HhbcHighlightRules;
});
