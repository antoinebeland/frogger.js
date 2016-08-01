/// <reference path="./objects/frog.ts" />
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
    import TilingSprite = PIXI.extras.TilingSprite;

    export class GameManager {

        private scene : Scene;
        private imageLoader: ImageLoader;
        private frog: Frog;

        public onGameOver = new Event<void>();
        public onNextLevel = new Event<void>();

        public constructor(imageLoader: ImageLoader, scene: Scene) {
            this.scene = scene;
            this.imageLoader = imageLoader;
            this.frog = new Frog(imageLoader);
        }

        public loadLevel(levelConfiguration: any): void {

            Logger.logMessage(`Initialize level ${levelConfiguration["level"]}...`);

            let list = [
                "grass",
                "water",
                "water",
                "grass",
                "road",
                "road",
                "road",
                "grass"
            ];

            for(let i = 0; i < list.length; ++i) {

                // TODO: Put into const...
                let tilingSprite = new TilingSprite(this.imageLoader.get(list[i]), this.scene.getWidth(), 75);

                tilingSprite.position.y = i * 75;
                this.scene.addChild(tilingSprite);
            }

            this.scene.addChild(this.frog);

            document.addEventListener("keydown", this.frog.onKeyPressedDown);
            document.addEventListener("keyup", this.frog.onKeyPressedUp);
            this.scene.onRender.register(this.update);
        }

        // TODO: Rename the function...
        public clearLevel(): void {

            document.removeEventListener("keydown", this.frog.onKeyPressedDown);
            document.removeEventListener("keyup", this.frog.onKeyPressedUp);
            this.scene.onRender.unregister(this.update);
        }

        private update(): void {
            // Update the position of the cars...
        }
    }
}
