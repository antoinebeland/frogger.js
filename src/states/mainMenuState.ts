/// <reference path="state.ts" />
/// <reference path="stateManager.ts" />
/// <reference path="../audio/audioManager.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/logger.ts" />
/// <reference path="../views/mainMenuView.ts" />

namespace FroggerJS.States {

    import AudioManager = FroggerJS.Audio.AudioManager;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Logger = Utils.Logger;
    import MainMenuView = FroggerJS.Views.MainMenuView;
    import Scene = FroggerJS.Graphics.Scene;

    /**
     * Defines the 'Main Menu State' of the application.
     */
    export class MainMenuState implements State {

        static SOUND_NAME = "menu";
        static SOUND_FADE_DURATION = 500;
        static SOUND_VOLUME = 0.6;

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
         * Occurred when the application enters in the 'Main Menu State'.
         */
        public entered(): void {

            Logger.logMessage("Entered in 'Main Menu State'.");

            this.scene.clear();
            this.scene.addChild(this.mainMenuView);
            this.audioManager.fadeIn(MainMenuState.SOUND_NAME,
                MainMenuState.SOUND_FADE_DURATION, true, MainMenuState.SOUND_VOLUME);
        }

        /**
         * Occurred when the application leaves the 'Main Menu State'.
         */
        public leaving(): void {

            this.audioManager.fadeOut(MainMenuState.SOUND_NAME, MainMenuState.SOUND_FADE_DURATION);
            this.scene.clear();

            Logger.logMessage("Leaving the 'Main Menu State'.");
        }
    }
}