/// <reference path="./objects/orientation.ts" />
/// <reference path="./objects/frog.ts" />
/// <reference path="./objects/mobileObjectFactory.ts" />
/// <reference path="../configuration.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../utils/event.ts" />
/// <reference path="../utils/logger.ts" />

namespace FroggerJS.Game {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Scene = FroggerJS.Graphics.Scene;
    import Frog = FroggerJS.Game.Objects.Frog;
    import Event = Utils.Event;
    import Logger = Utils.Logger;
    import OrientationUtils = FroggerJS.Game.Objects.OrientationUtils;
    import MobileFactory = FroggerJS.Game.Objects.MobileFactory;
    import CircleBounding = FroggerJS.Physics.CircleBounding;

    export class GameManager {

        private scene : Scene;
        private imageLoader: ImageLoader;
        private frog: Frog;

        private mobileFactory: MobileFactory;
        private mobileObjects: any;

        public onGameOver = new Event<void>();
        public onNextLevel = new Event<void>();

        public constructor(imageLoader: ImageLoader, scene: Scene) {
            this.scene = scene;
            this.imageLoader = imageLoader;
            this.frog = new Frog(imageLoader);
            this.mobileFactory = new MobileFactory(imageLoader);
            this.mobileObjects = [];
        }

        public setupLevel(levelConfiguration: any): void {

            Logger.logMessage(`Initialize level ${levelConfiguration["level"]}...`);

            // TODO: Put with the level configuration.
            let level: any = FroggerJS.Levels[0];

            if (level.length != FroggerJS.Constants.WINDOW_HEIGHT / FroggerJS.Constants.TILE_SIZE) {
                throw "ERROR: The level configuration isn't valid."
            }

            const SCALE_RATIO = FroggerJS.Constants.TILE_SIZE / FroggerJS.Constants.ASSET_SIZE;
            const WIDTH_SPRITES_NUMBER = FroggerJS.Constants.WINDOW_WIDTH / FroggerJS.Constants.TILE_SIZE;

            for(let i = 0; i < level.length; ++i) {

                if (!level[i].hasOwnProperty("texture")) {
                    throw "ERROR: Texture property is missing.";
                }
                if (!level[i].hasOwnProperty("touchAllowed")) {
                    throw "ERROR: TouchAllowed property is missing.";
                }

                // Generates the tiles
                let texture = this.imageLoader.get(level[i].texture);
                for (let j = 0; j < WIDTH_SPRITES_NUMBER; ++j) {

                    let sprite = new PIXI.Sprite(texture);
                    sprite.position.x = j * FroggerJS.Constants.TILE_SIZE;
                    sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;
                    this.scene.addChild(sprite, SCALE_RATIO);
                }

                // Added the mobile objects
                this.mobileObjects[i] = [];
                if (level[i].hasOwnProperty("mobile")) {

                    if (!level[i]['mobile'].hasOwnProperty("type")) {
                        throw "ERROR: Type property is missing.";
                    }
                    if (!level[i]['mobile'].hasOwnProperty("orientation")) {
                        throw "ERROR: Orientation property is missing.";
                    }
                    if (!level[i]['mobile'].hasOwnProperty("speed")) {
                        throw "ERROR: Speed property is missing.";
                    }

                    let nextPosition = 0;
                    let spriteHeight = 0;
                    let orientation = OrientationUtils.fromStringToOrientation(level[i]['mobile']['orientation']);
                    do {
                        let movableObject =
                            this.mobileFactory.createMobile(level[i]['mobile'].type, orientation, level[i]['mobile'].speed);
                        
                        let sprite = movableObject.getDisplayObject() as PIXI.Sprite;
                        sprite.position.x = nextPosition;
                        sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;

                        // TODO: Think that the sprite is bigger!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                        // Generates the next position of the sprite.
                        spriteHeight = sprite.height;
                        nextPosition += spriteHeight + Math.floor((Math.random() * 3 * spriteHeight / 2) + spriteHeight / 2);

                        this.mobileObjects[i].push(movableObject);
                        this.scene.addChild(movableObject, SCALE_RATIO);

                    } while (nextPosition < FroggerJS.Constants.WINDOW_WIDTH);
                }
            }

            this.scene.addChild(this.frog, SCALE_RATIO);

            if(FroggerJS.Constants.DISPLAY_BOUNDING) {
                for (let i = 0; i < this.mobileObjects.length; ++i) {
                    for (let j = 0; j < this.mobileObjects[i].length; ++j) {
                        this.scene.addChild(this.mobileObjects[i][j].getBounding());
                    }
                }
                this.scene.addChild(this.frog.getBounding());
            }

            document.addEventListener("keydown", this.frog.onKeyDown);
            document.addEventListener("keyup", this.frog.onKeyUp);
            this.scene.onRender.register(this.update.bind(this)); // TODO: Fix bind problem..
        }

        // TODO: Rename the function...
        public clearLevel(): void {

            document.removeEventListener("keydown", this.frog.onKeyDown);
            document.removeEventListener("keyup", this.frog.onKeyUp);
            this.scene.onRender.unregister(this.update);
        }

        private update(): void {

            const FROG_INDEX_POSITION = Math.floor(this.frog.getDisplayObject().position.y / FroggerJS.Constants.TILE_SIZE);

            for (let i = 0; i < this.mobileObjects.length; ++i) {


                for (let j = 0; j < this.mobileObjects[i].length; ++j) {
                   this.mobileObjects[i][j].updatePosition();

                    if (FROG_INDEX_POSITION == i) {
                        if (this.mobileObjects[i][j].getBounding().isCollide(this.frog.getBounding())) {
                            console.log("COLLIDE!");
                        }
                    }
                }
            }

            // Update the position of the cars...
        }
    }
}
