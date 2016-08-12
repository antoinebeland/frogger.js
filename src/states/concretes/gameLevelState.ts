/// <reference path="../state.ts" />
/// <reference path="../stateManager.ts" />
/// <reference path="../../game/gameManager.ts" />
/// <reference path="../../graphics/ticker.ts" />
/// <reference path="../../utils/logger.ts" />

namespace FroggerJS.States {

    import GameManager = FroggerJS.Game.GameManager;
    import Ticker = FroggerJS.Graphics.Ticker;
    import Logger = Utils.Logger;

    export class GameLevelState implements State {

        private gameManager : GameManager;
        private ticker: Ticker;
        private levelConfiguration: any;
        private stateManager: StateManager;

        public constructor(gameManager : GameManager, levelConfiguration: any, ticker: Ticker, stateManager: StateManager) {

            this.gameManager = gameManager;
            this.levelConfiguration = levelConfiguration;
            this.ticker = ticker;
            this.stateManager = stateManager;
        }

        public entered(): void {

            Logger.logMessage(`Entered in 'Game Level ${this.levelConfiguration["level"]} State'.`);

            this.gameManager.onGameOver.register(this.gameOverOccurred, this);
            this.gameManager.onNextLevel.register(this.nextLevelOccurred, this);
            this.gameManager.setupLevel(this.levelConfiguration);
            this.ticker.register(this.gameManager);
        }

        public leaving(): void {

            this.ticker.unregister(this.gameManager);
            this.gameManager.onGameOver.unregister(this.gameOverOccurred, this);
            this.gameManager.onNextLevel.unregister(this.nextLevelOccurred, this);
            this.gameManager.destroyLevel();

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