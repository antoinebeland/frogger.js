/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/updatable.ts" />
/// <reference path="../../physics/collidable.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/circleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import Renderable = FroggerJS.Graphics.Renderable;
    import Collidable = FroggerJS.Physics.Collidable;
    import Updatable = FroggerJS.Graphics.Updatable;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;

    /**
     * Defines the goal platform.
     */
    export class GoalPlatform implements Renderable, Collidable, Updatable {

        private sprite: PIXI.Sprite;
        private bounding: Bounding;

        /**
         * Initializes a new instance of the GoalPlatform class.
         *
         * @param imageLoader       The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {
            
            this.sprite = new PIXI.Sprite(imageLoader.get("goal"));
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;

            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * 0.5);
        }

        /**
         * Gets the display object associated with the goal platform.
         *
         * @returns {PIXI.Sprite}   The sprite associated with the goal platform.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the goal platform.
         *
         * @returns {Bounding}      The bounding associated with the goal platform.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }

        /**
         * Updates the rotation of the goal platform.
         *
         * @param deltaTime         The delta time to use.
         */
        public update(deltaTime: number): void {
            this.sprite.rotation += 0.05 * deltaTime;
        }

        public associate(actor: Actor) {

        }
    }
}