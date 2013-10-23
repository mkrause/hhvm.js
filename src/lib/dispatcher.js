define([
        'vendor/underscore',
        'lib/frame',
        'lib/fpi'
    ], function(_, Frame, FPI) {
        var Dispatcher = function(vm) {
            this.vm = vm;
        };

        // Push initial frames
        Dispatcher.prototype.initialize = function() {
            // Push application frame
            var appmeta = { name: "Application", base: 0, localNames: [] };
            this.pushFrame(new Frame(new FPI(appmeta)));

            // Push pseudo-main frame
            this.pushFrame(new Frame(this.getFPI("", 0)));
        };
        
        // Push new activation frame
        Dispatcher.prototype.pushFrame = function(frame) {
            this.vm.callStack.push(frame);
            this.vm.currentFrame = frame;
            this.vm.stack = frame.stack;
            this.vm.FPIstack = frame.FPIstack;
        };
        
        // Pop top activation frame
        Dispatcher.prototype.popFrame = function() {
            var prevFrame = this.vm.callStack.pop();
            this.vm.currentFrame = this.vm.callStack.peek();
            this.vm.stack = this.vm.currentFrame.stack;
            this.vm.FPIstack = this.vm.currentFrame.FPIstack;
            return prevFrame;
        };
        
        // Transfer control to new frame
        Dispatcher.prototype.functionCall = function(fpi, parameters) {
            this.pushFrame(new Frame(fpi, parameters));
        };
        
        // Transfer control back to previous frame
        Dispatcher.prototype.functionReturn = function() {
            var frame = this.popFrame();
            this.vm.stack.push(frame.stack.pop());
            // TODO: assert that frame.stack is empty
        };

        Dispatcher.prototype.getFPI = function(functionName, numParameters) {
            // TODO: retrieve metadata from program
            //var meta = this.vm.prog.getFunctionByName(funcName);
            //if (meta === undefined)
            //    return undefined;
            var meta = { name: functionName, base: 0, localNames: [] };

            return new FPI(meta, numParameters);
        };
        
        return Dispatcher;
    }
);
