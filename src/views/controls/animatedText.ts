/// <reference path="../../graphics/updatable.ts" />

namespace FroggerJS.Views.Controls {

    import Updatable = FroggerJS.Graphics.Updatable;

    export class AnimatedText extends PIXI.Text implements Updatable {

        private static LABEL_ALPHA_FACTOR = 0.012;
        private static MAX_LABEL_ALPHA = 1;
        private static MIN_LABEL_ALPHA = 0.35;

        private animationFactor = 1;

        public constructor(text: string, style?: any) {
            super(text, style);
        }
        
        public update(deltaTime: number): void {

            let alphaToApply = this.alpha +
                AnimatedText.LABEL_ALPHA_FACTOR * this.animationFactor * deltaTime;

            if (alphaToApply >= AnimatedText.MAX_LABEL_ALPHA) {
                alphaToApply = AnimatedText.MAX_LABEL_ALPHA;
                this.animationFactor = -1;
            } else if (alphaToApply <= AnimatedText.MIN_LABEL_ALPHA) {
                alphaToApply = AnimatedText.MIN_LABEL_ALPHA;
                this.animationFactor = 1;
            }
            this.alpha = alphaToApply;
        }
    }
}