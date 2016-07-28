namespace Utils {

    /**
     * The log levels available in the application.
     */
    export enum LogLevel {
        DEBUG = 1,
        INFO,
        WARNING,
        ERROR
    }

    /**
     * Defines the methods used to log.
     */
    export class Logger {

        /**
         * Gets or sets the active log level for the logger.
         * @type {Utils.LogLevel}
         */
        static activeLogLevel: LogLevel = LogLevel.DEBUG;

        /**
         * Logs a message in the console with the specified log level.
         *
         * @param message       The message to log.
         * @param logLevel      The log level associated with the message.
         */
        static logMessage(message: any, logLevel: LogLevel = LogLevel.DEBUG) {

            if (Logger.activeLogLevel > logLevel) {
               return;
            }

            switch (logLevel) {

                case LogLevel.DEBUG:
                    console.log("DEBUG: " + message);
                    break;

                case LogLevel.INFO:
                    console.info("INFO: " + message);
                    break;

                case LogLevel.WARNING:
                    console.warn("WARNING: " + message);
                    break;

                case LogLevel.ERROR:
                    console.error("ERROR:" + message);
            }
        }
    }
}