/// <reference path="bonus.ts" />
/// <reference path="../gameData.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/circleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import GameData = FroggerJS.Game.GameData;
    import AudioManager = FroggerJS.Audio.AudioManager;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;

    /**
     * Defines the 'Star' bonus.
     */
    export class Star extends Bonus {

        public static TYPE = "star";

        private static MIN_SCALE = 0.85;
        private static MAX_SCALE = 1;
        private static SCALE_FACTOR = 0.005;
        private static SCORE_INCREMENT = 100;

        private sprite: PIXI.Sprite;
        private bounding: Bounding;
        private animationSign: number = -1;

        /**
         * Initializes a new instance of the Star class.
         *
         * @param imageLoader       The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {
            super();

            this.sprite = new PIXI.Sprite(imageLoader.get(Star.TYPE));
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;

            const BOUNDING_FACTOR = 0.3;
            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * BOUNDING_FACTOR);
        }

        /**
         * Applies the concrete bonus.
         */
        protected applyConcrete(): void {
            GameData.increaseScore(Star.SCORE_INCREMENT);
        }

        /**
         * Gets the display object associated with the star.
         *
         * @returns {PIXI.Sprite}   The display object associated with the star.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the star.
         *
         * @returns {Bounding}      The bounding object associated with the star.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Updates the scale of the star based on the specified delta time.
         *
         * @param deltaTime         The delta time to use.
         */
        public update(deltaTime: number): void {

            // TODO: Changed this!
            let scale = this.sprite.scale.x + this.animationSign * Star.SCALE_FACTOR;
            if (scale >= Star.MAX_SCALE) {
                this.animationSign = -1;
                scale = Star.MAX_SCALE;
            } else if (scale <= Star.MIN_SCALE) {
                this.animationSign = 1;
                scale = Star.MIN_SCALE;
            }
            this.sprite.scale.x = scale;
            this.sprite.scale.y = scale;
        }
    }
}