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
}