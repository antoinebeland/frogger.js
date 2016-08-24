/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../graphics/updatable.ts" />
/// <reference path="../../physics/bounding.ts" />
/// <reference path="../../physics/collidable.ts" />

namespace FroggerJS.Game.Objects {

    import Bounding = FroggerJS.Physics.Bounding;
    import Collidable = FroggerJS.Physics.Collidable;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    export abstract class Bonus implements Renderable, Collidable, Updatable {

        private availability: boolean;

        public constructor() {
            this.availability = true;
        }

        protected abstract applyConcrete(): void;
        public abstract getDisplayObject(): PIXI.Sprite;
        public abstract getBounding(): Bounding;
        public abstract update(deltaTime: number): void;

        public isAvailable(): boolean {
            return this.availability;
        }

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