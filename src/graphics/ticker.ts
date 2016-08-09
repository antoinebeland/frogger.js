/// <reference path="updatable.ts" />

namespace FroggerJS.Graphics {

    /**
     * Defines a wrapper of the PIXI.ticker.
     * This wrapper uses the Updatable interface.
     */
    export class Ticker {

        private ticker: PIXI.ticker.Ticker;

        /**
         * Initializes a new instance of the Ticker class.
         */
        constructor() {
            this.ticker = PIXI.ticker.shared;
            this.ticker.autoStart = false;
            this.ticker.stop();
        }

        /**
         * Registers the specified updatable object to the ticker.
         *
         * @param updatable     The updatable object to register.
         */
        public register(updatable: Updatable) {
            this.ticker.add(updatable.update, updatable);
        }

        /**
         * Unregisters the specified object of the ticker.
         *
         * @param updatable     The updatable object to unregister.
         */
        public unregister(updatable: Updatable) {
            this.ticker.remove(updatable.update, updatable);
        }

        /**
         * Starts the ticker.
         */
        public start() {
            this.ticker.start();
        }

        /**
         * Stops the ticker.
         */
        public stop() {
            this.ticker.stop();
        }
    }
}