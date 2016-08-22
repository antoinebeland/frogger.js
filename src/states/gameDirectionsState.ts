/// <reference path="state.ts" />
/// <reference path="stateManager.ts" />
/// <reference path="../audio/audioManager.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/ticker.ts" />
/// <reference path="../utils/logger.ts" />
/// <reference path="../views/gameDirectionsView.ts" />

namespace FroggerJS.States {

    import AudioManager = FroggerJS.Audio.AudioManager;
    import GameDirectionsView = FroggerJS.Views.GameDirectionsView;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Logger = Utils.Logger;
    import Scene = FroggerJS.Graphics.Scene;
    import Ticker = FroggerJS.Graphics.Ticker;

    export class GameDirectionsState implements State {

        private static SOUND_NAME = "game-over";
        private static SOUND_VOLUME = 0.7;

        private scene: Scene;
        private ticker: Ticker;
        private audioManager: AudioManager;
        private stateManager: StateManager;
        private gameDirectionsView: GameDirectionsView;


        public constructor(scene: Scene, imageLoader: ImageLoader, ticker: Ticker,
                           audioManager: AudioManager, stateManager: StateManager) {

            this.scene = scene;
            this.ticker = ticker;
            this.audioManager = audioManager;
            this.stateManager = stateManager;

            this.gameDirectionsView = new GameDirectionsView(imageLoader);
            this.gameDirectionsView.onBackToMenuClicked.register(function () {
                this.stateManager.change("mainMenu");
            }, this);
            this.gameDirectionsView.onPlayClicked.register(function () {
                this.stateManager.change("level1");
            }, this);
        }

        /**
         * Occurred when the application enters in the 'Game Directions State'.
         */
        public entered(): void {

            Logger.logMessage("Entered in the 'Game Over State'.");

            this.scene.addChild(this.gameDirectionsView);
            this.ticker.register(this.gameDirectionsView);
        }

        /**
         * Occurred when the application leaved the 'Game Directions State'.
         */
        public leaving(): void {

            this.scene.clear();
            this.ticker.unregister(this.gameDirectionsView);

            Logger.logMessage("Leaving the 'Game Over State'.");
        }
    }
}