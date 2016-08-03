/// <reference path="orientation.ts" />
/// <reference path="../../configuration.ts" />
/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/collidable.ts" />
/// <reference path="../../physics/circleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Collidable = FroggerJS.Physics.Collidable;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;

    enum ArrowKeyCode {
        Up = 38,
        Down = 40,
        Left = 37,
        Right = 39
    }
    
    export class Frog implements Renderable, Collidable {

        private keyUpTexture: PIXI.Texture;
        private keyDownTexture: PIXI.Texture;
        private sprite: PIXI.Sprite;
        private bounding: CircleBounding;

        public onKeyDown: {(event: KeyboardEvent): void};
        public onKeyUp: {(event: KeyboardEvent): void};

        public constructor(imageLoader: ImageLoader) {

            this.keyUpTexture = imageLoader.get("frog");
            this.keyDownTexture = imageLoader.get("frog-extend");

            this.sprite = new PIXI.Sprite(this.keyUpTexture);
            this.sprite.anchor = new PIXI.Point(0.5, 0.5);
            this.sprite.position = new PIXI.Point(30, 30); // TODO: Put into const...

            // TODO: Think that the sprite is bigger!!!!!!!
            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * 0.15);
            //this.bounding = new FroggerJS.Physics.RectangleBounding(this.sprite.position, this.sprite.width / 2, this.sprite.height / 2);

            let self = this;
            this.onKeyDown = function (event: KeyboardEvent) {

                let rotation: number;
                switch (event.keyCode) {
                    case ArrowKeyCode.Left:
                        rotation = Orientation.Left;
                        break;
                    case ArrowKeyCode.Up:
                        rotation = Orientation.Up;
                        break;
                    case ArrowKeyCode.Right:
                        rotation = Orientation.Right;
                        break;
                    case ArrowKeyCode.Down:
                        rotation = Orientation.Down;
                        break;
                }
                
                self.sprite.rotation = rotation;
                self.sprite.texture = self.keyDownTexture;
            };

            this.onKeyUp = function (event: KeyboardEvent) {

                const SHIFTING = FroggerJS.Constants.TILE_SIZE;
                self.sprite.texture = self.keyUpTexture;

                switch (event.keyCode) {
                    case ArrowKeyCode.Left:
                        self.sprite.position.x -= SHIFTING;
                        break;
                    case ArrowKeyCode.Up:
                        self.sprite.position.y -= SHIFTING;
                        break;

                    case ArrowKeyCode.Right:
                        self.sprite.position.x += SHIFTING;
                        break;
                    case ArrowKeyCode.Down:
                        self.sprite.position.y += SHIFTING;
                        break;
                }
            };
        }

        public follow(mobile: MobileObject): void {
            //let position = mobile.getDisplayObject().position;

        }

        public getDisplayObject(): PIXI.DisplayObject {
            return this.sprite;
        }

        public getBounding(): Bounding {
            return this.bounding;
        }
    }
}
