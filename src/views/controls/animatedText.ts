/// <reference path="../../graphics/updatable.ts" />
/// <reference path="../../math/linearInterpolation.ts" />

namespace FroggerJS.Views.Controls {

    import Interpolation = FroggerJS.Math.Interpolation;
    import InterpolationRepetition = FroggerJS.Math.InterpolationRepetition;
    import LinearInterpolation = FroggerJS.Math.LinearInterpolation;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines an animated text that changes his alpha value.
     */
    export class AnimatedText extends PIXI.Text implements Updatable {

        private static LABEL_ALPHA_INCREMENT = 0.012;
        private static MAX_LABEL_ALPHA = 1;
        private static MIN_LABEL_ALPHA = 0.35;

        private interpolation: Interpolation;

        /**
         * Initializes a new instance of the AnimatedText class.
         *
         * @param text      The text to display.
         * @param [style]   The style to apply with the text.
         */
        public constructor(text: string, style?: any) {
            super(text, style);
            this.interpolation = new LinearInterpolation({
                minValue: AnimatedText.MIN_LABEL_ALPHA,
                maxValue: AnimatedText.MAX_LABEL_ALPHA,
                increment: AnimatedText.LABEL_ALPHA_INCREMENT,
                repetition: InterpolationRepetition.Inverse
            })
        }

        /**
         * Updates the alpha of the animated label.
         * 
         * @param deltaTime     The delta time to use.
         */
        public update(deltaTime: number): void {
            this.alpha = this.interpolation.next(deltaTime);
        }
    }
}