define([
        'vendor/underscore',
        'lib/frame',
        'lib/fpi'
    ], function(_, Frame, FPI) {
        var Dispatcher = function(vm) {
            this.vm = vm;
        };

        // Push initial frames: application and pseudo-main frame
        Dispatcher.prototype.initialize = function() {
            this.pushFrame(new Frame(new FPI("Application"), []));
            this.pushFrame(new Frame(new FPI("Pseudo-main"), []));
            // TODO: implement frame above as static vars in FPI file?
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
        Dispatcher.prototype.functionCall = function() {
            var fpi = this.vm.FPIstack.peek();
            var params = this.popParameters(fpi.numParameters);
            var frame = new Frame(fpi, params);
            this.pushFrame(frame);
        };
        
        // Transfer control back to previous frame
        Dispatcher.prototype.functionReturn = function() {
            var frame = this.popFrame();
            this.vm.stack.push(frame.stack.pop());
            // TODO: assert that frame.stack is empty
        };
        
        // Pop numParams parameters from the stack
        Dispatcher.prototype.popParameters = function(numParameters) {
            var parameters = new Array(numParameters);
            _(numParameters).times(function(n) {
                parameters.push(this.vm.stack.pop());
            });
            return parameters.reverse();
        };
        
        return Dispatcher;
    }
);
