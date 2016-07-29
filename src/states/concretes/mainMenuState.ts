/// <reference path="../state.ts" />
/// <reference path="../stateManager.ts" />

namespace FroggerJS.States {

    export class MainMenuState implements State {

        private stateManager: StateManager;

        public constructor(stateManager: StateManager) {
            this.stateManager = stateManager;
        }

        public entered(): void {
            // bind button
        }

        public leaving(): void {
            // unbind button
        }

        private startGame(): void {
            this.stateManager.change("level1");
        }
    }
}