/// <reference path="config.ts" />
/// <reference path="./graphics/imageLoader.ts" />
/// <reference path="./graphics/scene.ts" />
/// <reference path="./game/gameManager.ts" />
/// <reference path="./states/stateManager.ts" />
/// <reference path="./states/concretes/mainMenuState.ts" />
/// <reference path="./states/concretes/gameLevelState.ts" />
/// <reference path="./states/concretes/endGameState.ts" />
/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    declare var PIXI: any;

    import GraphicsLoader = FroggerJS.Graphics.ImageLoader;
    import Scene = FroggerJS.Graphics.Scene;
    import GameLevelManager = FroggerJS.Game.GameManager;
    import StateManager = FroggerJS.States.StateManager;
    import MainMenuState = FroggerJS.States.MainMenuState;
    import GameLevelState = FroggerJS.States.GameLevelState;
    import EndGameState = FroggerJS.States.EndGameState;
    import Logger = Utils.Logger;
    import LogLevel = Utils.LogLevel;

    export class App {

        private static resources = [
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

        public static initialize() {

            Logger.activeLogLevel = LogLevel.Debug;
            PIXI.utils._saidHello = true;

            Logger.logMessage("Initialize Frogger.js...", LogLevel.Info);
            Logger.logMessage("Loading resources...", LogLevel.Info);

            let loader = new GraphicsLoader("assets");
            loader.register(App.resources);

            loader.onLoadingCompleted.register(function() {

                Logger.logMessage("Resources loaded.", LogLevel.Info);

                let scene = new Scene(FroggerJS.Constants.WINDOW_WIDTH, FroggerJS.Constants.WINDOW_HEIGHT);
                let gameLevelManager = new GameLevelManager(loader, scene);

                let stateManager = new StateManager();
                stateManager.register("mainMenu", new MainMenuState(stateManager));
                stateManager.register("level1", new GameLevelState(gameLevelManager, {level: 1, levelsCount: 2}, stateManager));
                stateManager.register("level2", new GameLevelState(gameLevelManager, {level: 2, levelsCount: 2}, stateManager));
                stateManager.register("endGame", new EndGameState());
                
                stateManager.change("mainMenu");

                scene.render();
            });
            loader.load();
        }
    }
}

FroggerJS.App.initialize();
