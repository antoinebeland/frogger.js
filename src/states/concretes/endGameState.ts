/// <reference path="../state.ts" />
/// <reference path="../../utils/logger.ts" />

namespace FroggerJS.States {

    import Logger = Utils.Logger;

    export class EndGameState implements State {

        public constructor() {

        }

        public entered(): void {
            Logger.logMessage("Entered in EndGameState.");
        }

        public leaving(): void {
            Logger.logMessage("Leaving in EndGameState.");
        }
    }
}