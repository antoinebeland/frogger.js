/// <reference path="renderable.ts" />

namespace FroggerJS.Graphics {

    /**
     * Defines a container for the application.
     */
    export class Container implements Renderable {

        protected container: PIXI.Container;

        /**
         * Initializes a new instance of the Container class.
         */
        public constructor() {
            this.container = new PIXI.Container();
        }

        /**
         * Gets the display object associated with the container.
         *
         * @returns {PIXI.Container}    The PIXI container associated with the current object.
         */
        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }

        /**
         * Adds a child to the current container.
         *
         * @param object    The object to add.
         */
        public addChild(object: PIXI.DisplayObject | Renderable): void {

            if (object instanceof PIXI.DisplayObject) {
                this.container.addChild(object);
            } else {
                this.container.addChild((object as Renderable).getDisplayObject());
            }
        }

        /**
         * Removes the specified object of the container.
         *
         * @param object    The object to remove.
         */
        public removeChild(object: PIXI.DisplayObject | Renderable): void {

            if (object instanceof PIXI.DisplayObject) {
                this.container.removeChild(object);
            } else {
                this.container.removeChild((object as Renderable).getDisplayObject());
            }
        }

        /**
         * Clears all the objects of the container
         */
        public clear() {
            this.container.removeChildren();
        }
    }
}