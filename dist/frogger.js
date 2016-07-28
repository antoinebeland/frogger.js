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
    var Rendering;
    (function (Rendering) {
        var Event = Utils.Event;
        var Scene = (function () {
            function Scene() {
                this.scene = new THREE.Scene();
                this.onRendering = new Event();
            }
            Scene.prototype.add = function (object) {
                this.scene.add(object);
            };
            Scene.prototype.removeAll = function () {
                for (var i = this.scene.children.length - 1; i >= 0; i--) {
                    this.scene.remove(this.scene.children[i]);
                }
            };
            Scene.prototype.render = function () {
                var renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);
                var self = this;
                var update = function () {
                    self.onRendering.invoke();
                    renderer.render(this.scene, this.camera);
                    requestAnimationFrame(update);
                };
                update();
            };
            return Scene;
        }());
        Rendering.Scene = Scene;
    })(Rendering = FroggerJS.Rendering || (FroggerJS.Rendering = {}));
})(FroggerJS || (FroggerJS = {}));
var Utils;
(function (Utils) {
    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARNING"] = 3] = "WARNING";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    })(Utils.LogLevel || (Utils.LogLevel = {}));
    var LogLevel = Utils.LogLevel;
    var Logger = (function () {
        function Logger() {
        }
        Logger.logMessage = function (message, logLevel) {
            if (logLevel === void 0) { logLevel = LogLevel.DEBUG; }
            if (Logger.activeLogLevel > logLevel) {
                return;
            }
            switch (logLevel) {
                case LogLevel.DEBUG:
                    console.log("DEBUG: " + message);
                    break;
                case LogLevel.INFO:
                    console.info("INFO: " + message);
                    break;
                case LogLevel.WARNING:
                    console.warn("WARNING: " + message);
                    break;
                case LogLevel.ERROR:
                    console.error("ERROR:" + message);
            }
        };
        Logger.activeLogLevel = LogLevel.DEBUG;
        return Logger;
    }());
    Utils.Logger = Logger;
})(Utils || (Utils = {}));
var FroggerJS;
(function (FroggerJS) {
    var Scene = FroggerJS.Rendering.Scene;
    var Logger = Utils.Logger;
    var LogLevel = Utils.LogLevel;
    var Frogger = (function () {
        function Frogger() {
            this.resources = {};
        }
        Frogger.initialize = function () {
            Logger.activeLogLevel = LogLevel.DEBUG;
            Logger.logMessage("Initialize Application...");
            var scene = new Scene();
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 50;
            scene.add(camera);
            scene.onRendering.register(function () {
                Logger.logMessage("TEST");
            });
            scene.render();
        };
        return Frogger;
    }());
    FroggerJS.Frogger = Frogger;
})(FroggerJS || (FroggerJS = {}));
(function () {
    FroggerJS.Frogger.initialize();
}());
var FroggerJS;
(function (FroggerJS) {
    var Game;
    (function (Game) {
        var GameManager = (function () {
            function GameManager(scene) {
                this.scene = scene;
            }
            return GameManager;
        }());
        Game.GameManager = GameManager;
    })(Game = FroggerJS.Game || (FroggerJS.Game = {}));
})(FroggerJS || (FroggerJS = {}));
var FroggerJS;
(function (FroggerJS) {
    var GameObjects;
    (function (GameObjects) {
        var Frog = (function () {
            function Frog() {
                this.lifeCount = 0;
            }
            return Frog;
        }());
    })(GameObjects = FroggerJS.GameObjects || (FroggerJS.GameObjects = {}));
})(FroggerJS || (FroggerJS = {}));
var Utils;
(function (Utils) {
    var Loader = (function () {
        function Loader() {
        }
        Loader.loadObjMtlModel = function (fileName, workingDirectory, callback) {
            var self = this;
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath(workingDirectory);
            mtlLoader.load(fileName + ".mtl", function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath(workingDirectory);
                objLoader.load(fileName + ".obj", function (mesh) {
                    callback(mesh);
                });
            });
        };
        return Loader;
    }());
    Utils.Loader = Loader;
})(Utils || (Utils = {}));
//# sourceMappingURL=frogger.js.map