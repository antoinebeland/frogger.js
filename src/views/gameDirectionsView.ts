/// <reference path="panelFactory.ts" />
/// <reference path="controls/button.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/updatable.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Views {

    import Button = FroggerJS.Views.Controls.Button;
    import Constants = FroggerJS.Constants;
    import Event = Utils.Event;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    export class GameDirectionsView implements Renderable, Updatable {

        private static DELAY = 120;
        private static ARROW_KEYS = [
            "up",
            "right",
            "down",
            "left"
        ];

        private container: PIXI.Container;
        private imageLoader: ImageLoader;
        private arrowKeysAnimation: PIXI.Sprite;

        private surfaceIndex: number = 0;
        private timer: number = 0;

        public onPlayClicked = new Event<void>();
        public onBackToMenuClicked = new Event<void>();

        public constructor(imageLoader: ImageLoader) {

            this.container = new PIXI.Container();
            this.imageLoader = imageLoader;

            const HALF_WINDOW_WIDTH = Constants.WINDOW_WIDTH * 0.5;
            const STRIPE_HEIGHT = 133;
            const TEXT_WIDTH = 1200;
            const BORDER = (Constants.WINDOW_WIDTH - TEXT_WIDTH) * 0.5;
            const BORDER_BOTTOM = 85;

            const DIRECTIONS_STRING =
                "HELP THE FROGS TO CROSS THE ROAD AND THE RIVER " +
                "TO REACH THE DECKS THE OTHER SIDE.\n\n" +
                "USE THE ARROW KEYS OF THE KEYBOARD TO MOVE.";

            const BUTTON_TEXT_STYLE = {font: "45px Arial", fill: "white"};
            const DIRECTIONS_TEXT_STYLE =
                { font: "52px Arial", fill: "white", align: "left", wordWrap: true, wordWrapWidth: TEXT_WIDTH };

            // Generates the background.
            let background = new PIXI.extras.TilingSprite(imageLoader.get("background"),
                Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);

            let stripe = new PIXI.extras.TilingSprite(imageLoader.get("small-stripe"), Constants.WINDOW_WIDTH, STRIPE_HEIGHT);
            stripe.y = 50;

            let title = new PIXI.Text("DIRECTIONS",{ font: "70px Arial", fill: "black" });
            title.x = BORDER;
            title.y = 80;

            let directions = new PIXI.Text(DIRECTIONS_STRING, DIRECTIONS_TEXT_STYLE);
            directions.anchor.x = 0.5;
            directions.x = HALF_WINDOW_WIDTH;
            directions.y = 250;

            this.arrowKeysAnimation = new PIXI.Sprite(imageLoader.get("arrow-keys-up"));
            this.arrowKeysAnimation.anchor.x = 0.5;
            this.arrowKeysAnimation.x = HALF_WINDOW_WIDTH;
            this.arrowKeysAnimation.y = 645;

            let defaultTexture = imageLoader.get("panel-button");
            let hoveredTexture = imageLoader.get("panel-button-hovered");
            let clickedTexture = imageLoader.get("panel-button-clicked");

            const HORIZONTAL_BORDER_BUTTON = BORDER + defaultTexture.width * 0.5;
            const VERTICAL_BORDER_BUTTON = Constants.WINDOW_HEIGHT - BORDER_BOTTOM - defaultTexture.height;

            let menuButton = new Button(defaultTexture, "MENU", BUTTON_TEXT_STYLE);
            menuButton.hoveredTexture = hoveredTexture;
            menuButton.clickedTexture = clickedTexture;
            menuButton.onClick = this.onBackToMenuClicked;
            menuButton.anchor.x = 0.5;
            menuButton.x = HORIZONTAL_BORDER_BUTTON;
            menuButton.y = VERTICAL_BORDER_BUTTON;

            let playButton = new Button(defaultTexture, "PLAY", BUTTON_TEXT_STYLE);
            playButton.hoveredTexture = hoveredTexture;
            playButton.clickedTexture = clickedTexture;
            playButton.onClick = this.onPlayClicked;
            playButton.anchor.x = 0.5;
            playButton.x = Constants.WINDOW_WIDTH - HORIZONTAL_BORDER_BUTTON;
            playButton.y = VERTICAL_BORDER_BUTTON;

            this.container.addChild(background);
            this.container.addChild(stripe);
            this.container.addChild(title);
            this.container.addChild(directions);
            this.container.addChild(this.arrowKeysAnimation);
            this.container.addChild(menuButton);
            this.container.addChild(playButton);
        }

        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }

        public update(deltaTime: number): void {

            if (this.timer >= GameDirectionsView.DELAY) {
                this.timer = 0;
                this.surfaceIndex = ++this.surfaceIndex % GameDirectionsView.ARROW_KEYS.length;
                this.arrowKeysAnimation.texture =
                    this.imageLoader.get(`arrow-keys-${GameDirectionsView.ARROW_KEYS[this.surfaceIndex]}`);
            } else {
                this.timer += deltaTime;
            }
        }
    }
}