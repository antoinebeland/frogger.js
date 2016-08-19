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

    /**
     * Determines if the specified object implements the Renderable interface.
     *
     * @param object        The object to validate.
     * @returns {boolean}   TRUE is the object is renderable. FALSE otherwise.
     */
    export function isRenderable(object: any) : object is Renderable {
        return object.getDisplayObject !== undefined && object.getDisplayObject() instanceof PIXI.DisplayObject;
    }
}