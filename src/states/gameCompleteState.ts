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

    export class GameCompleteState implements State {

        private static SOUND_NAME = "win";

        private scene: Scene;
        private ticker: Ticker;
        private audioManager: AudioManager;
        private stateManager: StateManager;
        private endGameView: EndGameView;

        public constructor(scene: Scene, imageLoader: ImageLoader, ticker: Ticker,
                           audioManager: AudioManager, stateManager: StateManager) {

            this.scene = scene;
            this.ticker = ticker;
            this.audioManager = audioManager;
            this.stateManager = stateManager;
            this.endGameView = new EndGameView(imageLoader);
        }

        public entered(): void {

            Logger.logMessage("Entered in 'End Game State'.");
            
            this.scene.addChild(this.endGameView);
            this.ticker.register(this.endGameView);

            let self = this;
            function onKeyDown() {
                document.removeEventListener("keydown", onKeyDown);
                self.stateManager.change("mainMenu");
            }

            document.addEventListener("keydown", onKeyDown);
            this.audioManager.play(GameCompleteState.SOUND_NAME);
        }

        public leaving(): void {

            this.ticker.unregister(this.endGameView);
            Logger.logMessage("Leaving the 'End Game State'.");
        }
    }
}