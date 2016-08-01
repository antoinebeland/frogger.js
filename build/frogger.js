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
        var ImageLoader = (function () {
            function ImageLoader(baseResourcesPath) {
                this.onLoadingCompleted = new Event();
                this.loader = PIXI.loader;
                this.baseResourcesPath = baseResourcesPath;
                var self = this;
                this.loader.once("complete", function () {
                    self.onLoadingCompleted.invoke();
                });
            }
            ImageLoader.prototype.register = function (element) {
                if (element instanceof Array) {
                    for (var i = 0; i < element.length; ++i) {
                        this.registerSingleElement(element[i]);
                    }
                }
                else {
                    this.registerSingleElement(element);
                }
            };
            ImageLoader.prototype.get = function (name) {
                if (!this.loader.resources[name]) {
                    throw "ERROR: The \"" + name + "\" doesn't exist in the resources.";
                }
                return this.loader.resources[name].texture;
            };
            ImageLoader.prototype.load = function () {
                this.loader.load();
            };
            ImageLoader.prototype.registerSingleElement = function (name) {
                this.loader.add(name, this.baseResourcesPath + "/" + name + ".png");
            };
            return ImageLoader;
        }());
        Graphics.ImageLoader = ImageLoader;
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
                this.width = width;
                this.height = height;
                this.renderer = new PIXI.WebGLRenderer(width, height);
                document.body.appendChild(this.renderer.view);
                this.stage = new PIXI.Container();
            }
            Scene.prototype.addChild = function (object) {
                if (object instanceof PIXI.Sprite) {
                    this.stage.addChild(object);
                }
                else {
                    this.stage.addChild(object.getSprite());
                }
            };
            Scene.prototype.removeChild = function (sprite) {
                this.stage.removeChild(sprite);
            };
            Scene.prototype.getWidth = function () {
                return this.width;
            };
            Scene.prototype.getHeight = function () {
                return this.height;
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
    var Game;
    (function (Game) {
        var Objects;
        (function (Objects) {
            var Frog = (function () {
                function Frog(imageLoader) {
                    this.keyUpTexture = imageLoader.get("frog");
                    this.keyDownTexture = imageLoader.get("frog-2");
                    this.sprite = new PIXI.Sprite(this.keyUpTexture);
                    var self = this;
                    this.onKeyPressedDown = function (event) {
                        self.sprite.texture = self.keyDownTexture;
                    };
                    this.onKeyPressedUp = function (event) {
                        self.sprite.texture = self.keyUpTexture;
                        switch (event.keyCode) {
                            case 37:
                                self.sprite.position.x -= 75;
                                break;
                            case 38:
                                self.sprite.position.y -= 75;
                                break;
                            case 39:
                                self.sprite.position.x += 75;
                                break;
                            case 40:
                                self.sprite.position.y += 75;
                                break;
                        }
                    };
                }
                Frog.prototype.getSprite = function () {
                    return this.sprite;
                };
                return Frog;
            }());
            Objects.Frog = Frog;
        })(Objects = Game.Objects || (Game.Objects = {}));
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
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
    var Game;
    (function (Game) {
        var Frog = FroggerJS.Game.Objects.Frog;
        var Event = Utils.Event;
        var Logger = Utils.Logger;
        var TilingSprite = PIXI.extras.TilingSprite;
        var GameManager = (function () {
            function GameManager(imageLoader, scene) {
                this.onGameOver = new Event();
                this.onNextLevel = new Event();
                this.scene = scene;
                this.imageLoader = imageLoader;
                this.frog = new Frog(imageLoader);
            }
            GameManager.prototype.loadLevel = function (levelConfiguration) {
                Logger.logMessage("Initialize level " + levelConfiguration["level"] + "...");
                var list = [
                    "grass",
                    "water",
                    "water",
                    "grass",
                    "road",
                    "road",
                    "road",
                    "grass"
                ];
                for (var i = 0; i < list.length; ++i) {
                    var tilingSprite = new TilingSprite(this.imageLoader.get(list[i]), this.scene.getWidth(), 75);
                    tilingSprite.position.y = i * 75;
                    this.scene.addChild(tilingSprite);
                }
                this.scene.addChild(this.frog);
                document.addEventListener("keydown", this.frog.onKeyPressedDown);
                document.addEventListener("keyup", this.frog.onKeyPressedUp);
                this.scene.onRender.register(this.update);
            };
            GameManager.prototype.clearLevel = function () {
                document.removeEventListener("keydown", this.frog.onKeyPressedDown);
                document.removeEventListener("keyup", this.frog.onKeyPressedUp);
                this.scene.onRender.unregister(this.update);
            };
            GameManager.prototype.update = function () {
            };
            return GameManager;
        }());
        Game.GameManager = GameManager;
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
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
        var Logger = Utils.Logger;
        var MainMenuState = (function () {
            function MainMenuState(stateManager) {
                this.stateManager = stateManager;
                var self = this;
                this.startGame = function () {
                    self.stateManager.change("level1");
                };
            }
            MainMenuState.prototype.entered = function () {
                Logger.logMessage("Entered in 'Main Menu State'.");
                document.querySelector("#button").addEventListener('click', this.startGame);
            };
            MainMenuState.prototype.leaving = function () {
                document.querySelector("#button").removeEventListener('click', this.startGame);
                Logger.logMessage("Leaving the 'Main Menu State'.");
            };
            return MainMenuState;
        }());
        States.MainMenuState = MainMenuState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var States;
    (function (States) {
        var Logger = Utils.Logger;
        var GameLevelState = (function () {
            function GameLevelState(gameLevelManager, levelConfiguration, stateManager) {
                this.gameLevelManager = gameLevelManager;
                this.levelConfiguration = levelConfiguration;
                this.stateManager = stateManager;
            }
            GameLevelState.prototype.entered = function () {
                Logger.logMessage("Entered in 'Game Level " + this.levelConfiguration["level"] + " State'.");
                this.gameLevelManager.onGameOver.register(this.gameOverOccurred);
                this.gameLevelManager.onNextLevel.register(this.nextLevelOccurred);
                this.gameLevelManager.loadLevel(this.levelConfiguration);
            };
            GameLevelState.prototype.leaving = function () {
                this.gameLevelManager.onGameOver.unregister(this.gameOverOccurred);
                this.gameLevelManager.onNextLevel.unregister(this.nextLevelOccurred);
                this.gameLevelManager.clearLevel();
                Logger.logMessage("Leaving the 'Game Level " + this.levelConfiguration["level"] + " State'.");
            };
            GameLevelState.prototype.gameOverOccurred = function () {
                this.stateManager.change("endGame");
            };
            GameLevelState.prototype.nextLevelOccurred = function () {
                var nextLevel = this.levelConfiguration["level"] + 1;
                if (this.levelConfiguration["levelsCount"] >= nextLevel) {
                    this.stateManager.change("endGame");
                }
                else {
                    this.stateManager.change("level" + nextLevel);
                }
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
                Logger.logMessage("Entered in 'End Game State'.");
            };
            EndGameState.prototype.leaving = function () {
                Logger.logMessage("Leaving the 'End Game State'.");
            };
            return EndGameState;
        }());
        States.EndGameState = EndGameState;
    })(States = FroggerJS.States || (FroggerJS.States = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var GraphicsLoader = FroggerJS.Graphics.ImageLoader;
    var Scene = FroggerJS.Graphics.Scene;
    var GameLevelManager = FroggerJS.Game.GameManager;
    var StateManager = FroggerJS.States.StateManager;
    var MainMenuState = FroggerJS.States.MainMenuState;
    var GameLevelState = FroggerJS.States.GameLevelState;
    var EndGameState = FroggerJS.States.EndGameState;
    var Logger = Utils.Logger;
    var LogLevel = Utils.LogLevel;
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
                var scene = new Scene(800, 600);
                var gameLevelManager = new GameLevelManager(loader, scene);
                var stateManager = new StateManager();
                stateManager.register("mainMenu", new MainMenuState(stateManager));
                stateManager.register("level1", new GameLevelState(gameLevelManager, { level: 1, levelsCount: 2 }, stateManager));
                stateManager.register("level2", new GameLevelState(gameLevelManager, { level: 2, levelsCount: 2 }, stateManager));
                stateManager.register("endGame", new EndGameState());
                stateManager.change("mainMenu");
                scene.render();
            });
            loader.load();
        };
        App.resources = [
            "frog",
            "frog-2",
            "boat",
            "grass",
            "water",
            "road"
        ];
        return App;
    }());
    FroggerJS.App = App;
})(FroggerJS || (FroggerJS = {}));
FroggerJS.App.initialize();
//# sourceMappingURL=frogger.js.map