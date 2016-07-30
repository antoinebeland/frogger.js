/// <reference path="../state.ts" />
/// <reference path="../stateManager.ts" />
/// <reference path="../../utils/logger.ts" />

namespace FroggerJS.States {

    import Logger = Utils.Logger;

    export class MainMenuState implements State {

        private stateManager: StateManager;
        private startGame: { (): void };

        public constructor(stateManager: StateManager) {
            this.stateManager = stateManager;

            let self = this;
            this.startGame = function() {
                self.stateManager.change("level1");
            };
        }

        public entered(): void {
            Logger.logMessage("Entered in 'Main Menu State'.");
            document.querySelector("#button").addEventListener('click', this.startGame);
        }

        public leaving(): void {
            document.querySelector("#button").removeEventListener('click', this.startGame);
            Logger.logMessage("Leaving the 'Main Menu State'.");
        }
    }
}