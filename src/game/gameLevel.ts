/// <reference path="actor.ts" />
/// <reference path="gameLevelParser.ts" />
/// <reference path="objects/goalDeck.ts" />
/// <reference path="../config.ts" />
/// <reference path="../audio/audioManager.ts" />
/// <reference path="../graphics/updatable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../utils/event.ts" />
/// <reference path="../utils/logger.ts" />

namespace FroggerJS.Game {

    import Actor = FroggerJS.Game.Actor;
    import AudioManager = FroggerJS.Audio.AudioManager;
    import Constants = FroggerJS.Constants;
    import Container = PIXI.Container;
    import Event = Utils.Event;
    import GoalDeck = FroggerJS.Game.Objects.GoalDeck;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Logger = Utils.Logger;
    import Mobile = FroggerJS.Game.Objects.Mobile;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the labels to display during the game.
     */
    type GameTextLabels = {
        livesCount: PIXI.Text,
        currentLevel: PIXI.Text
    }

    /**
     * Defines a game level.
     */
    export class GameLevel implements Updatable {

        private static FALL_SOUND_NAME = "drop";
        private static HIT_SOUND_NAME = "hit";
        private static LIVES_BASE_TEXT = "\u2764 \u00D7";
        private static SOUNDTRACK_FADE_DURATION = 500;
        private static SOUNDTRACK_VOLUME = 0.35;

        private imageLoader: ImageLoader;
        private audioManager: AudioManager;
        private board : Board;
        private labels: GameTextLabels;
        private isStarted = false;

        private actor: Actor;
        private mobiles: Mobile[][];
        private goals: GoalDeck[];
        private touchAllowedStatus: boolean[];
        private soundtrack: string;

        /**
         * Occurred when the game is over.
         *
         * @type {Utils.Event<void>}
         */
        public onGameOver = new Event<void>();

        /**
         * Occurred when the next level is reached.
         *
         * @type {Utils.Event<void>}
         */
        public onNextLevel = new Event<void>();

        /**
         * Initializes a new instance of the GameLevel class.
         *
         * @param imageLoader           The image loader to use.
         * @param audioManager          The audio manager to use.
         * @param levelConfiguration    The level configuration to load.
         */
        public constructor(imageLoader: ImageLoader, audioManager: AudioManager, levelConfiguration: any) {

            this.imageLoader = imageLoader;
            this.audioManager = audioManager;
            this.board = new Board(Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);
            this.setup(levelConfiguration);
        }

        /**
         * Setups the specified level configuration.
         *
         * @param levelConfiguration    The level configuration to use.
         */
        private setup(levelConfiguration: any): void {

            Logger.logMessage(`Initialize level ${levelConfiguration["level"]}...`);

            let levelParser = new GameLevelParser(this.imageLoader);
            let levelParserResult = levelParser.parse(levelConfiguration);

            this.soundtrack = levelParserResult.soundtrack;
            this.mobiles = levelParserResult.mobiles;
            this.goals = levelParserResult.goals;
            this.touchAllowedStatus = levelParserResult.touchAllowedStatus;

            // Sets the total of available lives for the actor (for the first level only).
            if (levelParserResult.level == 1) {
                Actor.setAvailableLives(Constants.AVAILABLE_LIVES);
            }

            // Adds the tiles to the scene.
            for (let i = 0; i < levelParserResult.tiles.length; ++i) {
                for (let j = 0; j < levelParserResult.tiles[i].length; ++j) {
                    this.board.addChild(levelParserResult.tiles[i][j]);
                }
            }

            // Adds the mobiles to the scene.
            for (let i = 0; i < this.mobiles.length; ++i) {
                for (let j = 0; j < this.mobiles[i].length; ++j) {
                    this.board.addChild(this.mobiles[i][j]);
                }
            }

            // Adds the goal decks to the scene.
            for (let i = 0; i < this.goals.length; ++i) {
                this.board.addChild(this.goals[i]);
            }

            // Setups the labels.
            this.labels = {
                livesCount: new PIXI.Text(`${GameLevel.LIVES_BASE_TEXT} ${Actor.getAvailableLives()}`,
                    Constants.DEFAULT_TEXT_STYLE),

                currentLevel: new PIXI.Text(`LEVEL ${levelConfiguration["level"]}`, Constants.DEFAULT_TEXT_STYLE)
            };
            
            const VERTICAL_TEXT_POSITION = (Constants.WINDOW_HEIGHT / Constants.TILE_SIZE)
                * Constants.TILE_SIZE - Constants.DEFAULT_TEXT_MARGIN;

            this.labels.livesCount.anchor.x = 1;
            this.labels.livesCount.anchor.y = 1;
            this.labels.currentLevel.anchor.y = 1;

            this.labels.livesCount.x = Constants.WINDOW_WIDTH - Constants.DEFAULT_TEXT_MARGIN;
            this.labels.currentLevel.x = Constants.DEFAULT_TEXT_MARGIN;
            this.labels.livesCount.y = VERTICAL_TEXT_POSITION;
            this.labels.currentLevel.y = VERTICAL_TEXT_POSITION;
            
            this.board.addChild(this.labels.livesCount);
            this.board.addChild(this.labels.currentLevel);

            // Generates the actor.
            this.generateActor();

            Logger.logMessage("Level initialized.");
        }

