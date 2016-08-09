/// <reference path="../config.ts" />
/// <reference path="./actor.ts" />
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
    import MobileObjectFactory = FroggerJS.Game.Objects.MobileFactory;
    import Updatable = FroggerJS.Graphics.Updatable;

    export class GameManager implements Updatable {

        private imageLoader: ImageLoader;
        private scene : Scene;

        private actor: Actor;
        private mobileObjectFactory: MobileObjectFactory;
        private mobileObjects: any;
        private touchAllowedStatus: boolean[];

        public onGameOver = new Event<void>();
        public onNextLevel = new Event<void>();

        public constructor(imageLoader: ImageLoader, scene: Scene) {

            this.imageLoader = imageLoader;
            this.scene = scene;
            
            this.actor = new Actor(imageLoader);
            this.mobileObjectFactory = new MobileObjectFactory(imageLoader);
            this.mobileObjects = [];
            this.touchAllowedStatus = [];
        }

        public setupLevel(levelConfiguration: any): void {

            Logger.logMessage(`Initialize level ${levelConfiguration["level"]}...`);

            // TODO: Put with the level configuration.
            let level: any = FroggerJS.Levels[0];

            if (level.length != FroggerJS.Constants.WINDOW_HEIGHT / FroggerJS.Constants.TILE_SIZE) {
                throw "ERROR: The level configuration isn't valid."
            }

            // TODO: Put in other file...
            const WIDTH_SPRITES_NUMBER = FroggerJS.Constants.WINDOW_WIDTH / FroggerJS.Constants.TILE_SIZE;
            for(let i = 0; i < level.length; ++i) {

                if (!level[i].hasOwnProperty("texture")) {
                    throw "ERROR: Texture property is missing.";
                }
                if (!level[i].hasOwnProperty("touchAllowed")) {
                    throw "ERROR: TouchAllowed property is missing.";
                }
                this.touchAllowedStatus.push(level[i]['touchAllowed']);

                // Generates the tiles
                let texture = this.imageLoader.get(level[i].texture);
                for (let j = 0; j < WIDTH_SPRITES_NUMBER; ++j) {

                    let sprite = new PIXI.Sprite(texture);
                    sprite.position.x = j * FroggerJS.Constants.TILE_SIZE;
                    sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;
                    this.scene.addChild(sprite);
                }

                // Added the mobile objects
                this.mobileObjects[i] = [];
                if (level[i].hasOwnProperty("mobile")) {

                    let mobileElement = level[i]['mobile'];
                    if (!mobileElement.hasOwnProperty("type")) {
                        throw "ERROR: Type property is missing.";
                    }
                    if (!mobileElement.hasOwnProperty("orientation")) {
                        throw "ERROR: Rotation property is missing.";
                    }
                    if (!mobileElement.hasOwnProperty("speed")) {
                        throw "ERROR: Speed property is missing.";
                    }

                    let nextPosition = 0;
                    let spriteWidth = 0;
                    do {
                        let mobileObject =
                            this.mobileObjectFactory.createMobile(mobileElement.type, mobileElement.orientation, mobileElement.speed);
                        
                        let sprite = mobileObject.getDisplayObject() as PIXI.Sprite;
                        sprite.position.x = nextPosition;
                        sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;

                        // Generates the next position of the sprite.
                        spriteWidth = sprite.width;
                        nextPosition += spriteWidth + Math.floor((Math.random() * 2.5 * spriteWidth) + spriteWidth);

                        this.mobileObjects[i].push(mobileObject);
                        this.scene.addChild(mobileObject);

                    } while (nextPosition < FroggerJS.Constants.WINDOW_WIDTH);
                }
            }

            this.actor.startPosition();
            this.scene.addChild(this.actor);

            // Displays the bounding if the option is enabled.
            if(FroggerJS.Constants.DISPLAY_BOUNDING) {
                for (let i = 0; i < this.mobileObjects.length; ++i) {
                    for (let j = 0; j < this.mobileObjects[i].length; ++j) {
                        this.scene.addChild(this.mobileObjects[i][j].getBounding());
                    }
                }
                this.scene.addChild(this.actor.getBounding());
            }

            // TODO: Remove from here!
            var basicText = new PIXI.Text(Actor.getAvailableLives());
            basicText.x = 30;
            basicText.y = 90;

            this.scene.addChild(basicText);

            document.addEventListener("keydown", this.actor.onKeyDown);
            document.addEventListener("keyup", this.actor.onKeyUp);
        }

        // TODO: Rename the function...
        public clearLevel(): void {

            document.removeEventListener("keydown", this.actor.onKeyDown);
            document.removeEventListener("keyup", this.actor.onKeyUp);
        }

        public update(deltaTime: number): void {

            for (let i = 0; i < this.mobileObjects.length; ++i) {
                let isCollide = false;

                for (let j = 0; j < this.mobileObjects[i].length; ++j) {
                   this.mobileObjects[i][j].update(deltaTime);

                    if (this.actor.getTilePosition() == i) {
                        let mobileObject = this.mobileObjects[i][j];

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
                if (this.actor.getTilePosition() == i && !isCollide && !this.touchAllowedStatus[i]){
                    this.restartLevel();
                }
            }
        }

        private restartLevel() {

            Actor.removeOneLive();   // TODO: Rename function
            this.actor.startPosition();

            let availableLives = Actor.getAvailableLives();
            Logger.logMessage(`One live lost. ${availableLives} live(s) remaining.`);

            if(availableLives <= 0) {
                this.onGameOver.invoke();
            }
        }
    }
}
