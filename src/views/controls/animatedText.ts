/// <reference path="../../graphics/updatable.ts" />

namespace FroggerJS.Views.Controls {

    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines an animated text that changes his alpha value.
     */
    export class AnimatedText extends PIXI.Text implements Updatable {

        private static LABEL_ALPHA_FACTOR = 0.012;
        private static MAX_LABEL_ALPHA = 1;
        private static MIN_LABEL_ALPHA = 0.35;

        private animationFactor = 1;

        /**
         * Initializes a new instance of the AnimatedText class.
         *
         * @param text      The text to display.
         * @param [style]   The style to apply with the text.
         */
        public constructor(text: string, style?: any) {
            super(text, style);
        }

        /**
         * Updates the alpha of the animated label.
         * 
         * @param deltaTime     The delta time to use.
         */
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