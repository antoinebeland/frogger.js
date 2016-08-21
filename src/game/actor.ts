/// <reference path="../config.ts" />
/// <reference path="./objects/mobile.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../physics/collidable.ts" />
/// <reference path="../physics/circleBounding.ts" />

namespace FroggerJS.Game {

    import AudioManager = FroggerJS.Audio.AudioManager;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Collidable = FroggerJS.Physics.Collidable;
    import Mobile = FroggerJS.Game.Objects.Mobile;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;

    /**
     * Defines the key codes associated with the arrow keys.
     */
    enum ArrowKeyCode {
        Up = 38,
        Down = 40,
        Left = 37,
        Right = 39
    }

    /**
     * Defines the sprite rotation based on the active arrow key.
     */
    enum Rotation {
        Up = 0,
        Left = 3 * Math.PI / 2,
        Down = Math.PI,
        Right = Math.PI / 2
    }

    /**
     * Defines the actor of the game.
     */
    export class Actor implements Renderable, Collidable {

        private static availableLives = 5;

        private keyUpTexture: PIXI.Texture;
        private keyDownTexture: PIXI.Texture;
        private sprite: PIXI.Sprite;
        private bounding: CircleBounding;

        private tilePosition: number = undefined;
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
         * Initializes a new instance of the Actor class.
         *
         * @param imageLoader       The image loader to use to load the textures.
         * @param audioManager      The audio manager to use.
         */
        public constructor(imageLoader: ImageLoader, audioManager: AudioManager) {

            this.keyUpTexture = imageLoader.get("frog");
            this.keyDownTexture = imageLoader.get("frog-extend");

            this.sprite = new PIXI.Sprite(this.keyUpTexture);
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;

            const BOUNDING_FACTOR = 0.3;
            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * BOUNDING_FACTOR);

            let self = this;

            /**
             * Occurred when a key is down.
             *
             * @param event     The keyboard event associated.
             */
            this.onKeyDown = function (event: KeyboardEvent) {

                let rotation: number = undefined;
                switch (event.keyCode) {
                    case ArrowKeyCode.Left:
                        rotation = Rotation.Left;
                        break;
                    case ArrowKeyCode.Up:
                        rotation = Rotation.Up;
                        break;
                    case ArrowKeyCode.Right:
                        rotation = Rotation.Right;
                        break;
                    case ArrowKeyCode.Down:
                        rotation = Rotation.Down;
                        break;
                }

                if (rotation !== undefined) {
                    self.sprite.rotation = rotation;
                    self.sprite.texture = self.keyDownTexture;
                }
            };
            
            /**
             * Occurred when a key is up.
             *
             * @param event     The keyboard event associated.
             */
            this.onKeyUp = function (event: KeyboardEvent) {

                const SHIFTING = FroggerJS.Constants.TILE_SIZE;
                switch (event.keyCode) {
                    case ArrowKeyCode.Left:
                        if (self.sprite.position.x - SHIFTING >= 0) {
                            self.sprite.position.x -= SHIFTING;
                        }
                        break;
                    case ArrowKeyCode.Up:
                        if (self.sprite.position.y - SHIFTING >= 0) {
                            self.sprite.position.y -= SHIFTING;
                        }
                        break;

                    case ArrowKeyCode.Right:
                        if (self.sprite.position.x + SHIFTING <= FroggerJS.Constants.WINDOW_WIDTH) {
                            self.sprite.position.x += SHIFTING;
                        }
                        break;
                    case ArrowKeyCode.Down:
                        if (self.sprite.position.y + SHIFTING <= FroggerJS.Constants.WINDOW_HEIGHT) {
                            self.sprite.position.y += SHIFTING;
                        }
                        break;
                }
                self.deltaPosition = undefined; // Reset the delta position.

                // Checks if the actor has changed of tile.
                if (event.keyCode == ArrowKeyCode.Up || event.keyCode == ArrowKeyCode.Down) {
                    self.updateTilePosition();
                }
                // Checks if the texture was modified.
                if (self.sprite.texture == self.keyDownTexture) {
                    self.sprite.texture = self.keyUpTexture;
                    audioManager.play("jump");
                }
            };
        }

        /**
         * Removes one live to the available lives of the actor.
         */
        public static loseLife(): void {
            if (--Actor.availableLives < 0) {
                throw new Error("Negative live count.");
            }
        }

        /**
         * Gets the available lives of the actor.
         *
         * @returns {number}    The number of available lives.
         */
        public static getAvailableLives(): number {
            return Actor.availableLives;
        }

        /**
         * Sets the available lives of the actor.
         *
         * @param availableLives    The available lives to set.
         */
        public static setAvailableLives(availableLives: number): void {
            if (availableLives < 0) {
                throw new Error("Negative live count.");
            }
            Actor.availableLives = availableLives;
        }

        /**
         * Sets the position of the actor at the start position.
         */
        public startPosition(): void {
            this.sprite.rotation = Rotation.Up;
            this.sprite.position.x = FroggerJS.Constants.WINDOW_WIDTH / 2;
            this.sprite.position.y = FroggerJS.Constants.WINDOW_HEIGHT - (this.sprite.height / 2);
            this.updateTilePosition();
        }

        /**
         * Follows the specified mobile object.
         *
         * @param mobile    The mobile object to follow.
         */
        public follow(mobile: Mobile): void {

            if(!this.deltaPosition) {
                this.deltaPosition = this.sprite.position.x - mobile.getDisplayObject().position.x;
            }
            this.sprite.position.x = mobile.getDisplayObject().position.x + this.deltaPosition;
        }

        /**
         * Gets the tile index position of the actor.
         *
         * @returns {number}            The current index of the actor.
         */
        public getLinePosition(): number {
            return this.tilePosition;
        }

        /**
         * Gets the display object associated with the actor.
         *
         * @returns {PIXI.Sprite}       The sprite associated with the actor.
         */
        public getDisplayObject(): PIXI.DisplayObject {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the actor.
         *
         * @returns {CircleBounding}    The bounding associated with the actor.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Updates the position of the actor based on the tile logic.
         */
        private updateTilePosition() {
            this.tilePosition = Math.floor(this.sprite.position.y / FroggerJS.Constants.TILE_SIZE);
        }
    }
}
