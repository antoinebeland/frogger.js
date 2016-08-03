/// <reference path="car.ts" />
/// <reference path="boat.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;

    export class MobileFactory {

        private imageLoader: ImageLoader;

        public constructor(imageLoader: ImageLoader) {
            this.imageLoader = imageLoader;
        }

        public createMobile(mobileName: string, orientation: Orientation, speed: number): MobileObject {

            switch (mobileName.toLowerCase()) {
                case Car.TYPE:
                    return new Car(this.imageLoader, orientation, speed);
                case Boat.TYPE:
                    return new Boat(this.imageLoader, orientation, speed);
            }
            throw "ERROR: The mobile name doesn't exist.";
        }
    }
}
