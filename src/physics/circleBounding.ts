/// <reference path="bounding.ts" />

namespace FroggerJS.Physics {

    /**
     * Defines a circle bounding.
     */
    export class CircleBounding implements Bounding {

        private center: PIXI.Point;
        private radius: number;

        /**
         * Initializes a new instance of the CircleBounding class.
         * @param center    The center point of the circle.
         * @param radius    The radius of the circle.
         */
        public constructor(center: PIXI.Point, radius: number) {
            this.center = center;
            this.radius = radius;
        }

        /**
         * Gets the center point of the circle.
         * @returns {PIXI.Point}
         */
        public getCenter(): PIXI.Point {
            return this.center;
        }

        /**
         * Gets the radius point of the circle.
         * @returns {number}
         */
        public getRadius(): number {
            return this.radius;
        }

        /**
         * Indicates if there is a collision between the current and the specified bounding.
         * @param bounding      The bounding to check.
         * @return {boolean}    TRUE if there is a collision between the current and the specified bounding.
         *                      FALSE otherwise.
         */
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

        /**
         * Gets the display object associated with the current bounding.
         * @returns {FroggerJS.Graphics|PIXI.Graphics}
         */
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