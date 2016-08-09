namespace FroggerJS.Graphics {

    /**
     * Indicates that an object can be rendered.
     */
    export interface Renderable {

        /**
         * Gets the display object associated with the current object.
         */
        getDisplayObject(): PIXI.DisplayObject;
    }
}