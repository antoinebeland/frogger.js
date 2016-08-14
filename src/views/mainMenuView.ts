/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/event.ts" />
/// <reference path="controls/button.ts" />

namespace FroggerJS.Views {

    import Const = FroggerJS.Constants;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Button = FroggerJS.Views.Controls.Button;
    import Event = Utils.Event;

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
         * Occurred when the setting button is clicked.
         *
         * @type {Utils.Event<void>}
         */
        public onSettingsClicked = new Event<void>();

        /**
         * Initializes a new instance of the MainMenuView class.
         *
         * @param imageLoader   The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {

            this.container = new PIXI.Container();

            const STRIPE_HEIGHT = 250;
            const TEXT_STYLE = {font: "60px Arial", fill: "white"};
            const HALF_WINDOW_WIDTH = FroggerJS.Constants.WINDOW_WIDTH * 0.5;

            // Generates the background.
            let background = new PIXI.extras.TilingSprite(imageLoader.get("menu-background"),
                Const.WINDOW_WIDTH, Const.WINDOW_HEIGHT);

            // Generates the stripe under the logo.
            let stripe = new PIXI.extras.TilingSprite(imageLoader.get("menu-stripe"), Const.WINDOW_WIDTH, STRIPE_HEIGHT);
            stripe.y = Const.TILE_SIZE * 1.2;

            // Loads the logo.
            let logo = new PIXI.Sprite(imageLoader.get("menu-logo"));
            logo.anchor.x = 0.5;
            logo.x = HALF_WINDOW_WIDTH;
            logo.y = Const.TILE_SIZE * 1.5;

            // Loads the textures for the buttons.
            let defaultTexture = imageLoader.get("menu-button");
            let clickedTexture = imageLoader.get("menu-button-clicked");

            // Initializes the start button.
            let startButton = new Button(defaultTexture, clickedTexture, "PLAY", TEXT_STYLE);
            startButton.onClick.register(function () {
                this.onPlayClicked.invoke();
            }, this);

            let startButtonSprite = startButton.getDisplayObject() as PIXI.Sprite;
            startButtonSprite.anchor.x = 0.5;
            startButtonSprite.x = HALF_WINDOW_WIDTH;
            startButtonSprite.y = Const.TILE_SIZE * 4.5;

            // Initializes the settings button.
            let settingsButton = new Button(defaultTexture, clickedTexture, "SETTINGS", TEXT_STYLE);
            settingsButton.onClick.register(function () {
                this.onSettingsClicked.invoke();
            }, this);

            let settingsButtonSprite = settingsButton.getDisplayObject() as PIXI.Sprite;
            settingsButtonSprite.anchor.x = 0.5;
            settingsButtonSprite.x = HALF_WINDOW_WIDTH;
            settingsButtonSprite.y = Const.TILE_SIZE * 6;

            this.container.addChild(background);
            this.container.addChild(stripe);
            this.container.addChild(logo);
            this.container.addChild(startButtonSprite);
            this.container.addChild(settingsButtonSprite);
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