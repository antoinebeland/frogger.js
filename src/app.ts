/// <reference path="config.ts" />
/// <reference path="./audio/audioManager.ts" />
/// <reference path="./graphics/imageLoader.ts" />
/// <reference path="./graphics/ticker.ts" />
/// <reference path="./graphics/scene.ts" />
/// <reference path="./game/gameManager.ts" />
/// <reference path="./states/stateManager.ts" />
/// <reference path="./states/mainMenuState.ts" />
/// <reference path="./states/gameLevelState.ts" />
/// <reference path="./states/endGameState.ts" />
/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    import AudioManager = FroggerJS.Audio.AudioManager;
    declare var PIXI: any;

    import GraphicsLoader = FroggerJS.Graphics.ImageLoader;
    import Scene = FroggerJS.Graphics.Scene;
    import Ticker = FroggerJS.Graphics.Ticker;
    import GameManager = FroggerJS.Game.GameManager;
    import StateManager = FroggerJS.States.StateManager;
    import MainMenuState = FroggerJS.States.MainMenuState;
    import GameLevelState = FroggerJS.States.GameLevelState;
    import EndGameState = FroggerJS.States.EndGameState;
    import Logger = Utils.Logger;
    import LogLevel = Utils.LogLevel;

    export class App {

        private static resources = [
            "boat-red-left",
            "boat-red-right",
            "boat-yellow-left",
            "boat-yellow-right",
            "car-blue-left",
            "car-blue-right",
            "car-green-left",
            "car-green-right",
            "car-red-left",
            "car-red-right",
            "car-white-left",
            "car-white-right",
            "frog",
            "frog-extend",
            "goal",
            "menu-background",
            "menu-button",
            "menu-button-clicked",
            "menu-logo",
            "menu-stripe",
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

            // TODO: Loads sounds.
            let audioManager = new AudioManager("assets/sounds");
            audioManager.register("menu", "menu.wav");

            let loader = new GraphicsLoader("assets/sprites");
            loader.register(App.resources);

            loader.onLoadingCompleted.register(function() {

                Logger.logMessage("Resources loaded.", LogLevel.Info);

                let ticker = new Ticker();
                let scene = new Scene(FroggerJS.Constants.WINDOW_WIDTH, FroggerJS.Constants.WINDOW_HEIGHT);
                let gameManager = new GameManager(loader, scene);

                let stateManager = new StateManager();
                stateManager.register("mainMenu", new MainMenuState(scene, loader, audioManager, stateManager));
                stateManager.register("level1", new GameLevelState(gameManager, {level: 1, levelsCount: 2}, ticker, stateManager));
                stateManager.register("level2", new GameLevelState(gameManager, {level: 2, levelsCount: 2}, ticker, stateManager));
                stateManager.register("endGame", new EndGameState());
                
                stateManager.change("mainMenu");

                ticker.register(scene);
                ticker.start();
            });
            loader.load();
        }
    }
}

FroggerJS.App.initialize();
