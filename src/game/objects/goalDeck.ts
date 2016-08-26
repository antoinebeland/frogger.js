/// <reference path="../gameData.ts" />
/// <reference path="../../config.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../physics/collidable.ts" />
/// <reference path="../../physics/circleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import Bounding = FroggerJS.Physics.Bounding;
    import Constants = FroggerJS.Constants;
    import CircleBounding = FroggerJS.Physics.CircleBounding;
    import Collidable = FroggerJS.Physics.Collidable;
    import GameData = FroggerJS.Game.GameData;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;

    /**
     * Defines the goal deck.
     */
    export class GoalDeck implements Renderable, Collidable {

        private static BOUNDING_FACTOR = 0.4;

        private sprite: PIXI.Sprite;
        private bounding: Bounding;
        private availability: boolean;

        /**
         * Initializes a new instance of the GoalDeck class.
         *
         * @param imageLoader       The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {
            
            this.sprite = new PIXI.Sprite(imageLoader.get("goal"));
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;

            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * GoalDeck.BOUNDING_FACTOR);
            this.availability = true;
        }

        /**
         * Gets the display object associated with the goal deck.
         *
         * @returns {PIXI.Sprite}   The sprite associated with the goal deck.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the goal deck.
         *
         * @returns {Bounding}      The bounding associated with the goal deck.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Indicates if the current goal deck is available.
         *
         * @returns {boolean}   TRUE if the deck is available. FALSE otherwise.
         */
        public isAvailable(): boolean {
            return this.availability;
        }

        /**
         * Occupies the goal deck.
         */
        public occupy(): void {

            if (!this.availability) {
                return;
            }
            this.availability = false;
            GameData.increaseScore(Constants.GOAL_SCORE);
        }
    }
}