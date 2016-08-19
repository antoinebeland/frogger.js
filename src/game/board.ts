/// <reference path="../graphics/container.ts" />
/// <reference path="../physics/collidable.ts" />
/// <reference path="../physics/rectangleBounding.ts" />

namespace FroggerJS.Game {

    import Collidable = FroggerJS.Physics.Collidable;
    import Container = FroggerJS.Graphics.Container;
    import Bounding = FroggerJS.Physics.Bounding;
    import Renderable = FroggerJS.Graphics.Renderable;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;
    import isCollidable = FroggerJS.Physics.isCollidable;
    import isRenderable = FroggerJS.Graphics.isRenderable;

    /**
     * Defines the game board.
     */
    export class Board extends Container implements Collidable {

        private bounding: Bounding;

        /**
         * Initializes a new instance of the Board class.
         *
         * @param width     The width of the board.
         * @param height    The height of the board.
         */
        public constructor(width: number, height: number) {

            super();
            this.bounding = new RectangleBounding(new PIXI.Point(0, 0), width, height);
        }

        /**
         * Adds the specified child to the board.
         *
         * @param object    The object to add to the board.
         */
        public addChild(object: PIXI.DisplayObject | Renderable | Collidable): void {

            if (object instanceof PIXI.DisplayObject || isRenderable(object)) {
                super.addChild(object);
            }
            if (FroggerJS.Constants.DISPLAY_BOUNDING && isCollidable(object)) {
                this.container.addChild((object as Collidable).getBounding().getDisplayObject());
            }
        }

        /**
         * Gets the bounding associated with the board.
         *
         * @returns {Bounding}  The bounding associated with the board.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }
    }
}
