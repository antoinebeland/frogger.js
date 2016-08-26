/// <reference path="../config.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Game {

    import Constants = FroggerJS.Constants;
    import Event = Utils.Event;

    /**
     * Defines the game data.
     */
    export class GameData {

        private static availableLives = Constants.AVAILABLE_LIVES;
        private static score = 0;

        /**
         * Occurred when the lives count changed.
         *
         * @type {Utils.Event<void>}
         */
        public static onLivesCountChanged = new Event<void>();

        /**
         * Occurred when the score changed.
         *
         * @type {Utils.Event<void>}
         */
        public static onScoreChanged = new Event<void>();

        /**
         * Gets the available lives.
         *
         * @returns {number}    The number of available lives.
         */
        public static getAvailableLives(): number {
            return GameData.availableLives;
        }

        /**
         * Sets the available lives.
         *
         * @param availableLives    The available lives to set.
         */
        public static setAvailableLives(availableLives: number): void {
            if (availableLives < 0) {
                throw new Error("Negative live count.");
            }
            GameData.availableLives = availableLives;
            GameData.onLivesCountChanged.invoke();
        }

        /**
         * Gets the score.
         *
         * @returns {number}    The total score.
         */
        public static getScore(): number {
            return GameData.score;
        }

        /**
         * Increases the score.
         *
         * @param scoreToAdd    The score to add.
         */
        public static increaseScore(scoreToAdd: number): void {
            GameData.score += scoreToAdd;
            GameData.onScoreChanged.invoke();
        }

        /**
         * Resets the game data.
         */
        public static reset(): void {
            GameData.score = 0;
            GameData.availableLives = Constants.AVAILABLE_LIVES;
        }
    }
}
