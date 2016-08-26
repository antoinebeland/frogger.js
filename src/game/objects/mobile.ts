/// <reference path="orientation.ts" />
/// <reference path="../../config.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/updatable.ts" />
/// <reference path="../../math/linearInterpolation.ts" />
/// <reference path="../../physics/collidable.ts" />

namespace FroggerJS.Game.Objects {

    import Bounding = FroggerJS.Physics.Bounding;
    import Collidable = FroggerJS.Physics.Collidable;
    import Constants = FroggerJS.Constants;
    import Interpolation = FroggerJS.Math.Interpolation;
    import InterpolationRepetition = FroggerJS.Math.InterpolationRepetition;
    import LinearInterpolation = FroggerJS.Math.LinearInterpolation;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the base class for a mobile object (an object that moves automatically).
     */
    export abstract class Mobile implements Renderable, Collidable, Updatable {

        private speed: number;
        private interpolation: Interpolation = undefined;

        protected orientation: Orientation;

        /**
         * Initializes a new instance of the Mobile class.
         *
         * @param speed             The speed of the mobile.
         * @param orientation       The orientation of the mobile.
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

            let sprite = this.getDisplayObject();
            if (!this.interpolation) {
                this.interpolation = new LinearInterpolation({
                    minValue: -sprite.width,
                    maxValue: Constants.WINDOW_WIDTH + sprite.width,
                    increment: this.speed,
                    sign: (this.orientation == "left") ? -1 : 1,
                    initialValue: sprite.x,
                    repetition: InterpolationRepetition.Same
                });
            }
            sprite.position.x = this.interpolation.next(deltaTime);
        }
    }
}
