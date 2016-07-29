/// <reference path="../state.ts" />
/// <reference path="../stateManager.ts" />
/// <reference path="../../utils/logger.ts" />

namespace FroggerJS.States {

    import Scene = FroggerJS.Graphics.Scene;
    import Logger = Utils.Logger;

        export class GameLevelState implements State {

        private scene : Scene;
        private stateManager: StateManager;
        private levelConfiguration: any;
        private currentLevel: number = 0;

        public constructor(scene : Scene, levelConfiguration: any, stateManager: StateManager) {
            this.scene = scene;
        }

        public entered(): void {
            Logger.logMessage("Entered in GameLevelState.");
            this.scene.onRender.register(this.update);
        }

        public leaving(): void {
            this.scene.onRender.unregister(this.update);
            Logger.logMessage("Leaving in GameLevelState.");
        }

        private update(): void {
            //Logger.logMessage("test");
        }

        private gameOverOccurred(): void {
            this.stateManager.change("endGame");
        }

        private nextLevelOccurred(): void {
            this.stateManager.change("level");
        }
    }
}