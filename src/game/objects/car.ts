/// <reference path="mobileObject.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;

    export class Car extends MobileObject {
        
        public static TYPE = "car";
        private static availableColors = [
            "blue",
            "green",
            "red",
            "white"
        ];

        public constructor(imageLoader: ImageLoader, orientation: Orientation, speed: number) {
            
            let colorIndex = Math.floor(Math.random() * Car.availableColors.length);
            let sprite = new PIXI.Sprite(imageLoader.get(`${Car.TYPE}-${Car.availableColors[colorIndex]}`));
            super(sprite, orientation, speed);
        }

        public isCollisionAccepted(): boolean {
            return false;
        }
    }
}
