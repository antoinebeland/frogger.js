/// <reference path="state.ts" />
/// <reference path="stateManager.ts" />
/// <reference path="../audio/audioManager.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../views/mainMenuView.ts" />
/// <reference path="../utils/logger.ts" />

namespace FroggerJS.States {

    import Scene = FroggerJS.Graphics.Scene;
    import Logger = Utils.Logger;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import AudioManager = FroggerJS.Audio.AudioManager;
    import MainMenuView = FroggerJS.Views.MainMenuView;

    export class MainMenuState implements State {

        private scene: Scene;
        private stateManager: StateManager;
        private audioManager: AudioManager;
        private mainMenuView: MainMenuView;

        public constructor(scene: Scene, imageLoader: ImageLoader,
                           audioManager: AudioManager, stateManager: StateManager) {

            this.scene = scene;
            this.audioManager = audioManager;
            this.stateManager = stateManager;

            this.mainMenuView = new MainMenuView(imageLoader);
            this.mainMenuView.onPlayClicked.register(function () {
                this.stateManager.change("level1");
            }, this);
        }

        public entered(): void {
            Logger.logMessage("Entered in 'Main Menu State'.");
            this.scene.clear();
            this.scene.addChild(this.mainMenuView);
            this.audioManager.fadeIn("menu", 500, true);
        }

        public leaving(): void {
            this.audioManager.fadeOut("menu", 500);
            this.scene.clear();
            Logger.logMessage("Leaving the 'Main Menu State'.");
        }
    }
}