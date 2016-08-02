/// <reference path="orientation.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;

    export class Car implements Renderable {

        private sprite: PIXI.Sprite;
        private orientation: Orientation;
        private speed: number;
        private speedDecimal: number;

        private static availableColors = [
            "blue",
            "green",
            "red",
            "white"
        ];

        public constructor(imageLoader: ImageLoader, orientation: Orientation, speed: number) {
            let colorIndex = Math.floor(Math.random() * Car.availableColors.length);
            this.sprite = new PIXI.Sprite(imageLoader.get("car-" + Car.availableColors[colorIndex]));
            this.orientation = orientation;
            this.speed = speed;
            this.speedDecimal = 0;

            this.sprite.scale.x = 0.5;
            this.sprite.scale.y = 0.5;
            this.sprite.anchor = new PIXI.Point(0.5, 0.5);
            this.sprite.rotation = orientation;
            this.sprite.anchor = (orientation == Orientation.Right) ? new PIXI.Point(0, 0) : new PIXI.Point(1, 1);
        }

        public updatePosition(): void {

            let speedToApply = this.speed;
            
            if(this.speed % 1 != 0) {
                this.speedDecimal += this.speed;
                speedToApply = Math.floor(this.speedDecimal);
                this.speedDecimal = this.speedDecimal % 1;
            }

            this.sprite.position.x += (this.orientation == Orientation.Left) ? -speedToApply : speedToApply;
            if (this.sprite.position.x > 800 + this.sprite.height) {
                this.sprite.position.x = -this.sprite.height;
            } else if(this.sprite.position.x < -this.sprite.height) {
                this.sprite.position.x = 800 + this.sprite.height;
            }
        }

        public getSprite(): PIXI.Sprite {
            return this.sprite;
        }
    }
}
