/// <reference path="./graphics/graphicsLoader.ts" />
/// <reference path="./graphics/scene.ts" />
/// <reference path="./states/stateManager.ts" />
/// <reference path="./states/concretes/mainMenuState.ts" />
/// <reference path="./states/concretes/gameLevelState.ts" />
/// <reference path="./states/concretes/endGameState.ts" />
/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    import Logger = Utils.Logger;
    import LogLevel = Utils.LogLevel;
    import GraphicsLoader = FroggerJS.Graphics.GraphicsLoader;
    import Scene = FroggerJS.Graphics.Scene;
    import StateManager = FroggerJS.States.StateManager;
    import InGameState = FroggerJS.States.GameLevelState;
    import MainMenuState = FroggerJS.States.MainMenuState;
    import GameLevelState = FroggerJS.States.GameLevelState;
    import EndGameState = FroggerJS.States.EndGameState;

    declare var PIXI: any;

    export class App {

        private static resources = [
            "frog",
            "boat"
        ];

        public static initialize() {

            Logger.activeLogLevel = LogLevel.Debug;
            PIXI.utils._saidHello = true;

            Logger.logMessage("Initialize Frogger.js...", LogLevel.Info);
            Logger.logMessage("Loading resources...", LogLevel.Info);

            let loader = new GraphicsLoader("assets");
            loader.register(App.resources);

            loader.onLoadingCompleted.register(function() {

                Logger.logMessage("Resources loaded.", LogLevel.Info);

                Logger.logMessage("Initialize scene...", LogLevel.Info);
                let scene = new Scene(800, 600);

                let stateManager = new StateManager();
                stateManager.register("mainMenu", new MainMenuState(stateManager));
                stateManager.register("level1", new GameLevelState(scene, {}, stateManager));
                stateManager.register("level2", new GameLevelState(scene, {}, stateManager));
                stateManager.register("endGame", new EndGameState());
                
                stateManager.change("level1");
                
                
                Logger.logMessage("Scene initialized.", LogLevel.Info);
                scene.render();
            });
            loader.load();
        }
    }
}

FroggerJS.App.initialize();
