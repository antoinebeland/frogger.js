/// <reference path="../../graphics/drawable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {

    import GraphicsLoader = FroggerJS.Graphics.ImageLoader;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Drawable = FroggerJS.Graphics.Drawable;

    export class Frog implements Drawable {

        private sprite: PIXI.Sprite;
        private keyUpTexture: PIXI.Texture;
        private keyDownTexture: PIXI.Texture;

        public onKeyPressedDown: {(event: KeyboardEvent): void};
        public onKeyPressedUp: {(event: KeyboardEvent): void};

        public constructor(imageLoader: ImageLoader) {

            // TODO: Put into const...
            this.keyUpTexture = imageLoader.get("frog");
            this.keyDownTexture = imageLoader.get("frog-2");

            this.sprite = new PIXI.Sprite(this.keyUpTexture);

            let self = this;
            this.onKeyPressedDown = function (event: KeyboardEvent) {
                self.sprite.texture = self.keyDownTexture;
            };

            this.onKeyPressedUp = function (event: KeyboardEvent) {

                self.sprite.texture = self.keyUpTexture;
                switch (event.keyCode) {
                    case 37: // Left
                        // TODO: Put into const...
                        self.sprite.position.x -= 75;
                        break;
                    case 38: // Up
                        self.sprite.position.y -= 75;
                        break;

                    case 39: // Right
                        self.sprite.position.x += 75;
                        break;
                    case 40: // Down
                        self.sprite.position.y += 75;
                        break;
                }
            };
        }

        public getSprite(): PIXI.Sprite {
            return this.sprite;
        }
    }
}
