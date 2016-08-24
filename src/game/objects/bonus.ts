/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/updatable.ts" />
/// <reference path="../../physics/bounding.ts" />
/// <reference path="../../physics/collidable.ts" />

namespace FroggerJS.Game.Objects {

    import Bounding = FroggerJS.Physics.Bounding;
    import Collidable = FroggerJS.Physics.Collidable;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the base of a bonus.
     */
    export abstract class Bonus implements Renderable, Collidable, Updatable {

        private availability: boolean;

        /**
         * Initializes a new instance of the Bonus class.
         */
        public constructor() {
            this.availability = true;
        }

        /**
         * Applies the concrete bonus.
         */
        protected abstract applyConcrete(): void;

        /**
         * Gets the display object associated with the bonus.
         */
        public abstract getDisplayObject(): PIXI.Sprite;

        /**
         * Gets the bounding associated with the bonus.
         */
        public abstract getBounding(): Bounding;

        /**
         * Updates the bonus with the specified delta time.
         *
         * @param deltaTime     The delta time to use.
         */
        public abstract update(deltaTime: number): void;

        /**
         * Indicates if the bonus is available.
         *
         * @returns {boolean}   TRUE if the bonus is available. FALSE otherwise.
         */
        public isAvailable(): boolean {
            return this.availability;
        }

        /**
         * Applies the bonus.
         */
        public apply() {

            if (!this.availability) {
                return;
            }
            this.availability = false;
            this.applyConcrete();
            this.getDisplayObject().visible = false;
        }
    }
}