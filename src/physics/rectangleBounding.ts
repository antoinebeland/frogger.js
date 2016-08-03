/// <reference path="bounding.ts" />

namespace FroggerJS.Physics {

    export class RectangleBounding implements Bounding {

        private top: PIXI.Point;
        private width: number;
        private height: number;

        public constructor(top: PIXI.Point, width: number, height: number) {
            this.top = top;
            this.width = width;
            this.height = height;
        }

        public getTop(): PIXI.Point {
            return this.top;
        }

        public getWidth(): number {
            return this.width;
        }

        public getHeight(): number {
            return this.height;
        }

        public isCollide(bounding: Bounding): boolean {

            if (bounding instanceof RectangleBounding) {

                // Solution from MDN:
                // https://developer.mozilla.org/en/docs/Games/Techniques/2D_collision_detection

                return this.top.x < bounding.getTop().x + bounding.getWidth() &&
                        this.top.x + this.width > bounding.getTop().x &&
                        this.top.y < bounding.getTop().y + bounding.getHeight() &&
                        this.height + this.top.y > bounding.getTop().y;

            } else if(bounding instanceof CircleBounding) {
                return bounding.isCollide(this);
            }
            throw "ERROR: Unknown bounding.";
        }

        public getDisplayObject(): PIXI.DisplayObject {

            let graphics = new PIXI.Graphics();
            graphics.position = this.top;
            graphics.alpha = 0.5;

            graphics.beginFill(0x0000FF);
            graphics.drawRect(0, 0, this.width, this.height);
            graphics.endFill();

            return graphics;
        }
    }
}