        /**
         * Starts the level.
         */
        public start() {

            this.bindEventListener();
            this.audioManager.fadeIn(this.soundtrack,
                GameLevel.SOUNDTRACK_FADE_DURATION, true, GameLevel.SOUNDTRACK_VOLUME);

            this.isStarted = true;
        }

        /**
         * Disposes the current level.
         */
        public dispose(): void {
            this.audioManager.fadeOut(this.soundtrack, GameLevel.SOUNDTRACK_FADE_DURATION);
            this.unbindEventListener();
        }

        /**
         * Gets the board associated with the current level.
         *
         * @returns {Board} The board associated with the current level.
         */
        public getBoard(): Board {
            return this.board;
        }

        /**
         * Updates the game with the specified delta time.
         *
         * @param deltaTime     The delta time to use.
         */
        public update(deltaTime: number): void {

            // Iterates over the mobiles.
            for (let i = 0; i < this.mobiles.length; ++i) {

                let isCollide = false;
                for (let j = 0; j < this.mobiles[i].length; ++j) {

                    this.mobiles[i][j].update(deltaTime);

                    // Checks if the line position of the mobile is the same than the actor.
                    if (this.actor.getLinePosition() == i) {
                        let mobileObject = this.mobiles[i][j];

                        // Checks if there is a collision between the actor and the mobile.
                        if (mobileObject.getBounding().isCollide(this.actor.getBounding())) {
                            isCollide = true;

                            // Checks if the mobile can be hit by the actor.
                            if(mobileObject.canBeHit()) {
                                this.actor.follow(mobileObject);
                            } else {
                                this.audioManager.play(GameLevel.HIT_SOUND_NAME);
                                this.restart();
                            }
                        }
                    }
                }

                /* Checks if there is a collision between the actor and the tile,
                   and if the collision is forbidden between the two. */
                if (this.actor.getLinePosition() == i && !isCollide && !this.touchAllowedStatus[i]) {
                    this.audioManager.play(GameLevel.FALL_SOUND_NAME);
                    this.restart();
                }
            }

            // Iterates over the goal decks.
            for (let i = 0; i < this.goals.length; ++i) {
                let goalDeck = this.goals[i];

                // Checks if there is a collision with a goal deck and the goal deck is available.
                if (this.actor.getLinePosition() == 0 && goalDeck.isAvailable() &&
                    goalDeck.getBounding().isCollide(this.actor.getBounding())) {

                    goalDeck.setAvailability(false);
                    let availableGoalsCount = this.goals.filter(function (goal) {
                        return goal.isAvailable();
                    }).length;

                    // Centers the actor on the goal deck.
                    this.actor.getDisplayObject().x = goalDeck.getDisplayObject().x;
                    this.actor.getDisplayObject().y = goalDeck.getDisplayObject().y;

                    // Checks if there is no other available goal decks (all the goal decks are occupied).
                    if (availableGoalsCount == 0) {
                        this.onNextLevel.invoke();
                        return;
                    } else {
                        this.generateActor();
                    }
                }
            }

            // Checks if the actor is inside the scene.
            if(!this.board.getBounding().isCollide(this.actor.getBounding())) {
                // TODO: Add sound here!
                this.restart();
            }
        }

        /**
         * Generates a new actor.
         */
        private generateActor() {

            if (this.actor) {
                this.unbindEventListener();
            }

            this.actor = new Actor(this.imageLoader, this.audioManager);
            this.actor.startPosition();

            if (this.isStarted) {
                this.bindEventListener();
            }

            this.board.addChild(this.actor);
        }

        /**
         * Binds the key listeners to the actor.
         */
        private bindEventListener() {
            document.addEventListener("keydown", this.actor.onKeyDown);
            document.addEventListener("keyup", this.actor.onKeyUp);
        }

        /**
         * Unbinds the key listeners to the actor.
         */
        private unbindEventListener() {
            document.removeEventListener("keydown", this.actor.onKeyDown);
            document.removeEventListener("keyup", this.actor.onKeyUp);
        }

        /**
         * Restarts the current level.
         */
        private restart() {

            this.actor.startPosition();
            Actor.loseLife();

            let availableLives = Actor.getAvailableLives();
            Logger.logMessage(`One live lost. ${availableLives} live(s) remaining.`);

            this.labels.livesCount.text = `${GameLevel.LIVES_BASE_TEXT} ${Actor.getAvailableLives()}`;
            if (availableLives <= 0) {
                this.onGameOver.invoke();
            }
        }
    }
}
