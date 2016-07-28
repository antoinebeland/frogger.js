var Utils;
(function (Utils) {
    (function (LogLevel) {
        LogLevel[LogLevel["Debug"] = 1] = "Debug";
        LogLevel[LogLevel["Info"] = 2] = "Info";
        LogLevel[LogLevel["Warning"] = 3] = "Warning";
        LogLevel[LogLevel["Error"] = 4] = "Error";
    })(Utils.LogLevel || (Utils.LogLevel = {}));
    var LogLevel = Utils.LogLevel;
    var Logger = (function () {
        function Logger() {
        }
        Logger.logMessage = function (message, logLevel) {
            if (logLevel === void 0) { logLevel = LogLevel.Debug; }
            if (Logger.activeLogLevel > logLevel) {
                return;
            }
            switch (logLevel) {
                case LogLevel.Debug:
                    console.log("Debug: " + message);
                    break;
                case LogLevel.Info:
                    console.info("Info: " + message);
                    break;
                case LogLevel.Warning:
                    console.warn("Warning: " + message);
                    break;
                case LogLevel.Error:
                    console.error("Error:" + message);
            }
        };
        Logger.activeLogLevel = LogLevel.Debug;
        return Logger;
    }());
    Utils.Logger = Logger;
})(Utils || (Utils = {}));
var FroggerJS;
(function (FroggerJS) {
    var Logger = Utils.Logger;
    var LogLevel = Utils.LogLevel;
    var App = (function () {
        function App() {
        }
        App.initialize = function () {
            Logger.activeLogLevel = LogLevel.Debug;
            Logger.logMessage("Initialize Frogger.js...");
        };
        App.resources = [
            "frog",
            "boat"
        ];
        return App;
    }());
    FroggerJS.App = App;
})(FroggerJS || (FroggerJS = {}));
FroggerJS.App.initialize();
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var StateManager = (function () {
            function StateManager() {
                this.isUpdatableState = false;
            }
            StateManager.prototype.change = function (nextState) {
                if (this.currentState) {
                    this.currentState.leaving();
                }
                this.currentState = nextState;
                this.currentState.entered();
                this.isUpdatableState = this.currentState.hasOwnProperty("update");
            };
            StateManager.prototype.getCurrent = function () {
                return this.currentState;
            };
            StateManager.prototype.update = function () {
                if (this.isUpdatableState) {
                    this.currentState.update();
                }
            };
            return StateManager;
        }());
        States.StateManager = StateManager;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var EndGameState = (function () {
            function EndGameState() {
            }
            EndGameState.prototype.entered = function () {
            };
            EndGameState.prototype.leaving = function () {
            };
            return EndGameState;
        }());
        States.EndGameState = EndGameState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var InGameState = (function () {
            function InGameState() {
            }
            InGameState.prototype.entered = function () {
            };
            InGameState.prototype.update = function () {
            };
            InGameState.prototype.leaving = function () {
            };
            return InGameState;
        }());
        States.InGameState = InGameState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var MenuState = (function () {
            function MenuState() {
            }
            MenuState.prototype.entered = function () {
            };
            MenuState.prototype.leaving = function () {
            };
            return MenuState;
        }());
        States.MenuState = MenuState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var Utils;
(function (Utils) {
    var Event = (function () {
        function Event() {
            this.handlers = [];
        }
        Event.prototype.register = function (handler) {
            this.handlers.push(handler);
        };
        Event.prototype.unregister = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        Event.prototype.invoke = function (data) {
            this.handlers.slice(0).forEach(function (h) { return h(data); });
        };
        return Event;
    }());
    Utils.Event = Event;
})(Utils || (Utils = {}));
//# sourceMappingURL=frogger.js.map