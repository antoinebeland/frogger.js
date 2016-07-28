namespace FroggerJS.States {

    /**
     * Defines the base methods of an application state.
     */
    export interface State {

        /**
         * Occurred when the application enters in the current state.
         */
        entered() : void;

        /**
         * Occurred when the application leaves the current state.
         */
        leaving() : void;
    }
}

