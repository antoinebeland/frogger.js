/// <reference path="./rendering/scene.ts" />
/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    import Scene = FroggerJS.Rendering.Scene;
    import Logger = Utils.Logger;
    import LogLevel = Utils.LogLevel;

    export class Frogger {

        // List of resources to load...
        resources = {};

        static initialize() {

            Logger.activeLogLevel = LogLevel.DEBUG;
            Logger.logMessage("Initialize Application...");
            
            let scene = new Scene();
            
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 50;

            scene.add(camera);

            scene.onRendering.register(function() {
                Logger.logMessage("TEST");
            });

            scene.render();
        }
    }
}

(function () {
    FroggerJS.Frogger.initialize();
}());
