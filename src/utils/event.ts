namespace Utils {

    /**
     * Defines an event.
     *
     * @see http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes
     */
    export class Event<T> {
        
        private handlers: { handler: {(data?: T): void}, context: any }[] = [];

        /**
         * Registers an handler.
         *
         * @param handler       Handler to register.
         * @param [context]     The context to use with the handler.
         */
        public register(handler: { (data?: T): void }, context?: any) {

            if (!context) {
                context = this;
            }
            this.handlers.push({ handler: handler, context: context });
        }

        /**
         * Unregisters an handler.
         *
         * @param handler       Handler to unregister.
         * @param [context]     The context associated with the handler to unregister.
         */
        public unregister(handler: { (data?: T): void }, context?: any) {

            if(!context) {
                context = this;
            }
            this.handlers = this.handlers.filter(h => h.handler !== handler && h.context !== context);
        }

        /**
         * Invokes the event.
         *
         * @param [data]        The data to pass to the handlers.
         */
        public invoke(data?: T) {
            this.handlers.slice(0).forEach(h => h.handler.call(h.context, data));
        }
    }
}