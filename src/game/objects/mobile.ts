/// <reference path="../../config.ts" />
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
        private orientation: string;

        /**
         * Initializes a new instance of the Mobile class.
         *
         * @param speed         The speed of the mobile.
         * @param orientation   The orientation of the mobile.
         */
        protected constructor(speed: number, orientation: string) {

            // TODO: Make the validation in other place!
            orientation = orientation.toLowerCase();
            if(orientation != "left" && orientation != "right") {
                throw "ERROR: Invalid orientation specified";
            }


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
         * @param deltaTime     The delta time.
         */
        public update(deltaTime: number): void {

            this.speedDecimal += this.speed * deltaTime;
            let speedToApply = Math.floor(this.speedDecimal);
            this.speedDecimal = this.speedDecimal % 1;

            let sprite = this.getDisplayObject();
            sprite.position.x += (this.orientation == "left") ? -speedToApply : speedToApply;

            // Checks if the sprite is out of bound.
            if (sprite.position.x > FroggerJS.Constants.WINDOW_WIDTH + sprite.width) {
                sprite.position.x = -sprite.width;

            } else if(sprite.position.x < -sprite.width) {
                sprite.position.x = FroggerJS.Constants.WINDOW_WIDTH + sprite.width;
            }
        }
    }
}
