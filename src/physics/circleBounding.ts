/// <reference path="bounding.ts" />

namespace FroggerJS.Physics {

    export class CircleBounding implements Bounding {

        private center: PIXI.Point;
        private radius: number;

        public constructor(center: PIXI.Point, radius: number) {
            this.center = center;
            this.radius = radius;
        }

        public getCenter(): PIXI.Point {
            return this.center;
        }

        public getRadius(): number {
            return this.radius;
        }

        public isCollide(bounding: Bounding): boolean {

            if (bounding instanceof RectangleBounding) {

                // Solution from StackOverflow:
                // http://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle

                let widthDivided = bounding.getWidth() / 2;
                let heightDivided = bounding.getHeight() / 2;

                let distX = Math.abs(this.center.x - bounding.getTop().x - widthDivided);
                let distY = Math.abs(this.center.y - bounding.getTop().y - heightDivided);

                if (distX > (widthDivided + this.radius)) {
                    return false;
                }
                if (distY > (heightDivided + this.radius)) {
                    return false;
                }

                if (distX <= (widthDivided)) {
                    return true;
                }
                if (distY <= (heightDivided)) {
                    return true;
                }

                let dx = distX - widthDivided;
                let dy = distY - heightDivided;

                return (dx * dx + dy * dy <= (this.radius * this.radius));

            } else if(bounding instanceof CircleBounding) {

                // Solution from MDN:
                // https://developer.mozilla.org/en/docs/Games/Techniques/2D_collision_detection

                let dx = this.center.x - bounding.getCenter().x;
                let dy = this.center.y - bounding.getCenter().y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                return distance < this.radius + bounding.getRadius();
            }
            throw "ERROR: Unknown bounding.";
        }

        public getDisplayObject(): PIXI.DisplayObject {

            let graphics = new PIXI.Graphics();
            graphics.position = this.center;
            graphics.alpha = 0.5;

            graphics.beginFill(0xFF0000);
            graphics.drawCircle(0, 0, this.radius);
            graphics.endFill();

            return graphics;
        }
    }
}