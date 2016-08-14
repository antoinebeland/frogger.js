/// <reference path="../config.ts" />
/// <reference path="./actor.ts" />
/// <reference path="./levelParser.ts" />
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
    export class GameManager implements Updatable {

        private imageLoader: ImageLoader;
        private scene : Scene;
        private levelParser: LevelParser;
        private labels: GameTextLabels;
        private isLevelLoaded = false;

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
         * Initializes a new instance of the GameManager class.
         *
         * @param imageLoader   The image loader to use.
         * @param scene         The scene to use.
         */
        public constructor(imageLoader: ImageLoader, scene: Scene) {

            this.imageLoader = imageLoader;
            this.scene = scene;
            this.levelParser = new LevelParser(imageLoader);

            // TODO: Think about the labels place... Maybe in the state?
            this.labels = {
                livesCount: new PIXI.Text("", FroggerJS.Constants.DEFAULT_TEXT_STYLE),
                currentLevel: new PIXI.Text("", FroggerJS.Constants.DEFAULT_TEXT_STYLE)
            };

            // Setups the labels.
            const VERTICAL_TEXT_POSITION = (FroggerJS.Constants.WINDOW_HEIGHT / FroggerJS.Constants.TILE_SIZE)
                * FroggerJS.Constants.TILE_SIZE - FroggerJS.Constants.DEFAULT_TEXT_MARGIN;

            this.labels.livesCount.anchor.x = 1;
            this.labels.livesCount.anchor.y = 1;
            this.labels.currentLevel.anchor.y = 1;

            this.labels.livesCount.x = FroggerJS.Constants.WINDOW_WIDTH - FroggerJS.Constants.DEFAULT_TEXT_MARGIN;
            this.labels.currentLevel.x = FroggerJS.Constants.DEFAULT_TEXT_MARGIN;
            this.labels.livesCount.y = VERTICAL_TEXT_POSITION;
            this.labels.currentLevel.y = VERTICAL_TEXT_POSITION;

            // Sets the total of available lives for the actor.
            Actor.setAvailableLives(FroggerJS.Constants.AVAILABLE_LIVES);
        }

        /**
         * Setups the specified level configuration.
         *
         * @param levelConfiguration    The level configuration to use.
         */
        public setupLevel(levelConfiguration: any): void {

            // Checks if there is a level currently loaded before to load an other one.
            if (this.isLevelLoaded) {
                this.destroyLevel();
            }

            Logger.logMessage(`Initialize level ${levelConfiguration["level"]}...`);

            let level: any = FroggerJS.Levels[0];   // TODO: Put with the level configuration.
            let levelParserResult = this.levelParser.parse(level);

            this.mobiles = levelParserResult.mobiles;
            this.goals = levelParserResult.goals;
            this.touchAllowedStatus = levelParserResult.touchAllowedStatus;

            // Adds the tiles to the scene.
            for (let i = 0; i < levelParserResult.tiles.length; ++i) {
                for (let j = 0; j < levelParserResult.tiles[i].length; ++j) {
                    this.scene.addChild(levelParserResult.tiles[i][j]);
                }
            }

            // Adds the mobiles to the scene.
            for (let i = 0; i < this.mobiles.length; ++i) {
                for (let j = 0; j < this.mobiles[i].length; ++j) {
                    this.scene.addChild(this.mobiles[i][j]);
                }
            }

            // Adds the goal decks to the scene.
            for (let i = 0; i < this.goals.length; ++i) {
                this.scene.addChild(this.goals[i]);
            }

            this.generateActor();

            // Initializes the labels.
            this.labels.livesCount.text = `LIVES: ${Actor.getAvailableLives()}`;
            this.labels.currentLevel.text = `LEVEL ${levelConfiguration["level"]}`;

            this.scene.addChild(this.labels.livesCount);
            this.scene.addChild(this.labels.currentLevel);

            // Indicates that the level is loaded correctly.
            this.isLevelLoaded = true;
        }

        /**
         * Destroys the current loaded level.
         */
        public destroyLevel(): void {

            if (!this.isLevelLoaded) {
                return;
            }

            document.removeEventListener("keydown", this.actor.onKeyDown);
            document.removeEventListener("keyup", this.actor.onKeyUp);
            this.isLevelLoaded = false;
        }

        /**
         * Updates the game with the specified delta time.
         *
         * @param deltaTime     The delta time to use.
         */
        public update(deltaTime: number): void {

            // Checks if there is a level is loaded before to update anything.
            if (!this.isLevelLoaded) {
                throw new Error("No level is loaded.");
            }

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
                                this.restartLevel();
                            }
                        }
                    }
                }

                /* Checks if there is a collision between the actor and the tile,
                   and if the collision is forbidden between the two. */
                if (this.actor.getLinePosition() == i && !isCollide && !this.touchAllowedStatus[i]) {
                    this.restartLevel();
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
            if(!this.scene.getBounding().isCollide(this.actor.getBounding())) {
                this.restartLevel();
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

            this.scene.addChild(this.actor);
        }

        /**
         * Restarts the current loaded level.
         */
        private restartLevel() {

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
