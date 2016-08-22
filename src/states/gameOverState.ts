/// <reference path="state.ts" />
/// <reference path="stateManager.ts" />
/// <reference path="../audio/audioManager.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/logger.ts" />
/// <reference path="../views/gameOverView.ts" />

namespace FroggerJS.States {

    import AudioManager = FroggerJS.Audio.AudioManager;
    import GameOverView = FroggerJS.Views.GameOverView;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Logger = Utils.Logger;
    import Scene = FroggerJS.Graphics.Scene;

    /**
     * Defines the 'Game Over State' of the application.
     */
    export class GameOverState implements State {

        private static SOUND_NAME = "game-over";
        private static SOUND_VOLUME = 0.7;

        private scene: Scene;
        private audioManager: AudioManager;
        private stateManager: StateManager;
        private gameOverView: GameOverView;

        /**
         * Initializes a new instance of the GameOverState class.
         *
         * @param scene             The scene to use.
         * @param imageLoader       The image loader to use.
         * @param audioManager      The audio manager to use.
         * @param stateManager      The state manager to use.
         */
        public constructor(scene: Scene, imageLoader: ImageLoader,
                           audioManager: AudioManager, stateManager: StateManager) {

            this.scene = scene;
            this.audioManager = audioManager;
            this.stateManager = stateManager;
            this.gameOverView = new GameOverView(imageLoader);
        }

        /**
         * Occurred when the application enters in the 'Game Over State'.
         */
        public entered(): void {

            Logger.logMessage("Entered in the 'Game Over State'.");

            this.gameOverView.onReplayClicked.register(this.replayOccurred, this);
            this.gameOverView.onBackToMenuClicked.register(this.backToMenuOccurred, this);

            this.scene.addChild(this.gameOverView);
            this.audioManager.play(GameOverState.SOUND_NAME, false, GameOverState.SOUND_VOLUME);
        }

        /**
         * Occurred when the application leaved the 'Game Over State'.
         */
        public leaving(): void {

            this.scene.clear();
            this.gameOverView.onReplayClicked.unregister(this.replayOccurred, this);
            this.gameOverView.onBackToMenuClicked.unregister(this.backToMenuOccurred, this);

            Logger.logMessage("Leaving the 'Game Over State'.");
        }

        /**
         * Occurred when the replay button is clicked.
         */
        private replayOccurred() {
            this.stateManager.change("level1");
        }

        /**
         * Occurred when the menu button is clicked.
         */
        private backToMenuOccurred() {
            this.stateManager.change("mainMenu");
        }
    }
}