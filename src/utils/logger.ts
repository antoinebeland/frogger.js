namespace Utils {

    /**
     * The log levels available in the application.
     */
    export enum LogLevel {
        Debug = 1,
        Info,
        Warning,
        Error
    }

    /**
     * Defines the methods used to log.
     */
    export class Logger {

        /**
         * Gets or sets the active log level for the logger.
         * @type {Utils.LogLevel}
         */
        static activeLogLevel: LogLevel = LogLevel.Debug;

        /**
         * Logs a message in the console with the specified log level.
         *
         * @param message       The message to log.
         * @param logLevel      The log level associated with the message.
         */
        static logMessage(message: any, logLevel: LogLevel = LogLevel.Debug) {

            if (Logger.activeLogLevel > logLevel) {
               return;
            }

            switch (logLevel) {

                case LogLevel.Debug:
                    console.log("[DEBUG] " + message);
                    break;

                case LogLevel.Info:
                    console.info("[INFO] " + message);
                    break;

                case LogLevel.Warning:
                    console.warn("[WARNING] " + message);
                    break;

                case LogLevel.Error:
                    console.error("[ERROR] " + message);
            }
        }
    }
}