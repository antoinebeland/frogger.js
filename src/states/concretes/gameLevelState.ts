/// <reference path="../state.ts" />
/// <reference path="../stateManager.ts" />
/// <reference path="../../game/gameManager.ts" />
/// <reference path="../../utils/logger.ts" />

namespace FroggerJS.States {

    import GameLevelManager = FroggerJS.Game.GameManager;
    import Logger = Utils.Logger;

    export class GameLevelState implements State {

        private gameLevelManager : GameLevelManager;
        private stateManager: StateManager;
        private levelConfiguration: any;

        public constructor(gameLevelManager : GameLevelManager, levelConfiguration: any, stateManager: StateManager) {

            this.gameLevelManager = gameLevelManager;
            this.levelConfiguration = levelConfiguration;
            this.stateManager = stateManager;
        }

        public entered(): void {

            Logger.logMessage(`Entered in 'Game Level ${this.levelConfiguration["level"]} State'.`);

            this.gameLevelManager.onGameOver.register(this.gameOverOccurred);
            this.gameLevelManager.onNextLevel.register(this.nextLevelOccurred);
            this.gameLevelManager.setupLevel(this.levelConfiguration);
        }

        public leaving(): void {

            this.gameLevelManager.onGameOver.unregister(this.gameOverOccurred);
            this.gameLevelManager.onNextLevel.unregister(this.nextLevelOccurred);
            this.gameLevelManager.clearLevel();

            Logger.logMessage(`Leaving the 'Game Level ${this.levelConfiguration["level"]} State'.`);
        }

        private gameOverOccurred(): void {
            this.stateManager.change("endGame");
        }

        private nextLevelOccurred(): void {

            let nextLevel = this.levelConfiguration["level"] + 1;
            if (this.levelConfiguration["levelsCount"] >= nextLevel) {
                this.stateManager.change("endGame");
            } else {
                this.stateManager.change(`level${nextLevel}`);
            }
        }
    }
}