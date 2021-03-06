/// <reference path="controls/button.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Views {

    import Button = FroggerJS.Views.Controls.Button;
    import Constants = FroggerJS.Constants;
    import Event = Utils.Event;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;

    /**
     * Defines the main menu view.
     */
    export class MainMenuView implements Renderable {

        private container: PIXI.Container;

        /**
         * Occurred when the play button is clicked.
         *
         * @type {Utils.Event<void>}
         */
        public onPlayClicked = new Event<void>();

        /**
         * Occurred when the directions button is clicked.
         *
         * @type {Utils.Event<void>}
         */
        public onDirectionsClicked = new Event<void>();

        /**
         * Initializes a new instance of the MainMenuView class.
         *
         * @param imageLoader       The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {

            this.container = new PIXI.Container();

            const MARGIN = 20;
            const STRIPE_HEIGHT = 250;
            const BOTTOM_TEXT_ALPHA = 0.7;
            const BUTTON_TEXT_STYLE = { font: "60px Arial", fill: "white" };
            const BOTTOM_TEXT_STYLE = { font: "28px Arial", fill: "white" };
            const HALF_WINDOW_WIDTH = Constants.WINDOW_WIDTH * 0.5;

            // Generates the background.
            let background = new PIXI.extras.TilingSprite(imageLoader.get("background"),
                Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);

            // Generates the stripe under the logo.
            let stripe = new PIXI.extras.TilingSprite(imageLoader.get("stripe"), Constants.WINDOW_WIDTH, STRIPE_HEIGHT);
            stripe.y = 155;

            // Loads the logo.
            let logo = new PIXI.Sprite(imageLoader.get("menu-logo"));
            logo.anchor.x = 0.5;
            logo.x = HALF_WINDOW_WIDTH;
            logo.y = 195;

            // Loads the textures for the buttons.
            let defaultTexture = imageLoader.get("menu-button");
            let hoveredTexture = imageLoader.get("menu-button-hovered");
            let clickedTexture = imageLoader.get("menu-button-clicked");

            // Initializes the start button.
            let startButton = new Button(defaultTexture, "PLAY", BUTTON_TEXT_STYLE);
            startButton.hoveredTexture = hoveredTexture;
            startButton.clickedTexture = clickedTexture;
            startButton.onClick = this.onPlayClicked;
            startButton.anchor.x = 0.5;
            startButton.x = HALF_WINDOW_WIDTH;
            startButton.y = 550;

            // Initializes the settings button.
            let directionsButton = new Button(defaultTexture, "DIRECTIONS", BUTTON_TEXT_STYLE);
            directionsButton.hoveredTexture = hoveredTexture;
            directionsButton.clickedTexture = clickedTexture;
            directionsButton.onClick = this.onDirectionsClicked;
            directionsButton.anchor.x = 0.5;
            directionsButton.x = HALF_WINDOW_WIDTH;
            directionsButton.y = 700;
            
            // Initializes the copyright text.
            let copyright = new PIXI.Text("© Antoine Béland | MIT License", BOTTOM_TEXT_STYLE);
            copyright.alpha = BOTTOM_TEXT_ALPHA;
            copyright.anchor.y = 1;
            copyright.x = MARGIN;
            copyright.y = Constants.WINDOW_HEIGHT - MARGIN;

            // Initializes the version text.
            let version = new PIXI.Text(`v${Constants.VERSION}`, BOTTOM_TEXT_STYLE);
            version.alpha = BOTTOM_TEXT_ALPHA;
            version.anchor.x = 1;
            version.anchor.y = 1;
            version.x = Constants.WINDOW_WIDTH - MARGIN;
            version.y = Constants.WINDOW_HEIGHT - MARGIN;

            this.container.addChild(background);
            this.container.addChild(stripe);
            this.container.addChild(logo);
            this.container.addChild(startButton);
            this.container.addChild(directionsButton);
            this.container.addChild(copyright);
            this.container.addChild(version);
        }

        /**
         * Gets the display object associated with the main menu view.
         *
         * @returns {PIXI.Container}    The container that contains the main menu elements.
         */
        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }
    }
}