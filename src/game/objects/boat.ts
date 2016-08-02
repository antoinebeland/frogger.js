/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {
    
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;

    export class Boat implements Renderable {

        private sprite: PIXI.Sprite;

        public constructor(imageLoader: ImageLoader) {
            this.sprite = new PIXI.Sprite(imageLoader.get("boat"));
        }
        
        public getSprite(): PIXI.Sprite {
            return this.sprite;
        }
    }
}
