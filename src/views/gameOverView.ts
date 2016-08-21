/// <reference path="graphicsFactory.ts" />
/// <reference path="controls/button.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Views {

    import Constants = FroggerJS.Constants;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Button = FroggerJS.Views.Controls.Button;
    import Event = Utils.Event;

    export class GameOverView implements Renderable {

        private static PANEL_WIDTH = 600;
        private static PANEL_HEIGHT = 400;

        private container: PIXI.Container;

        public onReplayClicked = new Event<void>();
        public onBackToMenuClicked = new Event<void>();

        public constructor(imageLoader: ImageLoader) {

            const HALF_PANEL_WIDTH = GameOverView.PANEL_WIDTH * 0.5;
            const TEXT_STYLE = {font: "45px Arial", fill: "white"};

            this.container = new PIXI.Container();
            let panel = GraphicsFactory.createPanel(GameOverView.PANEL_WIDTH, GameOverView.PANEL_HEIGHT);

            // Creates the title label.
            let title = new PIXI.Text("GAME OVER", {font: "60px Arial", fill: "white"});
            title.anchor.x = 0.5;
            title.x = HALF_PANEL_WIDTH;
            title.y = 50;
            panel.addChild(title);

            let defaultTexture = imageLoader.get("panel-button");
            let hoveredTexture = imageLoader.get("panel-button-hovered");
            let clickedTexture = imageLoader.get("panel-button-clicked");

            // Initializes the replay button.
            let replayButton = new Button(defaultTexture, "REPLAY", TEXT_STYLE);
            replayButton.hoveredTexture = hoveredTexture;
            replayButton.clickedTexture = clickedTexture;
            replayButton.anchor.x = 0.5;
            replayButton.x = HALF_PANEL_WIDTH;
            replayButton.y = 170;

            replayButton.onClick.register(function () {
                this.onReplayClicked.invoke();
            }, this);

            // Initializes the menu button.
            let menuButton = new Button(defaultTexture, "MENU", TEXT_STYLE);
            menuButton.hoveredTexture = hoveredTexture;
            menuButton.clickedTexture = clickedTexture;
            menuButton.anchor.x = 0.5;
            menuButton.x = HALF_PANEL_WIDTH;
            menuButton.y = 275;

            menuButton.onClick.register(function () {
                this.onBackToMenuClicked.invoke();
            }, this);

            panel.addChild(replayButton);
            panel.addChild(menuButton);
            panel.addChild(replayButton);

            this.container.addChild(GraphicsFactory.createBackgroundPane());
            this.container.addChild(panel);
        }

        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }
    }
}