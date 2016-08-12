/// <reference path="../../config.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/updatable.ts" />
/// <reference path="../../physics/collidable.ts" />

namespace FroggerJS.Game.Objects {

    import Renderable = FroggerJS.Graphics.Renderable;
    import Collidable = FroggerJS.Physics.Collidable;
    import Updatable = FroggerJS.Graphics.Updatable;
    import Bounding = FroggerJS.Physics.Bounding;

    /**
     * Defines the base class for a mobile object (an object that moves automatically).
     */
    export abstract class Mobile implements Renderable, Collidable, Updatable {

        private speed: number;
        private speedDecimal = 0;
        private orientation: Orientation;

        /**
         * Initializes a new instance of the Mobile class.
         *
         * @param speed         The speed of the mobile.
         * @param orientation   The orientation of the mobile.
         */
        constructor(speed: number, orientation: Orientation) {

            this.speed = speed;
            this.orientation = orientation;
        }

        /**
         * Gets the display object associated with the mobile.
         */
        public abstract getDisplayObject(): PIXI.Sprite;

        /**
         * Gets the bounding associated with the mobile.
         */
        public abstract getBounding(): Bounding;

        /**
         * Indicates if the current mobile can be hit by the actor.
         */
        public abstract canBeHit(): boolean;

        /**
         * Updates the position of the mobile based on the speed and the orientation.
         *
         * @param deltaTime     The delta time to use.
         */
        public update(deltaTime: number): void {

            this.speedDecimal += this.speed * deltaTime;
            let speedToApply = Math.floor(this.speedDecimal);
            this.speedDecimal = this.speedDecimal % 1;

            let sprite = this.getDisplayObject();
            sprite.position.x += (this.orientation == Orientation.Left) ? -speedToApply : speedToApply;

            // Checks if the sprite is out of bound.
            if (sprite.position.x > FroggerJS.Constants.WINDOW_WIDTH + sprite.width) {
                sprite.position.x = -sprite.width;

            } else if(sprite.position.x < -sprite.width) {
                sprite.position.x = FroggerJS.Constants.WINDOW_WIDTH + sprite.width;
            }
        }
    }
}
