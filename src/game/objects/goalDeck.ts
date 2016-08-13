/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../physics/collidable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/circleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import Renderable = FroggerJS.Graphics.Renderable;
    import Collidable = FroggerJS.Physics.Collidable;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;

    /**
     * Defines the goal deck.
     */
    export class GoalDeck implements Renderable, Collidable {

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

            const BOUNDING_FACTOR = 0.4;
            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * BOUNDING_FACTOR);
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
         * Sets the availability of the current goal deck.
         *
         * @param isAvailable   The boolean to set.
         */
        public setAvailability(isAvailable: boolean): void {
            this.availability = isAvailable;
        }
    }
}