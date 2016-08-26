/// <reference path="mobile.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../math/linearInterpolation.ts" />
/// <reference path="../../physics/rectangleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import Bounding = FroggerJS.Physics.Bounding;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Interpolation = FroggerJS.Math.Interpolation;
    import InterpolationRepetition = FroggerJS.Math.InterpolationRepetition;
    import LinearInterpolation = FroggerJS.Math.LinearInterpolation;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;

    /**
     * Defines a snake.
     */
    export class Snake extends Mobile {

        public static TYPE = "snake";
        private static DELAY = 6;

        private imageLoader: ImageLoader;
        private sprite: PIXI.Sprite;
        private bounding: Bounding;

        private timeSpent: number = 0;
        private imageIndex : Interpolation;

        /**
         * Initializes a new instance of the Snake class.
         *
         * @param imageLoader       The image loader to use.
         * @param orientation       The orientation of the snake.
         * @param speed             The speed of the snake.
         */
        public constructor(imageLoader: ImageLoader, orientation: Orientation, speed: number) {
            super(speed, orientation);

            this.imageLoader = imageLoader;
            this.sprite = new PIXI.Sprite(imageLoader.get(`${Snake.TYPE}-1-${orientation}`));
            this.bounding = new RectangleBounding(this.sprite.position, this.sprite.width, this.sprite.height);
            this.imageIndex = new LinearInterpolation({
                minValue: 1,
                maxValue: 3,
                increment: 1,
                repetition: InterpolationRepetition.Inverse
            });
        }

        /**
         * Gets the display object associated with the snake.
         *
         * @returns {PIXI.Sprite}   The sprite associated with the snake.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the snake.
         *
         * @returns {Bounding}      The bounding associated with the snake.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Indicates if the snake can be hit by the actor.
         *
         * @returns {boolean}       FALSE: the snake cannot be hit by the actor.
         */
        public canBeHit(): boolean {
            return false;
        }

        /**
         * Updates the snake texture and the mobile position.
         *
         * @param deltaTime         The delta time to use.
         */
        public update(deltaTime: number): void {
            super.update(deltaTime);

            // Checks if the texture must be changed.
            if (this.timeSpent >= Snake.DELAY) {
                this.sprite.texture = this.imageLoader.get(`${Snake.TYPE}-${this.imageIndex.next()}-${this.orientation}`);
                this.timeSpent = 0;
            } else {
                this.timeSpent += deltaTime;
            }
        }
    }
}
