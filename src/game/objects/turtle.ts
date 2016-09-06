/// <reference path="mobile.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../math/linearInterpolation.ts" />
/// <reference path="../../physics/rectangleBounding.ts" />
/// <reference path="../../utils/random.ts" />

namespace FroggerJS.Game.Objects {

    import Bounding = FroggerJS.Physics.Bounding;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Interpolation = FroggerJS.Math.Interpolation;
    import InterpolationRepetition = FroggerJS.Math.InterpolationRepetition;
    import LinearInterpolation = FroggerJS.Math.LinearInterpolation;
    import Random = Utils.Random;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;

    /**
     * Defines a turtle.
     */
    export class Turtle extends Mobile {

        public static TYPE = "turtle";

        private static ALPHA_INCREMENT = 0.008;
        private static AVAILABILITY_DELAY = 240;
        private static MAX_ALPHA = 1;
        private static MIN_ALPHA = 0.2;
        private static TEXTURE_DELAY = 10;

        private imageLoader: ImageLoader;
        private sprite: PIXI.Sprite;
        private bounding: Bounding;

        private textureTimeSpent: number = 0;
        private availabilityTimeSpent: number = 0;
        private imageIndex: Interpolation;
        private alphaInterpolation: Interpolation;

        /**
         * Initializes a new instance of the Turtle class.
         *
         * @param imageLoader       The image loader to use.
         * @param orientation       The orientation of the turtle.
         * @param speed             The speed of the turtle.
         */
        public constructor(imageLoader: ImageLoader, orientation: Orientation, speed: number) {
            super(speed, orientation);

            this.imageLoader = imageLoader;
            this.sprite = new PIXI.Sprite(imageLoader.get(`${Turtle.TYPE}-1-${orientation}`));
            this.bounding = new RectangleBounding(this.sprite.position, this.sprite.width, this.sprite.height);

            this.imageIndex = new LinearInterpolation({
                minValue: 1,
                maxValue: 3,
                increment: 1,
                repetition: InterpolationRepetition.Inverse
            });
            this.alphaInterpolation = new LinearInterpolation({
                minValue: Turtle.MIN_ALPHA,
                maxValue: Turtle.MAX_ALPHA,
                initialValue: Turtle.MAX_ALPHA,
                increment: Turtle.ALPHA_INCREMENT,
                sign: -1,
                repetition: InterpolationRepetition.Inverse
            });
        }

        /**
         * Gets the display object associated with the turtle.
         *
         * @returns {PIXI.Sprite}   The sprite associated with the turtle.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the turtle.
         *
         * @returns {Bounding}      The bounding associated with the turtle.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Indicates if the turtle can be hit by the actor.
         *
         * @returns {boolean}       TRUE if the turtle can be hit. FALSE otherwise.
         */
        public canBeHit(): boolean {
            return this.sprite.alpha > Turtle.MIN_ALPHA;
        }

        /**
         * Updates the turtle texture, the turtle alpha and the mobile position.
         *
         * @param deltaTime         The delta time to use.
         */
        public update(deltaTime: number): void {
            super.update(deltaTime);

            // Checks if the texture must be changed.
            if (this.textureTimeSpent >= Turtle.TEXTURE_DELAY) {
                this.sprite.texture = this.imageLoader.get(`${Turtle.TYPE}-${this.imageIndex.next()}-${this.orientation}`);
                this.textureTimeSpent = 0;
            } else {
                this.textureTimeSpent += deltaTime;
            }

            // Checks if the alpha interpolation must be called.
            if (this.availabilityTimeSpent !== undefined && this.availabilityTimeSpent >= Turtle.AVAILABILITY_DELAY) {
                this.availabilityTimeSpent = undefined;
            } else if (this.availabilityTimeSpent !== undefined) {
                this.availabilityTimeSpent += deltaTime;
            } else {
                let alpha = this.alphaInterpolation.next(deltaTime);
                this.sprite.alpha = alpha;

                if (alpha == Turtle.MAX_ALPHA || alpha == Turtle.MIN_ALPHA) {
                    this.availabilityTimeSpent = 0;
                }
            }
        }
    }
}
