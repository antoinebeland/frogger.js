/// <reference path="state.ts" />

namespace FroggerJS.States {

    export class StateManager {

        private currentState : State;
        private states : { [name: string]: State } = {};

        public register(name: string, state: State) {
            this.states[name] = state;
        }

        public change(name : string) {

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