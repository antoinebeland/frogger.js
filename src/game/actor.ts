/// <reference path="gameData.ts" />
/// <reference path="objects/mobile.ts" />
/// <reference path="../config.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../physics/circleBounding.ts" />
/// <reference path="../physics/collidable.ts" />

namespace FroggerJS.Game {

    declare var Math: Math;
    
    import AudioManager = FroggerJS.Audio.AudioManager;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;
    import Collidable = FroggerJS.Physics.Collidable;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Mobile = FroggerJS.Game.Objects.Mobile;
    import Renderable = FroggerJS.Graphics.Renderable;

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

        private static BOUNDING_FACTOR = 0.3;
        private static JUMP_SOUND_NAME = "jump";
        private static SHIFTING = FroggerJS.Constants.TILE_SIZE;
        private static HALF_SHIFTING = Actor.SHIFTING * 0.5;

        private keyUpTexture: PIXI.Texture;
        private keyDownTexture: PIXI.Texture;
        private sprite: PIXI.Sprite;
        private bounding: CircleBounding;

        private tilePosition: number = undefined;
        private deltaPosition: number = undefined;
        private tileExploredPosition: number = 0;
        
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

            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * Actor.BOUNDING_FACTOR);

            this.startPosition();
            this.tileExploredPosition = this.tilePosition;

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

                switch (event.keyCode) {
                    case ArrowKeyCode.Left:
                        if (self.sprite.position.x - Actor.SHIFTING >= 0) {
                            self.sprite.position.x -= Actor.HALF_SHIFTING;
                        }
                        break;
                    case ArrowKeyCode.Up:
                        if (self.sprite.position.y - Actor.SHIFTING >= 0) {
                            self.sprite.position.y -= Actor.SHIFTING;
                        }
                        break;

                    case ArrowKeyCode.Right:
                        if (self.sprite.position.x + Actor.SHIFTING <= FroggerJS.Constants.WINDOW_WIDTH) {
                            self.sprite.position.x += Actor.HALF_SHIFTING;
                        }
                        break;
                    case ArrowKeyCode.Down:
                        if (self.sprite.position.y + Actor.SHIFTING <= FroggerJS.Constants.WINDOW_HEIGHT) {
                            self.sprite.position.y += Actor.SHIFTING;
                        }
                        break;
                }
                self.deltaPosition = undefined; // Reset the delta position.

                // Checks if the actor has changed of tile.
                if (event.keyCode == ArrowKeyCode.Up || event.keyCode == ArrowKeyCode.Down) {
                    self.updateTilePosition();

                    // Checks if it's the fist time that the actor goes at these tile position.
                    if (self.tilePosition < self.tileExploredPosition) {
                        GameData.increaseScore(Constants.MOVE_SCORE);
                        self.tileExploredPosition = self.tilePosition;
                    }
                }
                // Checks if the texture was modified.
                if (self.sprite.texture == self.keyDownTexture) {
                    self.sprite.texture = self.keyUpTexture;
                    audioManager.play(Actor.JUMP_SOUND_NAME);
                }
            };
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
