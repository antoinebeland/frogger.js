/// <reference path="orientation.ts" />
/// <reference path="../../config.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/collidable.ts" />
/// <reference path="../../physics/rectangleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import Renderable = FroggerJS.Graphics.Renderable;
    import Collidable = FroggerJS.Physics.Collidable;
    import Bounding = FroggerJS.Physics.Bounding;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;

    export abstract class MobileObject implements Renderable, Collidable {

        private sprite: PIXI.Sprite;
        private bounding: RectangleBounding;
        private orientation: Orientation;
        private speed: number;
        private speedDecimal = 0;

        public constructor(sprite: PIXI.Sprite, orientation: Orientation, speed: number) {

            // TODO: Use frame instead of sprite...
            this.sprite = sprite;
            this.orientation = orientation;
            this.speed = speed;

            // Applies the rotation
            this.sprite.anchor = new PIXI.Point(0.5, 0.5);
            this.sprite.rotation = orientation;
            this.sprite.anchor = (orientation == Orientation.Right) ? new PIXI.Point(0, 1) : new PIXI.Point(1, 0);

            // TODO: Fix here!!
            this.bounding = new RectangleBounding(this.sprite.position, this.sprite.height, this.sprite.width);
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

        public getDisplayObject(): PIXI.DisplayObject {
            return this.sprite;
        }

        public getBounding(): Bounding {
            return this.bounding;
        }

        // TODO: Change the name of this function.
        public abstract isCollisionAccepted(): boolean;
    }
}
