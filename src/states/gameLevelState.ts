/// <reference path="state.ts" />
/// <reference path="stateManager.ts" />
/// <reference path="../audio/audioManager.ts" />
/// <reference path="../game/gameLevel.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/ticker.ts" />
/// <reference path="../utils/logger.ts" />
/// <reference path="../views/gameLevelView.ts" />

namespace FroggerJS.States {

    import AudioManager = FroggerJS.Audio.AudioManager;
    import GameLevel = FroggerJS.Game.GameLevel;
    import GameLevelView = FroggerJS.Views.GameLevelView;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Logger = Utils.Logger;
    import Scene = FroggerJS.Graphics.Scene;
    import Ticker = FroggerJS.Graphics.Ticker;

    /**
     * Defines the 'Game Level State' of the application.
     */
    export class GameLevelState implements State {

        private static DELAY = 250;
        private static NEXT_LEVEL_SOUND_NAME = "next-level";

        private scene: Scene;
        private imageLoader: ImageLoader;
        private ticker: Ticker;
        private audioManager: AudioManager;
        private levelConfiguration: any;
        private stateManager: StateManager;

        private gameLevelView: GameLevelView = undefined;
        private gameLevel : GameLevel = undefined;

        /**
         * Initializes a new instance of the GameLevelState class.
         *
         * @param scene                     The scene to use.
         * @param imageLoader               The image loader to use.
         * @param ticker                    The ticker to use.
         * @param audioManager              The audio manager to use.
         * @param levelConfiguration        The level configuration to load.
         * @param stateManager              The state manager to use.
         */
        public constructor(scene: Scene, imageLoader: ImageLoader, ticker: Ticker,
                           audioManager: AudioManager, levelConfiguration: any, stateManager: StateManager) {

            this.scene = scene;
            this.imageLoader = imageLoader;
            this.ticker = ticker;
            this.audioManager = audioManager;
            this.levelConfiguration = levelConfiguration;
            this.stateManager = stateManager;
        }

        /**
         * Occurred when the application enters in the 'Game Level State'.
         */
        public entered(): void {

            let level = this.levelConfiguration.level;
            Logger.logMessage(`Entered in 'Game Level ${level} State'.`);

            this.gameLevel = new GameLevel(this.imageLoader, this.audioManager, this.levelConfiguration);
            this.gameLevel.onGameOver.register(this.gameOverOccurred, this);
            this.gameLevel.onNextLevel.register(this.nextLevelOccurred, this);

            this.gameLevelView = new GameLevelView(level);

            this.scene.clear();
            this.scene.addChild(this.gameLevel.getBoard());
            this.scene.addChild(this.gameLevelView);

            this.ticker.register(this.gameLevel);
            this.ticker.register(this.gameLevelView);

            // Initializes the key listeners before to start the game.
            let self = this;
            function onKeyDown() {
                document.removeEventListener("keydown", onKeyDown);
                self.scene.removeChild(self.gameLevelView);
                self.ticker.unregister(self.gameLevelView);
            }
            function onKeyUp() {
                document.removeEventListener("keyup", onKeyUp);
                self.gameLevel.start();
            }

            setTimeout(function () {
                document.addEventListener("keydown", onKeyDown);
                document.addEventListener("keyup", onKeyUp);
            }, GameLevelState.DELAY);

            // Plays the sound only for the levels higher than 1.
            if (level > 1) {
                this.audioManager.play(GameLevelState.NEXT_LEVEL_SOUND_NAME);
            }
        }

        /**
         * Occurred when the application leaves the 'Game Level State'.
         */
        public leaving(): void {

            this.ticker.unregister(this.gameLevel);

            this.gameLevel.onGameOver.unregister(this.gameOverOccurred, this);
            this.gameLevel.onNextLevel.unregister(this.nextLevelOccurred, this);
            this.gameLevel.dispose();

            Logger.logMessage(`Leaving the 'Game Level ${this.levelConfiguration.level} State'.`);
        }

        /**
         * Occurred on game over.
         */
        private gameOverOccurred(): void {
            this.stateManager.change("gameOver");
        }

        /**
         * Occurred when a next level is reached.
         */
        private nextLevelOccurred(): void {

            let nextLevel = this.levelConfiguration.level + 1;
            if (this.levelConfiguration.levelsCount < nextLevel) {
                this.stateManager.change("gameComplete");
            } else {
                this.stateManager.change(`level${nextLevel}`);
            }
        }
    }
}