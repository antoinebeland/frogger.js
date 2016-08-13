/// <reference path="../graphics/renderable.ts" />

namespace FroggerJS.Physics {

    import Renderable = FroggerJS.Graphics.Renderable;

    /**
     * Defines the interface for a bounding.
     */
    export interface Bounding extends Renderable {

        /**
         * Indicates if there is a collision between the current and the specified bounding.
         *
         * @param bounding      The bounding to check.
         */
        isCollide(bounding: Bounding): boolean;
    }
}
