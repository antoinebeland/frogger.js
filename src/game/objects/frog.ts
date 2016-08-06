/// <reference path="orientation.ts" />
/// <reference path="../../config.ts" />
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

    /**
     * Defines the main actor of the game.
     */
    export class Frog implements Renderable, Collidable {

        private keyUpTexture: PIXI.Texture;
        private keyDownTexture: PIXI.Texture;
        private sprite: PIXI.Sprite;
        private bounding: CircleBounding;
        private deltaPosition: number = undefined;

        /**
         * Occurred when a key is pressed.
         */
        public onKeyDown: {(event: KeyboardEvent): void};

        /**
         * Occurred when a key is released.
         */
        public onKeyUp: {(event: KeyboardEvent): void};

        /**
         * Initializes a new instance of the Frog class.
         * @param imageLoader   The image loader to used to load the textures.
         */
        public constructor(imageLoader: ImageLoader) {

            this.keyUpTexture = imageLoader.get("frog");
            this.keyDownTexture = imageLoader.get("frog-extend");
            this.sprite = new PIXI.Sprite(this.keyUpTexture);
            
            const CENTER = this.sprite.height / 2;
            const BOUNDING_FACTOR = 0.3;

            this.sprite.anchor = new PIXI.Point(0.5, 0.5);
            this.sprite.position = new PIXI.Point(CENTER, CENTER);
            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * BOUNDING_FACTOR);

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
                self.deltaPosition = undefined; // Reset the delta position.
            };
        }

        /**
         * Follows the specified mobile object.
         * @param mobile    The mobile object to follow.
         */
        public follow(mobile: MobileObject): void {

            if(!this.deltaPosition) {
                this.deltaPosition = this.sprite.position.x - mobile.getDisplayObject().position.x;
            }
            this.sprite.position.x = mobile.getDisplayObject().position.x + this.deltaPosition;
        }

        /**
         * Gets the display object associated with the frog.
         * @returns {PIXI.Sprite}
         */
        public getDisplayObject(): PIXI.DisplayObject {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the frog.
         * @returns {CircleBounding}
         */
        public getBounding(): Bounding {
            return this.bounding;
        }
    }
}
