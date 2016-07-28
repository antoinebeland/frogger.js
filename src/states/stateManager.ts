/// <reference path="state.ts" />
/// <reference path="updatableState.ts" />

namespace FroggerJS.States {

    export class StateManager {

        private currentState : State;
        private isUpdatableState : boolean = false;

        public constructor() {

        }

        public change(nextState : State) {

            if (this.currentState) {
                this.currentState.leaving();
            }

            this.currentState = nextState;
            this.currentState.entered();
            this.isUpdatableState = this.currentState.hasOwnProperty("update");
        }

        public getCurrent() : State {
            return this.currentState;
        }

        private update() {
            if(this.isUpdatableState) {
                (this.currentState as UpdatableState).update();
            }
        }
    }
}