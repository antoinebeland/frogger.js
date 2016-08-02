/// <reference path="./objects/orientation.ts" />
/// <reference path="./objects/frog.ts" />
/// <reference path="./objects/car.ts" />
/// <reference path="./objects/boat.ts" />
/// <reference path="../constants.ts" />
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
    import Boat = FroggerJS.Game.Objects.Boat;
    import FXAAFilter = PIXI.FXAAFilter;
    import Car = FroggerJS.Game.Objects.Car;
    import OrientationUtils = FroggerJS.Game.Objects.OrientationUtils;

    export class GameManager {

        private scene : Scene;
        private imageLoader: ImageLoader;
        private frog: Frog;

        private movableObjects: any;

        public onGameOver = new Event<void>();
        public onNextLevel = new Event<void>();

        public constructor(imageLoader: ImageLoader, scene: Scene) {
            this.scene = scene;
            this.imageLoader = imageLoader;
            this.frog = new Frog(imageLoader);
            this.movableObjects = [];
        }

        public loadLevel(levelConfiguration: any): void {

            Logger.logMessage(`Initialize level ${levelConfiguration["level"]}...`);

            let list: any = [
                {texture: "grass-water-top"},
                {texture: "water", object: "boat", orientation: "right", speed: 1},
                {texture: "water", object: "boat", orientation: "left", speed: 1.5},
                {texture: "water", object: "boat", orientation: "right", speed: 1},
                {texture: "grass-water-bottom"},
                {texture: "road-top", object: "car", orientation: "left", speed: 1},
                {texture: "road-middle-top", object: "car", orientation: "left", speed: 1.5},
                {texture: "road-middle-bottom", object: "car", orientation: "right", speed: 1.5},
                {texture: "road-bottom", object: "car", orientation: "right", speed: 1},
                {texture: "grass"}
            ];

            const SCALE_RATIO = FroggerJS.Constants.TILE_SIZE / FroggerJS.Constants.ASSET_SIZE;
            const WIDTH_SPRITES_NUMBER = this.scene.getWidth() / FroggerJS.Constants.TILE_SIZE;

            for(let i = 0; i < list.length; ++i) {

                let texture = this.imageLoader.get(list[i].texture);
                for(let j = 0; j < WIDTH_SPRITES_NUMBER; ++j) {

                    let sprite = new PIXI.Sprite(texture);
                    sprite.position.x = j * FroggerJS.Constants.TILE_SIZE;
                    sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;
                    this.scene.addChild(sprite, SCALE_RATIO);
                }

                this.movableObjects[i] = [];
                if(list[i].hasOwnProperty("object")) {

                    if(!list[i].hasOwnProperty("orientation")) {
                        throw "ERROR: Orientation property is missing.";
                    }
                    if(!list[i].hasOwnProperty("speed")) {
                        throw "ERROR: Speed property is missing.";
                    }

                    let nextPosition = 0;
                    let spriteHeight = 0;
                    do {
                        let movableObject = new Car(this.imageLoader, OrientationUtils.fromStringToOrientation(list[i]['orientation']), list[i].speed);
                        
                        let sprite = movableObject.getSprite();
                        sprite.position.x = nextPosition;
                        sprite.position.y = i * FroggerJS.Constants.TILE_SIZE;

                        spriteHeight = sprite.height;
                        nextPosition += spriteHeight + Math.floor((Math.random() * 2 * spriteHeight) + spriteHeight);

                        this.movableObjects[i].push(movableObject);
                        this.scene.addChild(movableObject, SCALE_RATIO);

                    } while(nextPosition < this.scene.getWidth() + spriteHeight);
                }
            }

            this.scene.addChild(this.frog, SCALE_RATIO);

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

            for(let i = 0; i < this.movableObjects.length; ++i) {
                for(let j = 0; j < this.movableObjects[i].length; ++j) {
                   this.movableObjects[i][j].updatePosition();
                }
            }

            // Update the position of the cars...
        }
    }
}
