/// <reference path="state.ts" />
/// <reference path="stateManager.ts" />
/// <reference path="../game/gameLevel.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/ticker.ts" />
/// <reference path="../utils/logger.ts" />

namespace FroggerJS.States {

    import GameLevel = FroggerJS.Game.GameLevel;
    import Scene = FroggerJS.Graphics.Scene;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Ticker = FroggerJS.Graphics.Ticker;
    import Logger = Utils.Logger;

    /**
     * Defines the 'Game Level State' of the application.
     */
    export class GameLevelState implements State {

        private scene: Scene;
        private imageLoader: ImageLoader;
        private levelConfiguration: any;
        private ticker: Ticker;
        private stateManager: StateManager;

        private gameLevel : GameLevel;

        /**
         * Initializes a new instance of the GameLevelState class.
         *
         * @param scene                     The scene to use.
         * @param imageLoader               The image loader to use.
         * @param levelConfiguration        The level configuration to load.
         * @param ticker                    The ticker to use.
         * @param stateManager              The state manager to use.
         */
        public constructor(scene: Scene, imageLoader: ImageLoader, levelConfiguration: any,
                           ticker: Ticker, stateManager: StateManager) {

            this.scene = scene;
            this.imageLoader = imageLoader;
            this.levelConfiguration = levelConfiguration;
            this.ticker = ticker;
            this.stateManager = stateManager;
        }


        /**
         * Occurred when the application enters in the 'Game Level State'.
         */
        public entered(): void {

            Logger.logMessage(`Entered in 'Game Level ${this.levelConfiguration["level"]} State'.`);

            this.gameLevel = new GameLevel(this.imageLoader, this.levelConfiguration);
            this.gameLevel.onGameOver.register(this.gameOverOccurred, this);
            this.gameLevel.onNextLevel.register(this.nextLevelOccurred, this);

            this.scene.addChild(this.gameLevel.getBoard());
            this.ticker.register(this.gameLevel);
        }

        /**
         * Occurred when the application leaves the 'Game Level State'.
         */
        public leaving(): void {

            this.ticker.unregister(this.gameLevel);

            this.gameLevel.onGameOver.unregister(this.gameOverOccurred, this);
            this.gameLevel.onNextLevel.unregister(this.nextLevelOccurred, this);
            this.gameLevel.destroy();

            Logger.logMessage(`Leaving the 'Game Level ${this.levelConfiguration["level"]} State'.`);
        }

        /**
         * Occurred on game over.
         */
        private gameOverOccurred(): void {
            this.stateManager.change("mainMenu");
        }

        /**
         * Occurred when a next level is reached.
         */
        private nextLevelOccurred(): void {

            let nextLevel = this.levelConfiguration["level"] + 1;
            if (this.levelConfiguration["levelsCount"] >= nextLevel) {
                this.stateManager.change("endGame");
            } else {
                this.stateManager.change(`level${nextLevel}`);
            }
        }
    }
}