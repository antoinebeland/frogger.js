namespace FroggerJS.Graphics {

    export class Ticker {

        private ticker: PIXI.ticker.Ticker;

        constructor() {
            this.ticker = PIXI.ticker.shared;
            this.ticker.autoStart = false;
            this.ticker.stop();
        }

        public register(updatable: Updatable) {
            this.ticker.add(updatable.update, updatable);
        }

        public unregister(updatable: Updatable) {
            this.ticker.remove(updatable.update, updatable);
        }

        public start() {
            this.ticker.start();
        }

        public stop() {
            this.ticker.stop();
        }
    }
}