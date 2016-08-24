/// <reference path="bonus.ts" />
/// <reference path="../actor.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/circleBounding.ts" />

namespace FroggerJS.Game.Objects {

    import Actor = FroggerJS.Game.Actor;
    import AudioManager = FroggerJS.Audio.AudioManager;
    import Bounding = FroggerJS.Physics.Bounding;
    import CircleBounding = FroggerJS.Physics.CircleBounding;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;

    export class Heart extends Bonus {

        public static TYPE = "heart";

        private static MIN_SCALE = 0.8;
        private static MAX_SCALE = 1;
        private static SCALE_FACTOR = 0.008;

        private sprite: PIXI.Sprite;
        private bounding: Bounding;
        private animationSign: number = -1;

        public constructor(imageLoader: ImageLoader) {
            super();

            this.sprite = new PIXI.Sprite(imageLoader.get("heart"));
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;

            const BOUNDING_FACTOR = 0.3;
            this.bounding = new CircleBounding(this.sprite.position, this.sprite.width * BOUNDING_FACTOR);
        }

        protected applyConcrete(): void {
            Actor.setAvailableLives(Actor.getAvailableLives() + 1);
        }

        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        public getBounding(): Bounding {
            return this.bounding;
        }

        public update(deltaTime: number): void {
            
            let scale = this.sprite.scale.x + this.animationSign * Heart.SCALE_FACTOR;
            if (scale >= Heart.MAX_SCALE) {
                this.animationSign = -1;
                scale = Heart.MAX_SCALE;
            } else if (scale <= Heart.MIN_SCALE) {
                this.animationSign = 1;
                scale = Heart.MIN_SCALE;
            }
            this.sprite.scale.x = scale;
            this.sprite.scale.y = scale;
        }
    }
}