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
var FroggerJS;
(function (FroggerJS) {
    var Graphics;
    (function (Graphics) {
        var Event = Utils.Event;
        var GraphicsLoader = (function () {
            function GraphicsLoader(baseResourcesPath) {
                this.onLoadingCompleted = new Event();
                this.loader = PIXI.loader;
                this.baseResourcesPath = baseResourcesPath;
                var self = this;
                this.loader.once("complete", function () {
                    self.onLoadingCompleted.invoke();
                });
            }
            GraphicsLoader.prototype.register = function (element) {
                if (element instanceof Array) {
                    for (var i = 0; i < element.length; ++i) {
                        this.registerSingleElement(element[i]);
                    }
                }
                else {
                    this.registerSingleElement(element);
                }
            };
            GraphicsLoader.prototype.get = function () {
            };
            GraphicsLoader.prototype.load = function () {
                this.loader.load();
            };
            GraphicsLoader.prototype.registerSingleElement = function (name) {
                this.loader.add(name, this.baseResourcesPath + "/" + name + ".png");
            };
            return GraphicsLoader;
        }());
        Graphics.GraphicsLoader = GraphicsLoader;
    })(Graphics = FroggerJS.Graphics || (FroggerJS.Graphics = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Graphics;
    (function (Graphics) {
        var Event = Utils.Event;
        var Scene = (function () {
            function Scene(width, height) {
                this.onRender = new Event();
                this.renderer = new PIXI.WebGLRenderer(width, height);
                document.body.appendChild(this.renderer.view);
                this.stage = new PIXI.Container();
            }
            Scene.prototype.addChild = function (sprite) {
            };
            Scene.prototype.removeChild = function (sprite) {
            };
            Scene.prototype.render = function () {
                var self = this;
                function animate() {
                    requestAnimationFrame(animate);
                    self.onRender.invoke();
                    self.renderer.render(self.stage);
                }
                animate();
            };
            return Scene;
        }());
        Graphics.Scene = Scene;
    })(Graphics = FroggerJS.Graphics || (FroggerJS.Graphics = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var StateManager = (function () {
            function StateManager() {
                this.states = {};
            }
            StateManager.prototype.register = function (name, state) {
                this.states[name] = state;
            };
            StateManager.prototype.change = function (name) {
                if (!(name in this.states)) {
                    throw "ERROR: The specified name for the state doesn't exist.";
                }
                var nextState = this.states[name];
                if (this.currentState) {
                    this.currentState.leaving();
                }
                this.currentState = nextState;
                this.currentState.entered();
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
        var MainMenuState = (function () {
            function MainMenuState(stateManager) {
                this.stateManager = stateManager;
            }
            MainMenuState.prototype.entered = function () {
            };
            MainMenuState.prototype.leaving = function () {
            };
            MainMenuState.prototype.startGame = function () {
                this.stateManager.change("level1");
            };
            return MainMenuState;
        }());
        States.MainMenuState = MainMenuState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
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
                    console.log("[DEBUG] " + message);
                    break;
                case LogLevel.Info:
                    console.info("[INFO] " + message);
                    break;
                case LogLevel.Warning:
                    console.warn("[WARNING] " + message);
                    break;
                case LogLevel.Error:
                    console.error("[ERROR] " + message);
            }
        };
        Logger.activeLogLevel = LogLevel.Debug;
        return Logger;
    }());
    Utils.Logger = Logger;
})(Utils || (Utils = {}));
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var Logger = Utils.Logger;
        var GameLevelState = (function () {
            function GameLevelState(scene, levelConfiguration, stateManager) {
                this.currentLevel = 0;
                this.scene = scene;
            }
            GameLevelState.prototype.entered = function () {
                Logger.logMessage("Entered in GameLevelState.");
                this.scene.onRender.register(this.update);
            };
            GameLevelState.prototype.leaving = function () {
                this.scene.onRender.unregister(this.update);
                Logger.logMessage("Leaving in GameLevelState.");
            };
            GameLevelState.prototype.update = function () {
            };
            GameLevelState.prototype.gameOverOccurred = function () {
                this.stateManager.change("endGame");
            };
            GameLevelState.prototype.nextLevelOccurred = function () {
                this.stateManager.change("level");
            };
            return GameLevelState;
        }());
        States.GameLevelState = GameLevelState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var Logger = Utils.Logger;
        var EndGameState = (function () {
            function EndGameState() {
            }
            EndGameState.prototype.entered = function () {
                Logger.logMessage("Entered in EndGameState.");
            };
            EndGameState.prototype.leaving = function () {
                Logger.logMessage("Leaving in EndGameState.");
            };
            return EndGameState;
        }());
        States.EndGameState = EndGameState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Logger = Utils.Logger;
    var LogLevel = Utils.LogLevel;
    var GraphicsLoader = FroggerJS.Graphics.GraphicsLoader;
    var Scene = FroggerJS.Graphics.Scene;
    var StateManager = FroggerJS.States.StateManager;
    var MainMenuState = FroggerJS.States.MainMenuState;
    var GameLevelState = FroggerJS.States.GameLevelState;
    var EndGameState = FroggerJS.States.EndGameState;
    var App = (function () {
        function App() {
        }
        App.initialize = function () {
            Logger.activeLogLevel = LogLevel.Debug;
            PIXI.utils._saidHello = true;
            Logger.logMessage("Initialize Frogger.js...", LogLevel.Info);
            Logger.logMessage("Loading resources...", LogLevel.Info);
            var loader = new GraphicsLoader("assets");
            loader.register(App.resources);
            loader.onLoadingCompleted.register(function () {
                Logger.logMessage("Resources loaded.", LogLevel.Info);
                Logger.logMessage("Initialize scene...", LogLevel.Info);
                var scene = new Scene(800, 600);
                var stateManager = new StateManager();
                stateManager.register("mainMenu", new MainMenuState(stateManager));
                stateManager.register("level1", new GameLevelState(scene, {}, stateManager));
                stateManager.register("level2", new GameLevelState(scene, {}, stateManager));
                stateManager.register("endGame", new EndGameState());
                stateManager.change("level1");
                Logger.logMessage("Scene initialized.", LogLevel.Info);
                scene.render();
            });
            loader.load();
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
    var Game;
    (function (Game) {
        var GameManager = (function () {
            function GameManager(gameConfiguration) {
            }
            return GameManager;
        }());
        Game.GameManager = GameManager;
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Graphics;
    (function (Graphics) {
        var Sprite = (function () {
            function Sprite() {
            }
            return Sprite;
        }());
        Graphics.Sprite = Sprite;
    })(Graphics = FroggerJS.Graphics || (FroggerJS.Graphics = {}));
})(FroggerJS || (FroggerJS = {}));
//# sourceMappingURL=frogger.js.map