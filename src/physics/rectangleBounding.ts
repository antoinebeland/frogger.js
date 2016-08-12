/// <reference path="bounding.ts" />

namespace FroggerJS.Physics {

    /**
     * Defines a rectangle bounding.
     */
    export class RectangleBounding implements Bounding {

        private top: PIXI.Point;
        private width: number;
        private height: number;

        /**
         * Initializes a new instance of the RectangleBounding class.
         *
         * @param top       The top position of the rectangle (point).
         * @param width     The width of the rectangle in pixels.
         * @param height    The height of the rectangle in pixels.
         */
        public constructor(top: PIXI.Point, width: number, height: number) {
            this.top = top;
            this.width = width;
            this.height = height;
        }

        /**
         * Gets the top point associated with the rectangle.
         *
         * @returns {PIXI.Point}    The top point of the rectangle.
         */
        public getTop(): PIXI.Point {
            return this.top;
        }

        /**
         * Gets the width of the rectangle.
         *
         * @returns {number}        The width of the rectangle in pixels.
         */
        public getWidth(): number {
            return this.width;
        }

        /**
         * Gets the height of the rectangle.
         *
         * @returns {number}        The height of the rectangle in pixels.
         */
        public getHeight(): number {
            return this.height;
        }

        /**
         * Indicates if there is a collision between the current and the specified bounding.
         *
         * @param bounding      The bounding to check.
         * @return {boolean}    TRUE if there is a collision between the current and the specified bounding.
         *                      FALSE otherwise.
         */
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
            throw new Error("Unknown bounding.");
        }

        /**
         * Gets the display object associated with the bounding.
         *
         * @returns {PIXI.Graphics|FroggerJS.Graphics}  The display object associated the rectangle bounding.
         */
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