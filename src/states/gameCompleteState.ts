/// <reference path="state.ts" />
/// <reference path="../audio/audioManager.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../graphics/ticker.ts" />
/// <reference path="../utils/logger.ts" />
/// <reference path="../views/gameCompleteView.ts" />


namespace FroggerJS.States {

    import AudioManager = FroggerJS.Audio.AudioManager;
    import EndGameView = FroggerJS.Views.EndGameView;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Logger = Utils.Logger;
    import Scene = FroggerJS.Graphics.Scene;
    import Ticker = FroggerJS.Graphics.Ticker;

    /**
     * Defines the 'Game Complete State' for the application.
     */
    export class GameCompleteState implements State {

        private static DELAY = 500;
        private static SOUND_NAME = "win";

        private scene: Scene;
        private ticker: Ticker;
        private audioManager: AudioManager;
        private stateManager: StateManager;
        private endGameView: EndGameView;

        /**
         * Initializes a new instance of the GameCompleteState class.
         *
         * @param scene             The scene to use.
         * @param imageLoader       The image loader to use.
         * @param ticker            The ticker to use.
         * @param audioManager      The audio manager to use.
         * @param stateManager      The state manager to use.
         */
        public constructor(scene: Scene, imageLoader: ImageLoader, ticker: Ticker,
                           audioManager: AudioManager, stateManager: StateManager) {

            this.scene = scene;
            this.ticker = ticker;
            this.audioManager = audioManager;
            this.stateManager = stateManager;
            this.endGameView = new EndGameView(imageLoader);
        }

        /**
         * Occurred when the application enters in the 'Game Complete State'.
         */
        public entered(): void {

            Logger.logMessage("Entered in 'End Game State'.");

            this.scene.addChild(this.endGameView);
            this.ticker.register(this.endGameView);

            let self = this;
            function onKeyDown() {
                document.removeEventListener("keydown", onKeyDown);
                self.stateManager.change("mainMenu");
            }

            setTimeout(function() {
                document.addEventListener("keydown", onKeyDown);
            }, GameCompleteState.DELAY);
            this.audioManager.play(GameCompleteState.SOUND_NAME);
        }

        /**
         * Occurred when the application leaves the 'Game Complete State'.
         */
        public leaving(): void {

            this.ticker.unregister(this.endGameView);
            Logger.logMessage("Leaving the 'End Game State'.");
        }
    }
}