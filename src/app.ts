/// <reference path="config.ts" />
/// <reference path="./audio/audioManager.ts" />
/// <reference path="./graphics/imageLoader.ts" />
/// <reference path="./graphics/scene.ts" />
/// <reference path="./graphics/ticker.ts" />
/// <reference path="./states/gameCompleteState.ts" />
/// <reference path="./states/gameDirectionsState.ts" />
/// <reference path="./states/gameLevelState.ts" />
/// <reference path="./states/gameOverState.ts" />
/// <reference path="./states/mainMenuState.ts" />
/// <reference path="./states/stateManager.ts" />
/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    declare var PIXI: any;

    import AudioManager = FroggerJS.Audio.AudioManager;
    import Constants = FroggerJS.Constants;
    import GameCompleteState = FroggerJS.States.GameCompleteState;
    import GameDirectionsState = FroggerJS.States.GameDirectionsState;
    import GameLevelState = FroggerJS.States.GameLevelState;
    import GameOverState = FroggerJS.States.GameOverState;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Logger = Utils.Logger;
    import LogLevel = Utils.LogLevel;
    import MainMenuState = FroggerJS.States.MainMenuState;
    import Scene = FroggerJS.Graphics.Scene;
    import StateManager = FroggerJS.States.StateManager;
    import Ticker = FroggerJS.Graphics.Ticker;

    /**
     * Defines the main class of the application.
     */
    export class App {

        private static resources = {
            sprites: [
                { name: "arrow-keys-down",      file: "arrow-keys-down.png"         },
                { name: "arrow-keys-left",      file: "arrow-keys-left.png"         },
                { name: "arrow-keys-right",     file: "arrow-keys-right.png"        },
                { name: "arrow-keys-up",        file: "arrow-keys-up.png"           },
                { name: "boat-red-left",        file: "boat-red-left.png"           },
                { name: "boat-red-right",       file: "boat-red-right.png"          },
                { name: "boat-white-left",      file: "boat-white-left.png"         },
                { name: "boat-white-right",     file: "boat-white-right.png"        },
                { name: "boat-yellow-left",     file: "boat-yellow-left.png"        },
                { name: "boat-yellow-right",    file: "boat-yellow-right.png"       },
                { name: "car-blue-left",        file: "car-blue-left.png"           },
                { name: "car-blue-right",       file: "car-blue-right.png"          },
                { name: "car-green-left",       file: "car-green-left.png"          },
                { name: "car-green-right",      file: "car-green-right.png"         },
                { name: "car-red-left",         file: "car-red-left.png"            },
                { name: "car-red-right",        file: "car-red-right.png"           },
                { name: "car-white-left",       file: "car-white-left.png"          },
                { name: "car-white-right",      file: "car-white-right.png"         },
                { name: "congrats",             file: "congrats.png"                },
                { name: "cup",                  file: "cup.png"                     },
                { name: "frog",                 file: "frog.png"                    },
                { name: "frog-dead",            file: "frog-dead.png"               },
                { name: "frog-extend",          file: "frog-extend.png"             },
                { name: "goal",                 file: "goal.png"                    },
                { name: "heart",                file: "heart.png"                   },
                { name: "background",           file: "background.png"              },
                { name: "menu-button",          file: "menu-button.png"             },
                { name: "menu-button-hovered",  file: "menu-button-hovered.png"     },
                { name: "menu-button-clicked",  file: "menu-button-clicked.png"     },
                { name: "menu-logo",            file: "menu-logo.png"               },
                { name: "small-stripe",         file: "small-stripe.png"            },
                { name: "snake-1-left",         file: "snake-1-left.png"            },
                { name: "snake-1-right",        file: "snake-1-right.png"           },
                { name: "snake-2-left",         file: "snake-2-left.png"            },
                { name: "snake-2-right",        file: "snake-2-right.png"           },
                { name: "snake-3-left",         file: "snake-3-left.png"            },
                { name: "snake-3-right",        file: "snake-3-right.png"           },
                { name: "stripe",               file: "stripe.png"                  },
                { name: "grass",                file: "grass.png"                   },
                { name: "grass-water-top",      file: "grass-water-top.png"         },
                { name: "grass-water-bottom",   file: "grass-water-bottom.png"      },
                { name: "water",                file: "water.png"                   },
                { name: "road-top",             file: "road-top.png"                },
                { name: "road-middle-top",      file: "road-middle-top.png"         },
                { name: "road-middle-bottom",   file: "road-middle-bottom.png"      },
                { name: "road-bottom",          file: "road-bottom.png"             },
                { name: "panel-button",         file: "panel-button.png"            },
                { name: "panel-button-hovered", file: "panel-button-hovered.png"    },
                { name: "panel-button-clicked", file: "panel-button-clicked.png"    },
                { name: "star",                 file: "star.png"                    },
                { name: "turtle-1-left",        file: "turtle-1-left.png"           },
                { name: "turtle-1-right",       file: "turtle-1-right.png"          },
                { name: "turtle-2-left",        file: "turtle-2-left.png"           },
                { name: "turtle-2-right",       file: "turtle-2-right.png"          },
                { name: "turtle-3-left",        file: "turtle-3-left.png"           },
                { name: "turtle-3-right",       file: "turtle-3-right.png"          }
            ],
            sounds: [
                { name: "bonus",        file: "bonus.wav"       },
                { name: "directions",   file: "directions.wav"  },
                { name: "drop",         file: "drop.mp3"        },
                { name: "game1",        file: "game1.wav"       },
                { name: "game2",        file: "game2.wav"       },
                { name: "game3",        file: "game3.wav"       },
                { name: "game4",        file: "game4.wav"       },
                { name: "game5",        file: "game5.wav"       },
                { name: "game-over",    file: "game-over.wav"   },
                { name: "hit",          file: "hit.mp3"         },
                { name: "jump",         file: "jump.mp3"        },
                { name: "menu",         file: "menu.wav"        },
                { name: "next-level",   file: "next-level.wav"  },
                { name: "win",          file: "win.wav"         },
            ]
        };

        /**
         * Initializes the application.
         */
        public static initialize() {

            Logger.activeLogLevel = Constants.ACTIVE_LOG_LEVEL;
            PIXI.utils._saidHello = true;

            Logger.logMessage("Initialize Frogger.js...", LogLevel.Info);
            Logger.logMessage("Loading resources...", LogLevel.Info);

            let audioManager = new AudioManager("assets/sounds");
            audioManager.registerMap(App.resources.sounds);
            audioManager.mute(Constants.AUDIO_MUTED);

            let imageLoader = new ImageLoader("assets/sprites");
            imageLoader.registerMap(App.resources.sprites);

            let progressBar = document.querySelector(".progress-bar") as HTMLElement;
            imageLoader.onProgressChanged.register(function (percent: string) {
                progressBar.style.width = percent;
                progressBar.innerText = percent;
            });
            imageLoader.onLoadingCompleted.register(function () {

                // Removes the loading panel.
                document.getElementById("loading-panel").style.display = "none";
                Logger.logMessage("Resources loaded.", LogLevel.Info);

                let ticker = new Ticker();
                let scene = new Scene(Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);

                let stateManager = new StateManager();
                stateManager.register("mainMenu", new MainMenuState(scene, imageLoader, audioManager, stateManager));
                stateManager.register("gameDirections", new GameDirectionsState(scene, imageLoader, ticker, audioManager, stateManager));
                stateManager.register("gameOver", new GameOverState(scene, imageLoader, audioManager, stateManager));
                stateManager.register("gameComplete", new GameCompleteState(scene, imageLoader, ticker, audioManager, stateManager));

                let level = 1;
                for (var levelConfiguration of FroggerJS.Levels) {

                    levelConfiguration.level = level;
                    levelConfiguration.levelsCount = FroggerJS.Levels.length;
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
