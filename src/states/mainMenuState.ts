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

    /**
     * Defines the 'Main Menu State' of the application.
     */
    export class MainMenuState implements State {

        static SOUND_NAME = "menu";
        static FADE_DURATION = 500;

        private scene: Scene;
        private stateManager: StateManager;
        private audioManager: AudioManager;
        private mainMenuView: MainMenuView;

        /**
         * Initializes a new instance of the MainMenuState class.
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

            this.mainMenuView = new MainMenuView(imageLoader);
            this.mainMenuView.onPlayClicked.register(function () {
                this.stateManager.change("level1");
            }, this);
        }

        /**
         * Occurred when the application entered in the 'Main Menu State'.
         */
        public entered(): void {
            Logger.logMessage("Entered in 'Main Menu State'.");
            this.scene.clear();
            this.scene.addChild(this.mainMenuView);
            this.audioManager.fadeIn(MainMenuState.SOUND_NAME, MainMenuState.FADE_DURATION, true);
        }

        /**
         * Occurred when the application leaved the 'Main Menu State'.
         */
        public leaving(): void {
            this.audioManager.fadeOut(MainMenuState.SOUND_NAME, MainMenuState.FADE_DURATION);
            this.scene.clear();
            Logger.logMessage("Leaving the 'Main Menu State'.");
        }
    }
}