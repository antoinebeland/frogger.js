/// <reference path="orientation.ts" />
/// <reference path="../../configuration.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {

    import Renderable = FroggerJS.Graphics.Renderable;

    export abstract class Mobile implements Renderable {
        
        private speedDecimal = 0;

        protected sprite: PIXI.Sprite;
        protected orientation: Orientation;
        protected speed: number;

        public constructor(sprite: PIXI.Sprite, orientation: Orientation, speed: number) {

            this.sprite = sprite;
            this.orientation = orientation;
            this.speed = speed;

            this.sprite.anchor = new PIXI.Point(0.5, 0.5);
            this.sprite.rotation = orientation;
            this.sprite.anchor = (orientation == Orientation.Right) ? new PIXI.Point(0, 0) : new PIXI.Point(1, 1);
        }

        public updatePosition(): void {

            let speedToApply = this.speed;

            // Checks if the speed is an integer.
            if (this.speed % 1 != 0) {
                this.speedDecimal += this.speed;
                speedToApply = Math.floor(this.speedDecimal);
                this.speedDecimal = this.speedDecimal % 1;
            }

            // Updates the sprite position based on the orientation.
            this.sprite.position.x += (this.orientation == Orientation.Left) ? -speedToApply : speedToApply;

            // Checks if the sprite is out of bound.
            if (this.sprite.position.x > FroggerJS.Constants.WINDOW_WIDTH + this.sprite.height) {
                this.sprite.position.x = -this.sprite.height;

            } else if(this.sprite.position.x < -this.sprite.height) {
                this.sprite.position.x = FroggerJS.Constants.WINDOW_WIDTH + this.sprite.height;
            }
        }

        public getSprite(): PIXI.Sprite {
            return this.sprite;
        }

        public abstract isCollisionAccepted(): boolean;
    }
}
