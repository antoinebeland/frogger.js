/// <reference path="../../config.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/updatable.ts" />
/// <reference path="../../physics/collidable.ts" />

namespace FroggerJS.Game.Objects {

    import Renderable = FroggerJS.Graphics.Renderable;
    import Collidable = FroggerJS.Physics.Collidable;
    import Bounding = FroggerJS.Physics.Bounding;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;
    import Updatable = FroggerJS.Graphics.Updatable;

    export abstract class MobileObject implements Renderable, Collidable, Updatable {

        private speed: number;
        private speedDecimal = 0;
        private orientation: string;
        
        public constructor(speed: number, orientation: string) {
            this.speed = speed;

            orientation = orientation.toLowerCase();
            if(orientation != "left" && orientation != "right") {
                throw "ERROR: Invalid orientation specified";
            }
            this.orientation = orientation;
        }

        public abstract getDisplayObject(): PIXI.Sprite;
        public abstract getBounding(): Bounding;
        public abstract isCollisionAccepted(): boolean; // TODO: Change the name of this function.

        public update(deltaTime: number): void {

            this.speedDecimal += this.speed * deltaTime;
            let speedToApply = Math.floor(this.speedDecimal);
            this.speedDecimal = this.speedDecimal % 1;

            let sprite = this.getDisplayObject();
            sprite.position.x += (this.orientation == "left") ? -speedToApply : speedToApply;

            // Checks if the sprite is out of bound.
            if (sprite.position.x > FroggerJS.Constants.WINDOW_WIDTH + sprite.width) {
                sprite.position.x = -sprite.width;

            } else if(sprite.position.x < -sprite.width) {
                sprite.position.x = FroggerJS.Constants.WINDOW_WIDTH + sprite.width;
            }
        }
    }
}
