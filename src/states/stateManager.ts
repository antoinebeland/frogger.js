/// <reference path="state.ts" />

namespace FroggerJS.States {

    /**
     * Manages the states of the application.
     */
    export class StateManager {

        private currentState : State;
        private states : { [name: string]: State } = {};

        /**
         * Registers the state with the specified name.
         *
         * @param name      The name associated with the specified state.
         * @param state     The state to register.
         */
        public register(name: string, state: State): void {
            this.states[name] = state;
        }

        /**
         * Changes the current state of the application.
         *
         * @param name      The name associated with the state to switch.
         */
        public change(name: string): void {

            if(!(name in this.states)) {
                throw "ERROR: The specified name for the state doesn't exist.";
            }

            let nextState = this.states[name];
            if (this.currentState) {
                this.currentState.leaving();
            }

            this.currentState = nextState;
            this.currentState.entered();
        }
    }
}