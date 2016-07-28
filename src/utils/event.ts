namespace Utils {

    /**
     * Defines an event
     * @see http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes
     */
    export class Event<T> {
        private handlers: { (data?: T): void; }[] = [];

        /**
         * Registers an handler.
         * @param handler   Handler to register.
         */
        public register(handler: { (data?: T): void }) {
            this.handlers.push(handler);
        }

        /**
         * Unregisters an handler.
         * @param handler   Handler to unregister.
         */
        public unregister(handler: { (data?: T): void }) {
            this.handlers = this.handlers.filter(h => h !== handler);
        }

        /**
         * Invoke the event.
         * @param data      The data to pass to the handlers.
         */
        public invoke(data?: T) {
            this.handlers.slice(0).forEach(h => h(data));
        }
    }
}