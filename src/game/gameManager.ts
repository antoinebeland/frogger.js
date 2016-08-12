/// <reference path="../config.ts" />
/// <reference path="./actor.ts" />
/// <reference path="./levelParser.ts" />
/// <reference path="./objects/goalPlatform.ts" />
/// <reference path="./objects/mobileFactory.ts" />
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
    import GoalPlatform = FroggerJS.Game.Objects.GoalPlatform;

    export class GameManager implements Updatable {

        private imageLoader: ImageLoader;
        private scene : Scene;
        private actor: Actor;
        private levelParser: LevelParser;

        private mobiles: any;
        private goals: GoalPlatform[];
        private touchAllowedStatus: boolean[];

        public onGameOver = new Event<void>();
        public onNextLevel = new Event<void>();

        public constructor(imageLoader: ImageLoader, scene: Scene) {

            this.imageLoader = imageLoader;
            this.scene = scene;
            this.actor = new Actor(imageLoader);
            this.levelParser = new LevelParser(imageLoader);
        }

        public setupLevel(levelConfiguration: any): void {

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

            // Adds the goal platforms to the scene.
            for (let i = 0; i < this.goals.length; ++i) {
                this.scene.addChild(this.goals[i]);
            }

            this.actor.startPosition();
            this.scene.addChild(this.actor);

            /*var basicText = new PIXI.Text("LEVEL " + levelConfiguration["level"]);
            basicText.x = 30;
            basicText.y = 90;

            this.scene.addChild(basicText);*/

            document.addEventListener("keydown", this.actor.onKeyDown);
            document.addEventListener("keyup", this.actor.onKeyUp);
        }

        public destroyLevel(): void {

            document.removeEventListener("keydown", this.actor.onKeyDown);
            document.removeEventListener("keyup", this.actor.onKeyUp);
        }

        public update(deltaTime: number): void {

            for (let i = 0; i < this.mobiles.length; ++i) {
                let isCollide = false;

                for (let j = 0; j < this.mobiles[i].length; ++j) {
                   this.mobiles[i][j].update(deltaTime);

                    if (this.actor.getLinePosition() == i) {
                        let mobileObject = this.mobiles[i][j];

                        if (mobileObject.getBounding().isCollide(this.actor.getBounding())) {
                            isCollide = true;

                            if(mobileObject.canBeHit()) {
                                this.actor.follow(mobileObject);
                            }
                            else {
                                this.restartLevel();
                            }
                        }
                    }
                }
                if (this.actor.getLinePosition() == i && !isCollide && !this.touchAllowedStatus[i]){
                    this.restartLevel();
                }
            }

            for (let i = 0; i < this.goals.length; ++i) {
                this.goals[i].update(deltaTime);

                if (this.actor.getLinePosition() == 0 && this.goals[i].getBounding().isCollide(this.actor.getBounding())) {
                    console.log("GOAL!");
                }
            }

            if(!this.scene.getBounding().isCollide(this.actor.getBounding())) {
                console.log("OUT!");
            }
        }

        private restartLevel() {

            Actor.loseLife();
            this.actor.startPosition();

            let availableLives = Actor.getAvailableLives();
            Logger.logMessage(`One live lost. ${availableLives} live(s) remaining.`);

            if(availableLives <= 0) {
                this.onGameOver.invoke();
            }
        }
    }
}
