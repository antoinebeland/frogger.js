/// <reference path="mobileObject.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {
    
    import ImageLoader = FroggerJS.Graphics.ImageLoader;

    export class Boat extends MobileObject {

        public static TYPE = "boat";
        private static availableColors = [
            "red",
            "yellow"
        ];

        public constructor(imageLoader: ImageLoader, orientation: Orientation, speed: number) {

            let colorIndex = Math.floor(Math.random() * Boat.availableColors.length);
            let sprite = new PIXI.Sprite(imageLoader.get(`${Boat.TYPE}-${Boat.availableColors[colorIndex]}`));
            super(sprite, orientation, speed);
        }

        public isCollisionAccepted(): boolean {
            return true;
        }
    }
}
