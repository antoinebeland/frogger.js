/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    import Logger = Utils.Logger;
    import LogLevel = Utils.LogLevel;

    export class App {

        private static resources = [
            "frog",
            "boat"
        ];

        public static initialize() {

            Logger.activeLogLevel = LogLevel.Debug;
            Logger.logMessage("Initialize Frogger.js...");


        }
    }
}

FroggerJS.App.initialize();

