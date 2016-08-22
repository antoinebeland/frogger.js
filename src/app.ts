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

    export class App {

        private static resources = {
            sprites: [
                { name: "arrow-keys-down",      file: "arrow-keys-down.png"         },
                { name: "arrow-keys-left",      file: "arrow-keys-left.png"         },
                { name: "arrow-keys-right",     file: "arrow-keys-right.png"        },
                { name: "arrow-keys-up",        file: "arrow-keys-up.png"           },
                { name: "boat-red-left",        file: "boat-red-left.png"           },
                { name: "boat-red-right",       file: "boat-red-right.png"          },
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
                { name: "frog-extend",          file: "frog-extend.png"             },
                { name: "goal",                 file: "goal.png"                    },
                { name: "background",           file: "background.png"              },
                { name: "menu-button",          file: "menu-button.png"             },
                { name: "menu-button-hovered",  file: "menu-button-hovered.png"     },
                { name: "menu-button-clicked",  file: "menu-button-clicked.png"     },
                { name: "menu-logo",            file: "menu-logo.png"               },
                { name: "small-stripe",         file: "small-stripe.png"            },
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
            ],
            sounds: [
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
