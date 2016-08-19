/// <reference path="../config.ts" />
/// <reference path="./actor.ts" />
/// <reference path="./gameLevelParser.ts" />
/// <reference path="./objects/goalDeck.ts" />
/// <reference path="../graphics/updatable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../utils/event.ts" />
/// <reference path="../utils/logger.ts" />

namespace FroggerJS.Game {
    
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Scene = FroggerJS.Graphics.Scene;
    import Actor = FroggerJS.Game.Actor;
    import Event = Utils.Event;
    import Logger = Utils.Logger;
    import Updatable = FroggerJS.Graphics.Updatable;
    import Mobile = FroggerJS.Game.Objects.Mobile;
    import GoalDeck = FroggerJS.Game.Objects.GoalDeck;
    import Container = PIXI.Container;

    /**
     * Defines the labels to display during the game.
     */
    type GameTextLabels = {
        livesCount: PIXI.Text,
        currentLevel: PIXI.Text
    }

    /**
     * Defines the manager of the game.
     */
    export class GameLevel implements Updatable {

        private imageLoader: ImageLoader;
        private board : Board;
        private labels: GameTextLabels;

        private actor: Actor;
        private mobiles: Mobile[][];
        private goals: GoalDeck[];
        private touchAllowedStatus: boolean[];

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
         * @param levelConfiguration    The level configuration to load.
         */
        public constructor(imageLoader: ImageLoader, levelConfiguration: any) {

            this.imageLoader = imageLoader;
            this.board = new Board(FroggerJS.Constants.WINDOW_WIDTH, FroggerJS.Constants.WINDOW_HEIGHT);

            this.setup(FroggerJS.Levels[0]);
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

            this.mobiles = levelParserResult.mobiles;
            this.goals = levelParserResult.goals;
            this.touchAllowedStatus = levelParserResult.touchAllowedStatus;

            // Sets the total of available lives for the actor (for the first level only).
            if (levelParserResult.level == 1) {
                Actor.setAvailableLives(FroggerJS.Constants.AVAILABLE_LIVES);
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

            this.generateActor();
            
            // Setups the labels.
            this.labels = {
                livesCount: new PIXI.Text(`LIVES: ${Actor.getAvailableLives()}`, FroggerJS.Constants.DEFAULT_TEXT_STYLE),
                currentLevel: new PIXI.Text(`LEVEL ${levelConfiguration["level"]}`, FroggerJS.Constants.DEFAULT_TEXT_STYLE)
            };
            
            const VERTICAL_TEXT_POSITION = (FroggerJS.Constants.WINDOW_HEIGHT / FroggerJS.Constants.TILE_SIZE)
                * FroggerJS.Constants.TILE_SIZE - FroggerJS.Constants.DEFAULT_TEXT_MARGIN;

            this.labels.livesCount.anchor.x = 1;
            this.labels.livesCount.anchor.y = 1;
            this.labels.currentLevel.anchor.y = 1;

            this.labels.livesCount.x = FroggerJS.Constants.WINDOW_WIDTH - FroggerJS.Constants.DEFAULT_TEXT_MARGIN;
            this.labels.currentLevel.x = FroggerJS.Constants.DEFAULT_TEXT_MARGIN;
            this.labels.livesCount.y = VERTICAL_TEXT_POSITION;
            this.labels.currentLevel.y = VERTICAL_TEXT_POSITION;
            
            this.board.addChild(this.labels.livesCount);
            this.board.addChild(this.labels.currentLevel);
        }

        /**
         * Destroys the current level.
         */
        public destroy(): void {

            document.removeEventListener("keydown", this.actor.onKeyDown);
            document.removeEventListener("keyup", this.actor.onKeyUp);
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
                                this.restart();
                            }
                        }
                    }
                }

                /* Checks if there is a collision between the actor and the tile,
                   and if the collision is forbidden between the two. */
                if (this.actor.getLinePosition() == i && !isCollide && !this.touchAllowedStatus[i]) {
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
                this.restart();
            }
        }

        /**
         * Generates a new actor.
         */
        private generateActor() {

            if (this.actor) {
                document.removeEventListener("keydown", this.actor.onKeyDown);
                document.removeEventListener("keyup", this.actor.onKeyUp);
            }

            this.actor = new Actor(this.imageLoader);
            this.actor.startPosition();

            document.addEventListener("keydown", this.actor.onKeyDown);
            document.addEventListener("keyup", this.actor.onKeyUp);

            this.board.addChild(this.actor);
        }

        /**
         * Restarts the current level.
         */
        private restart() {

            Actor.loseLife();
            this.actor.startPosition();

            let availableLives = Actor.getAvailableLives();
            Logger.logMessage(`One live lost. ${availableLives} live(s) remaining.`);

            this.labels.livesCount.text = `LIVES: ${availableLives}`; // TODO: Avoid to repeat the same text two times...
            if(availableLives <= 0) {
                this.onGameOver.invoke();
            }
        }
    }
}
