/// <reference path="config.ts" />
/// <reference path="./audio/audioManager.ts" />
/// <reference path="./graphics/imageLoader.ts" />
/// <reference path="./graphics/ticker.ts" />
/// <reference path="./graphics/scene.ts" />
/// <reference path="./states/stateManager.ts" />
/// <reference path="./states/mainMenuState.ts" />
/// <reference path="./states/gameLevelState.ts" />
/// <reference path="./states/gameOverState.ts" />
/// <reference path="./states/endGameState.ts" />
/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    declare var PIXI: any;

    import AudioManager = FroggerJS.Audio.AudioManager;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Scene = FroggerJS.Graphics.Scene;
    import Ticker = FroggerJS.Graphics.Ticker;
    import StateManager = FroggerJS.States.StateManager;
    import MainMenuState = FroggerJS.States.MainMenuState;
    import GameLevelState = FroggerJS.States.GameLevelState;
    import GameOverState = FroggerJS.States.GameOverState;
    import EndGameState = FroggerJS.States.EndGameState;
    import Logger = Utils.Logger;
    import LogLevel = Utils.LogLevel;

    export class App {

        private static resources = {
            sprites: [
                { name: "boat-red-left",        fileName: "boat-red-left.png"           },
                { name: "boat-red-right",       fileName: "boat-red-right.png"          },
                { name: "boat-yellow-left",     fileName: "boat-yellow-left.png"        },
                { name: "boat-yellow-right",    fileName: "boat-yellow-right.png"       },
                { name: "car-blue-left",        fileName: "car-blue-left.png"           },
                { name: "car-blue-right",       fileName: "car-blue-right.png"          },
                { name: "car-green-left",       fileName: "car-green-left.png"          },
                { name: "car-green-right",      fileName: "car-green-right.png"         },
                { name: "car-red-left",         fileName: "car-red-left.png"            },
                { name: "car-red-right",        fileName: "car-red-right.png"           },
                { name: "car-white-left",       fileName: "car-white-left.png"          },
                { name: "car-white-right",      fileName: "car-white-right.png"         },
                { name: "frog",                 fileName: "frog.png"                    },
                { name: "frog-extend",          fileName: "frog-extend.png"             },
                { name: "goal",                 fileName: "goal.png"                    },
                { name: "menu-background",      fileName: "menu-background.png"         },
                { name: "menu-button",          fileName: "menu-button.png"             },
                { name: "menu-button-hovered",  fileName: "menu-button-hovered.png"     },
                { name: "menu-button-clicked",  fileName: "menu-button-clicked.png"     },
                { name: "menu-logo",            fileName: "menu-logo.png"               },
                { name: "menu-stripe",          fileName: "menu-stripe.png"             },
                { name: "grass",                fileName: "grass.png"                   },
                { name: "grass-water-top",      fileName: "grass-water-top.png"         },
                { name: "grass-water-bottom",   fileName: "grass-water-bottom.png"      },
                { name: "water",                fileName: "water.png"                   },
                { name: "road-top",             fileName: "road-top.png"                },
                { name: "road-middle-top",      fileName: "road-middle-top.png"         },
                { name: "road-middle-bottom",   fileName: "road-middle-bottom.png"      },
                { name: "road-bottom",          fileName: "road-bottom.png"             },
                { name: "panel-button",         fileName: "panel-button.png"            },
                { name: "panel-button-hovered", fileName: "panel-button-hovered.png"    },
                { name: "panel-button-clicked", fileName: "panel-button-clicked.png"    },
            ],
            sounds: [
                { name: "menu",         fileName: "menu.wav"        },
                { name: "game1",        fileName: "game1.wav"       },
                { name: "game2",        fileName: "game2.wav"       },
                { name: "game3",        fileName: "game3.wav"       },
                { name: "game4",        fileName: "game4.wav"       },
                { name: "jump",         fileName: "jump.mp3"        },
                { name: "game-over",    fileName: "game-over.wav"   },
            ]
        };

        public static initialize() {

            Logger.activeLogLevel = LogLevel.Debug;
            PIXI.utils._saidHello = true;

            Logger.logMessage("Initialize Frogger.js...", LogLevel.Info);
            Logger.logMessage("Loading resources...", LogLevel.Info);

            let audioManager = new AudioManager("assets/sounds");
            audioManager.registerMap(App.resources.sounds);
            audioManager.mute(FroggerJS.Constants.AUDIO_MUTED);

            let imageLoader = new ImageLoader("assets/sprites");
            imageLoader.registerMap(App.resources.sprites);
            imageLoader.onLoadingCompleted.register(function() {

                Logger.logMessage("Resources loaded.", LogLevel.Info);

                let ticker = new Ticker();
                let scene = new Scene(FroggerJS.Constants.WINDOW_WIDTH, FroggerJS.Constants.WINDOW_HEIGHT);

                let stateManager = new StateManager();
                stateManager.register("mainMenu", new MainMenuState(scene, imageLoader, audioManager, stateManager));
                stateManager.register("gameOver", new GameOverState(scene, imageLoader, audioManager, stateManager));
                stateManager.register("endGame", new EndGameState());

                let level = 1;
                for (var levelConfiguration of FroggerJS.Levels) {

                    levelConfiguration.level = level;
                    levelConfiguration.levelsCount = FroggerJS.Levels.count;

                    stateManager.register(`level${level}`,
                        new GameLevelState(scene, imageLoader, ticker, audioManager, levelConfiguration, stateManager));

                    ++level;
                }
                stateManager.change("mainMenu");

                ticker.register(scene);
                ticker.start();
            });
            imageLoader.load();
        }
    }
}

FroggerJS.App.initialize();
