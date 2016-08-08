/// <reference path="mobileObject.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/rectangleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Bounding = FroggerJS.Physics.Bounding;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;

    export class Boat extends MobileObject {

        public static TYPE = "boat";
        private static availableColors = [
            "red",
            "yellow"
        ];

        private sprite: PIXI.Sprite;
        private bounding: Bounding;

        public constructor(imageLoader: ImageLoader, orientation: string, speed: number) {
            super(speed, orientation);
            
            let colorIndex = Math.floor(Math.random() * Boat.availableColors.length);
            let surface = imageLoader.get(`${Boat.TYPE}-${Boat.availableColors[colorIndex]}-${orientation}`);

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
            return true;
        }
    }
}
