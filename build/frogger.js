var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FroggerJS;
(function (FroggerJS) {
    FroggerJS.Constants = {
        TILE_SIZE: 60,
        ASSET_SIZE: 120,
        WINDOW_WIDTH: 780,
        WINDOW_HEIGHT: 600,
        DISPLAY_BOUNDING: true
    };
    FroggerJS.Levels = [
        [
            { texture: "grass-water-top", touchAllowed: true },
            { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
            { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 1.5 } },
            { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
            { texture: "grass-water-bottom", touchAllowed: true },
            { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1 } },
            { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1.5 } },
            { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1.5 } },
            { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1 } },
            { texture: "grass", touchAllowed: true }
        ]
    ];
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
                this.stage = new PIXI.Container();
                this.renderer = PIXI.autoDetectRenderer(width, height, {
                    resolution: window.devicePixelRatio
                });
                this.resize();
                document.body.appendChild(this.renderer.view);
                window.addEventListener("resize", this.resize.bind(this));
            }
            Scene.prototype.addChild = function (object, scaleToApply) {
                if (scaleToApply === void 0) { scaleToApply = 1; }
                var sprite = (object instanceof PIXI.DisplayObject) ? object : object.getDisplayObject();
                sprite.scale.x = scaleToApply;
                sprite.scale.y = scaleToApply;
                this.stage.addChild(sprite);
            };
            Scene.prototype.removeChild = function (object) {
                var sprite = (object instanceof PIXI.DisplayObject) ? object : object.getDisplayObject();
                this.stage.removeChild(sprite);
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
            Scene.prototype.resize = function () {
                var ratio = Math.min(window.innerWidth / this.width, window.innerHeight / this.height);
                this.stage.scale.x = this.stage.scale.y = ratio;
                this.renderer.resize(Math.ceil(this.width * ratio), Math.ceil(this.height * ratio));
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
            (function (Orientation) {
                Orientation[Orientation["Up"] = 0] = "Up";
                Orientation[Orientation["Left"] = 3 * Math.PI / 2] = "Left";
                Orientation[Orientation["Down"] = Math.PI] = "Down";
                Orientation[Orientation["Right"] = Math.PI / 2] = "Right";
            })(Objects.Orientation || (Objects.Orientation = {}));
            var Orientation = Objects.Orientation;
            var OrientationUtils = (function () {
                function OrientationUtils() {
                }
                OrientationUtils.fromStringToOrientation = function (orientationString) {
                    switch (orientationString.toLowerCase()) {
                        case "up":
                            return Orientation.Up;
                        case "left":
                            return Orientation.Left;
                        case "down":
                            return Orientation.Down;
                        case "right":
                            return Orientation.Right;
                    }
                    throw "ERROR: Invalid orientation string specified.";
                };
                return OrientationUtils;
            }());
            Objects.OrientationUtils = OrientationUtils;
        })(Objects = Game.Objects || (Game.Objects = {}));
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Physics;
    (function (Physics) {
        var CircleBounding = (function () {
            function CircleBounding(center, radius) {
                this.center = center;
                this.radius = radius;
            }
            CircleBounding.prototype.getCenter = function () {
                return this.center;
            };
            CircleBounding.prototype.getRadius = function () {
                return this.radius;
            };
            CircleBounding.prototype.isCollide = function (bounding) {
                if (bounding instanceof Physics.RectangleBounding) {
                    var widthDivided = bounding.getWidth() / 2;
                    var heightDivided = bounding.getHeight() / 2;
                    var distX = Math.abs(this.center.x - bounding.getTop().x - widthDivided);
                    var distY = Math.abs(this.center.y - bounding.getTop().y - heightDivided);
                    if (distX > (widthDivided + this.radius)) {
                        return false;
                    }
                    if (distY > (heightDivided + this.radius)) {
                        return false;
                    }
                    if (distX <= (widthDivided)) {
                        return true;
                    }
                    if (distY <= (heightDivided)) {
                        return true;
                    }
                    var dx = distX - widthDivided;
                    var dy = distY - heightDivided;
                    return (dx * dx + dy * dy <= (this.radius * this.radius));
                }
                else if (bounding instanceof CircleBounding) {
                    var dx = this.center.x - bounding.getCenter().x;
                    var dy = this.center.y - bounding.getCenter().y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    return distance < this.radius + bounding.getRadius();
                }
                throw "ERROR: Unknown bounding.";
            };
            CircleBounding.prototype.getDisplayObject = function () {
                var graphics = new PIXI.Graphics();
                graphics.position = this.center;
                graphics.alpha = 0.5;
                graphics.beginFill(0xFF0000);
                graphics.drawCircle(0, 0, this.radius);
                graphics.endFill();
                return graphics;
            };
            return CircleBounding;
        }());
        Physics.CircleBounding = CircleBounding;
    })(Physics = FroggerJS.Physics || (FroggerJS.Physics = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Game;
    (function (Game) {
        var Objects;
        (function (Objects) {
            var CircleBounding = FroggerJS.Physics.CircleBounding;
            var ArrowKeyCode;
            (function (ArrowKeyCode) {
                ArrowKeyCode[ArrowKeyCode["Up"] = 38] = "Up";
                ArrowKeyCode[ArrowKeyCode["Down"] = 40] = "Down";
                ArrowKeyCode[ArrowKeyCode["Left"] = 37] = "Left";
                ArrowKeyCode[ArrowKeyCode["Right"] = 39] = "Right";
            })(ArrowKeyCode || (ArrowKeyCode = {}));
            var Frog = (function () {
                function Frog(imageLoader) {
                    this.keyUpTexture = imageLoader.get("frog");
                    this.keyDownTexture = imageLoader.get("frog-extend");
                    this.sprite = new PIXI.Sprite(this.keyUpTexture);
                    this.sprite.anchor = new PIXI.Point(0.5, 0.5);
                    this.sprite.position = new PIXI.Point(30, 30);
                    this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * 0.15);
                    var self = this;
                    this.onKeyDown = function (event) {
                        var rotation;
                        switch (event.keyCode) {
                            case ArrowKeyCode.Left:
                                rotation = Objects.Orientation.Left;
                                break;
                            case ArrowKeyCode.Up:
                                rotation = Objects.Orientation.Up;
                                break;
                            case ArrowKeyCode.Right:
                                rotation = Objects.Orientation.Right;
                                break;
                            case ArrowKeyCode.Down:
                                rotation = Objects.Orientation.Down;
                                break;
                        }
                        self.sprite.rotation = rotation;
                        self.sprite.texture = self.keyDownTexture;
                    };
                    this.onKeyUp = function (event) {
                        var SHIFTING = FroggerJS.Constants.TILE_SIZE;
                        self.sprite.texture = self.keyUpTexture;
                        switch (event.keyCode) {
                            case ArrowKeyCode.Left:
                                self.sprite.position.x -= SHIFTING;
                                break;
                            case ArrowKeyCode.Up:
                                self.sprite.position.y -= SHIFTING;
                                break;
                            case ArrowKeyCode.Right:
                                self.sprite.position.x += SHIFTING;
                                break;
                            case ArrowKeyCode.Down:
                                self.sprite.position.y += SHIFTING;
                                break;
                        }
                    };
                }
                Frog.prototype.follow = function (mobile) {
                };
                Frog.prototype.getDisplayObject = function () {
                    return this.sprite;
                };
                Frog.prototype.getBounding = function () {
                    return this.bounding;
                };
                return Frog;
            }());
            Objects.Frog = Frog;
        })(Objects = Game.Objects || (Game.Objects = {}));
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Physics;
    (function (Physics) {
        var RectangleBounding = (function () {
            function RectangleBounding(top, width, height) {
                this.top = top;
                this.width = width;
                this.height = height;
            }
            RectangleBounding.prototype.getTop = function () {
                return this.top;
            };
            RectangleBounding.prototype.getWidth = function () {
                return this.width;
            };
            RectangleBounding.prototype.getHeight = function () {
                return this.height;
            };
            RectangleBounding.prototype.isCollide = function (bounding) {
                if (bounding instanceof RectangleBounding) {
                    return this.top.x < bounding.getTop().x + bounding.getWidth() &&
                        this.top.x + this.width > bounding.getTop().x &&
                        this.top.y < bounding.getTop().y + bounding.getHeight() &&
                        this.height + this.top.y > bounding.getTop().y;
                }
                else if (bounding instanceof Physics.CircleBounding) {
                    return bounding.isCollide(this);
                }
                throw "ERROR: Unknown bounding.";
            };
            RectangleBounding.prototype.getDisplayObject = function () {
                var graphics = new PIXI.Graphics();
                graphics.position = this.top;
                graphics.alpha = 0.5;
                graphics.beginFill(0x0000FF);
                graphics.drawRect(0, 0, this.width, this.height);
                graphics.endFill();
                return graphics;
            };
            return RectangleBounding;
        }());
        Physics.RectangleBounding = RectangleBounding;
    })(Physics = FroggerJS.Physics || (FroggerJS.Physics = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Game;
    (function (Game) {
        var Objects;
        (function (Objects) {
            var RectangleBounding = FroggerJS.Physics.RectangleBounding;
            var MobileObject = (function () {
                function MobileObject(sprite, orientation, speed) {
                    this.speedDecimal = 0;
                    this.sprite = sprite;
                    this.orientation = orientation;
                    this.speed = speed;
                    this.sprite.anchor = new PIXI.Point(0.5, 0.5);
                    this.sprite.rotation = orientation;
                    this.sprite.anchor = (orientation == Objects.Orientation.Right) ? new PIXI.Point(0, 1) : new PIXI.Point(1, 0);
                    this.bounding = new RectangleBounding(this.sprite.position, this.sprite.height / 2, this.sprite.width / 2);
                }
                MobileObject.prototype.updatePosition = function () {
                    var speedToApply = this.speed;
                    if (this.speed % 1 != 0) {
                        this.speedDecimal += this.speed;
                        speedToApply = Math.floor(this.speedDecimal);
                        this.speedDecimal = this.speedDecimal % 1;
                    }
                    this.sprite.position.x += (this.orientation == Objects.Orientation.Left) ? -speedToApply : speedToApply;
                    if (this.sprite.position.x > FroggerJS.Constants.WINDOW_WIDTH + this.sprite.height) {
                        this.sprite.position.x = -this.sprite.height;
                    }
                    else if (this.sprite.position.x < -this.sprite.height) {
                        this.sprite.position.x = FroggerJS.Constants.WINDOW_WIDTH + this.sprite.height;
                    }
                };
                MobileObject.prototype.getDisplayObject = function () {
                    return this.sprite;
                };
                MobileObject.prototype.getBounding = function () {
                    return this.bounding;
                };
                return MobileObject;
            }());
            Objects.MobileObject = MobileObject;
        })(Objects = Game.Objects || (Game.Objects = {}));
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Game;
    (function (Game) {
        var Objects;
        (function (Objects) {
            var Car = (function (_super) {
                __extends(Car, _super);
                function Car(imageLoader, orientation, speed) {
                    var colorIndex = Math.floor(Math.random() * Car.availableColors.length);
                    var sprite = new PIXI.Sprite(imageLoader.get(Car.TYPE + "-" + Car.availableColors[colorIndex]));
                    _super.call(this, sprite, orientation, speed);
                }
                Car.prototype.isCollisionAccepted = function () {
                    return false;
                };
                Car.TYPE = "car";
                Car.availableColors = [
                    "blue",
                    "green",
                    "red",
                    "white"
                ];
                return Car;
            }(Objects.MobileObject));
            Objects.Car = Car;
        })(Objects = Game.Objects || (Game.Objects = {}));
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Game;
    (function (Game) {
        var Objects;
        (function (Objects) {
            var Boat = (function (_super) {
                __extends(Boat, _super);
                function Boat(imageLoader, orientation, speed) {
                    var colorIndex = Math.floor(Math.random() * Boat.availableColors.length);
                    var sprite = new PIXI.Sprite(imageLoader.get(Boat.TYPE + "-" + Boat.availableColors[colorIndex]));
                    _super.call(this, sprite, orientation, speed);
                }
                Boat.prototype.isCollisionAccepted = function () {
                    return true;
                };
                Boat.TYPE = "boat";
                Boat.availableColors = [
                    "red",
                    "yellow"
                ];
                return Boat;
            }(Objects.MobileObject));
            Objects.Boat = Boat;
        })(Objects = Game.Objects || (Game.Objects = {}));
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var Game;
    (function (Game) {
        var Objects;
        (function (Objects) {
            var MobileFactory = (function () {
                function MobileFactory(imageLoader) {
                    this.imageLoader = imageLoader;
                }
                MobileFactory.prototype.createMobile = function (mobileName, orientation, speed) {
                    switch (mobileName.toLowerCase()) {
                        case Objects.Car.TYPE:
                            return new Objects.Car(this.imageLoader, orientation, speed);
                        case Objects.Boat.TYPE:
                            return new Objects.Boat(this.imageLoader, orientation, speed);
                    }
                    throw "ERROR: The mobile name doesn't exist.";
                };
                return MobileFactory;
            }());
            Objects.MobileFactory = MobileFactory;
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
        var OrientationUtils = FroggerJS.Game.Objects.OrientationUtils;
        var MobileFactory = FroggerJS.Game.Objects.MobileFactory;
        var GameManager = (function () {
            function GameManager(imageLoader, scene) {
                this.onGameOver = new Event();
                this.onNextLevel = new Event();
                this.scene = scene;
                this.imageLoader = imageLoader;
                this.frog = new Frog(imageLoader);
                this.mobileFactory = new MobileFactory(imageLoader);
                this.mobileObjects = [];
            }
            GameManager.prototype.setupLevel = function (levelConfiguration) {
                Logger.logMessage("Initialize level " + levelConfiguration["level"] + "...");
                var level = FroggerJS.Levels[0];
                if (level.length != FroggerJS.Constants.WINDOW_HEIGHT / FroggerJS.Constants.TILE_SIZE) {
                    throw "ERROR: The level configuration isn't valid.";
                }
                var SCALE_RATIO = FroggerJS.Constants.TILE_SIZE / FroggerJS.Constants.ASSET_SIZE;
                var WIDTH_SPRITES_NUMBER = FroggerJS.Constants.WINDOW_WIDTH / FroggerJS.Constants.TILE_SIZE;
                for (var i = 0; i < level.length; ++i) {
                    if (!level[i].hasOwnProperty("texture")) {
                        throw "ERROR: Texture property is missing.";
                    }
                    if (!level[i].hasOwnProperty("touchAllowed")) {
                        throw "ERROR: TouchAllowed property is missing.";
                    }
                    var texture = this.imageLoader.get(level[i].texture);
                    for (var j = 0; j < WIDTH_SPRITES_NUMBER; ++j) {
                        var sprite = new PIXI.Sprite(texture);
                        sprite.position.x = j * FroggerJS.Constants.TILE_SIZE;
                        sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;
                        this.scene.addChild(sprite, SCALE_RATIO);
                    }
                    this.mobileObjects[i] = [];
                    if (level[i].hasOwnProperty("mobile")) {
                        if (!level[i]['mobile'].hasOwnProperty("type")) {
                            throw "ERROR: Type property is missing.";
                        }
                        if (!level[i]['mobile'].hasOwnProperty("orientation")) {
                            throw "ERROR: Orientation property is missing.";
                        }
                        if (!level[i]['mobile'].hasOwnProperty("speed")) {
                            throw "ERROR: Speed property is missing.";
                        }
                        var nextPosition = 0;
                        var spriteHeight = 0;
                        var orientation_1 = OrientationUtils.fromStringToOrientation(level[i]['mobile']['orientation']);
                        do {
                            var movableObject = this.mobileFactory.createMobile(level[i]['mobile'].type, orientation_1, level[i]['mobile'].speed);
                            var sprite = movableObject.getDisplayObject();
                            sprite.position.x = nextPosition;
                            sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;
                            spriteHeight = sprite.height;
                            nextPosition += spriteHeight + Math.floor((Math.random() * 3 * spriteHeight / 2) + spriteHeight / 2);
                            this.mobileObjects[i].push(movableObject);
                            this.scene.addChild(movableObject, SCALE_RATIO);
                        } while (nextPosition < FroggerJS.Constants.WINDOW_WIDTH);
                    }
                }
                this.scene.addChild(this.frog, SCALE_RATIO);
                if (FroggerJS.Constants.DISPLAY_BOUNDING) {
                    for (var i = 0; i < this.mobileObjects.length; ++i) {
                        for (var j = 0; j < this.mobileObjects[i].length; ++j) {
                            this.scene.addChild(this.mobileObjects[i][j].getBounding());
                        }
                    }
                    this.scene.addChild(this.frog.getBounding());
                }
                document.addEventListener("keydown", this.frog.onKeyDown);
                document.addEventListener("keyup", this.frog.onKeyUp);
                this.scene.onRender.register(this.update.bind(this));
            };
            GameManager.prototype.clearLevel = function () {
                document.removeEventListener("keydown", this.frog.onKeyDown);
                document.removeEventListener("keyup", this.frog.onKeyUp);
                this.scene.onRender.unregister(this.update);
            };
            GameManager.prototype.update = function () {
                var FROG_INDEX_POSITION = Math.floor(this.frog.getDisplayObject().position.y / FroggerJS.Constants.TILE_SIZE);
                for (var i = 0; i < this.mobileObjects.length; ++i) {
                    for (var j = 0; j < this.mobileObjects[i].length; ++j) {
                        this.mobileObjects[i][j].updatePosition();
                        if (FROG_INDEX_POSITION == i) {
                            if (this.mobileObjects[i][j].getBounding().isCollide(this.frog.getBounding())) {
                                console.log("COLLIDE!");
                            }
                        }
                    }
                }
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
                this.gameLevelManager.setupLevel(this.levelConfiguration);
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
                var scene = new Scene(FroggerJS.Constants.WINDOW_WIDTH, FroggerJS.Constants.WINDOW_HEIGHT);
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
            "boat-red",
            "boat-yellow",
            "car-blue",
            "car-green",
            "car-red",
            "car-white",
            "frog",
            "frog-extend",
            "grass",
            "grass-water-top",
            "grass-water-bottom",
            "water",
            "road-top",
            "road-middle-top",
            "road-middle-bottom",
            "road-bottom"
        ];
        return App;
    }());
    FroggerJS.App = App;
})(FroggerJS || (FroggerJS = {}));
FroggerJS.App.initialize();
//# sourceMappingURL=frogger.js.map