/// <reference path="mobile.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/rectangleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Bounding = FroggerJS.Physics.Bounding;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;

    /**
     * Defines a car.
     */
    export class Car extends Mobile {

        public static TYPE = "car";
        private static availableColors = [
            "blue",
            "green",
            "red",
            "white"
        ];

        private sprite: PIXI.Sprite;
        private bounding: Bounding;

        /**
         * Initializes a new instance of the Car class.
         *
         * @param imageLoader       The image loader to use.
         * @param orientation       The orientation of the car.
         * @param speed             The speed of the car.
         */
        public constructor(imageLoader: ImageLoader, orientation: Orientation, speed: number) {
            super(speed, orientation);

            let colorIndex = Math.floor(Math.random() * Car.availableColors.length);
            let surface = imageLoader.get(`${Car.TYPE}-${Car.availableColors[colorIndex]}-${orientation}`);

            this.sprite = new PIXI.Sprite(surface);
            this.bounding = new RectangleBounding(this.sprite.position, this.sprite.width, this.sprite.height);
        }

        /**
         * Gets the display object associated with the car.
         *
         * @returns {PIXI.Sprite}   The sprite associated with the car.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the car.
         *
         * @returns {Bounding}      The bounding associated with the car.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Indicates if the car can be hit by the actor.
         *
         * @returns {boolean}       FALSE: the car cannot be hit by the actor.
         */
        public canBeHit(): boolean {
            return false;
        }
    }
}
