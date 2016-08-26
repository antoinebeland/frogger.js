/// <reference path="bonus.ts" />
/// <reference path="../gameData.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../math/linearInterpolation.ts" />
/// <reference path="../../physics/circleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import GameData = FroggerJS.Game.GameData;
    import AudioManager = FroggerJS.Audio.AudioManager;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Interpolation = FroggerJS.Math.Interpolation;
    import InterpolationRepetition = FroggerJS.Math.InterpolationRepetition;
    import LinearInterpolation = FroggerJS.Math.LinearInterpolation;

    /**
     * Defines the 'Heart' bonus.
     */
    export class Heart extends Bonus {

        public static TYPE = "heart";

        private static BOUNDING_FACTOR = 0.3;
        private static MIN_SCALE = 0.8;
        private static MAX_SCALE = 1;
        private static SCALE_INCREMENT = 0.005;

        private sprite: PIXI.Sprite;
        private bounding: Bounding;
        private interpolation: Interpolation;

        /**
         * Initializes a new instance of the Heart class.
         *
         * @param imageLoader       The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {
            super();

            this.sprite = new PIXI.Sprite(imageLoader.get(Heart.TYPE));
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;

            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * Heart.BOUNDING_FACTOR);
            this.interpolation = new LinearInterpolation({
                minValue: Heart.MIN_SCALE,
                maxValue: Heart.MAX_SCALE,
                increment: Heart.SCALE_INCREMENT,
                repetition: InterpolationRepetition.Inverse
            });
        }

        /**
         * Applies the concrete bonus.
         */
        protected applyConcrete(): void {
            GameData.setAvailableLives(GameData.getAvailableLives() + 1);
        }

        /**
         * Gets the display object associated with the heart.
         *
         * @returns {PIXI.Sprite}   The display object associated with the heart.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the heart.
         *
         * @returns {Bounding}      The bounding object associated with the heart.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Updates the scale of the heart based on the specified delta time.
         *
         * @param deltaTime         The delta time to use.
         */
        public update(deltaTime: number): void {

            if (!this.isAvailable()) {
                return;
            }
            let scale = this.interpolation.next(deltaTime);
            this.sprite.scale.x = scale;
            this.sprite.scale.y = scale;
        }
    }
}