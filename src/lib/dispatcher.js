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

        Dispatcher.prototype.getFPI = function(func, numParameters) {
          // TODO: check if function exists in meta data
          return new FPI(func, numParameters);
        };
        
        return Dispatcher;
    }
);
