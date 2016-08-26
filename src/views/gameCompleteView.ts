/// <reference path="controls/animatedText.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Views {

    import AnimatedText = FroggerJS.Views.Controls.AnimatedText;
    import Button = FroggerJS.Views.Controls.Button;
    import Constants = FroggerJS.Constants;
    import Event = Utils.Event;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the view to display when the game is completed.
     */
    export class GameCompleteView implements Renderable, Updatable {

        private container: PIXI.Container;
        private animatedText: AnimatedText;
        private finalScoreText: PIXI.Text;

        /**
         * Initializes a new instance of the GameCompleteView class.
         *
         * @param imageLoader   The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {

            this.container = new PIXI.Container();

            const STRIPE_HEIGHT = 250;
            const HALF_WINDOW_WIDTH = Constants.WINDOW_WIDTH * 0.5;

            // Generates the background.
            let background = new PIXI.extras.TilingSprite(imageLoader.get("background"),
                Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);

            background.alpha = 0.9;

            // Generates the stripe.
            let stripe = new PIXI.extras.TilingSprite(imageLoader.get("stripe"), Constants.WINDOW_WIDTH, STRIPE_HEIGHT);
            stripe.y = 155;

            // Loads the congrats image.
            let congrats = new PIXI.Sprite(imageLoader.get("congrats"));
            congrats.anchor.x = 0.5;
            congrats.x = HALF_WINDOW_WIDTH;
            congrats.y = 215;

            // Creates the score text.
            this.finalScoreText = new PIXI.Text("", {font: "65px Arial", fill: "white"});
            this.finalScoreText.anchor.x = 0.5;
            this.finalScoreText.x = HALF_WINDOW_WIDTH;
            this.finalScoreText.y = 915;

            // Loads the cup image.
            let cup = new PIXI.Sprite(imageLoader.get("cup"));
            cup.anchor.x = 0.5;
            cup.x = HALF_WINDOW_WIDTH;
            cup.y = 520;

            // Creates the animated label.
            this.animatedText = new AnimatedText("PRESS ANY KEY TO CONTINUE", {font: "40px Arial", fill: "white"});
            this.animatedText.anchor.x = 0.5;
            this.animatedText.x = HALF_WINDOW_WIDTH;
            this.animatedText.y = Constants.WINDOW_HEIGHT - 100;

            this.container.addChild(background);
            this.container.addChild(stripe);
            this.container.addChild(congrats);
            this.container.addChild(this.finalScoreText);
            this.container.addChild(cup);
            this.container.addChild(this.animatedText);
        }

        /**
         * Gets the display object associated with the game complete view.
         *
         * @returns {PIXI.Container}    The container that contains the elements of the view.
         */
        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }

        /**
         * Updates the animated label in the current view.
         *
         * @param deltaTime             The delta time to use.
         */
        public update(deltaTime: number): void {
            this.animatedText.update(deltaTime);
        }

        /**
         * Sets the final score to display.
         *
         * @param finalScore            The final score to display.
         */
        public setFinalScore(finalScore: number) {
            this.finalScoreText.text = `SCORE: ${finalScore}`;
        }
    }
}