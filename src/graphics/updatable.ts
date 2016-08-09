namespace FroggerJS.Graphics {

    /**
     * Indicates that an object can be updated.
     */
    export interface Updatable {

        /**
         * Updates the specified object.
         *
         * @param deltaTime     The delta time to use.
         */
        update(deltaTime: number): void;
    }
}