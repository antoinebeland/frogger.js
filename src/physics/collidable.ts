/// <reference path="bounding.ts" />

namespace FroggerJS.Physics {

    /**
     * Indicates that an object is collidable.
     */
    export interface Collidable {

        /**
         * Gets the bounding associated with the current object.
         */
        getBounding(): Bounding;
    }

    /**
     * Determines if the specified object implements the Collidable interface.
     *
     * @param object        The object to validate.
     * @returns {boolean}   TRUE is the object is collidable. FALSE otherwise.
     */
    export function isCollidable(object: any): object is Collidable {
        return object.getBounding !== undefined;
    }
}