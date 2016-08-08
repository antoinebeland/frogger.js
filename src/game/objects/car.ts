/// <reference path="mobileObject.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/rectangleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Bounding = FroggerJS.Physics.Bounding;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;

    export class Car extends MobileObject {

        public static TYPE = "car";
        private static availableColors = [
            "blue",
            "green",
            "red",
            "white"
        ];

        private sprite: PIXI.Sprite;
        private bounding: Bounding;

        public constructor(imageLoader: ImageLoader, orientation: string, speed: number) {
            super(speed, orientation);

            let colorIndex = Math.floor(Math.random() * Car.availableColors.length);
            let surface = imageLoader.get(`${Car.TYPE}-${Car.availableColors[colorIndex]}-${orientation}`);

            this.sprite = new PIXI.Sprite(surface);
            this.bounding = new RectangleBounding(this.sprite.position, this.sprite.width, this.sprite.height);
        }

        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        public getBounding(): Bounding {
            return this.bounding;
        }

        public isCollisionAccepted(): boolean {
            return false;
        }
    }
}
