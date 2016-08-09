namespace FroggerJS.Graphics {

    /**
     * Indicates that an object can be update.
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