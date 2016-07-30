/// <reference path="../graphics/graphicsLoader.ts" />
/// <reference path="../graphics/sprite.ts" />
/// <reference path="../graphics/scene.ts" />
/// <reference path="../utils/event.ts" />
/// <reference path="../utils/logger.ts" />

namespace FroggerJS.Game {

    import GraphicsLoader = FroggerJS.Graphics.GraphicsLoader;
    import Scene = FroggerJS.Graphics.Scene;
    import Event = Utils.Event;
    import Logger = Utils.Logger;
    import Sprite = FroggerJS.Graphics.Sprite;

    export class GameManager {

        private scene : Scene;
        private graphicsLoader: GraphicsLoader;

        public onGameOver = new Event<void>();
        public onNextLevel = new Event<void>();

        public constructor(graphicsLoader: GraphicsLoader, scene: Scene) {
            this.scene = scene;
            this.graphicsLoader = graphicsLoader;
        }

        public loadLevel(levelConfiguration: any): void {

            Logger.logMessage(`Initialize level ${levelConfiguration["level"]}...`);

            let test = new Sprite(this.graphicsLoader.get("frog"));
            this.scene.addChild(test);

            this.scene.onRender.register(this.update);
        }

        public clearLevel(): void {
            this.scene.onRender.unregister(this.update);
        }

        private update(): void {
            // Update the position of the cars...
        }
    }
}
