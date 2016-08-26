/// <reference path="boat.ts" />
/// <reference path="car.ts" />
/// <reference path="snake.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;

    /**
     * Defines a factory for the mobile objects.
     */
    export class MobileFactory {

        private imageLoader: ImageLoader;

        /**
         * Initializes a new instance of the MobileFactory class.
         *
         * @param imageLoader   The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {
            this.imageLoader = imageLoader;
        }

        /**
         * Creates a new mobile based on the specified parameters.
         *
         * @param mobileName    The mobile name to create (name of the class).
         * @param orientation   The orientation of the mobile.
         * @param speed         The speed of the mobile.
         * @returns {Mobile}    A new instance of a mobile based on the specified features.
         */
        public create(mobileName: string, orientation: Orientation, speed: number): Mobile {

            switch (mobileName.toLowerCase()) {
                case Car.TYPE:
                    return new Car(this.imageLoader, orientation, speed);
                case Boat.TYPE:
                    return new Boat(this.imageLoader, orientation, speed);
                case Snake.TYPE:
                    return new Snake(this.imageLoader, orientation, speed);
            }
            throw new Error("The mobile name doesn't exist.");
        }
    }
}
