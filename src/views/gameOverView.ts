/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/container.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/event.ts" />
/// <reference path="controls/button.ts" />

namespace FroggerJS.Views {

    import Constants = FroggerJS.Constants;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Button = FroggerJS.Views.Controls.Button;
    import Event = Utils.Event;

    export class GameOverView implements Renderable {

        private container: PIXI.Container;

        public onReplayClicked = new Event<void>();
        public onBackToMenuClicked = new Event<void>();

        public constructor(imageLoader?: ImageLoader) {

            this.container = new PIXI.Container();

            let background = new PIXI.Graphics();
            background.beginFill(0xFFFFFF, 0.5);
            background.drawRect(0, 0, Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);
            background.endFill();

            let panel = new PIXI.Graphics();
            panel.beginFill(0x0D7EB4);
            panel.lineStyle(4, 0x000000);
            panel.drawRect(0, 0, 600, 400);
            panel.endFill();

            panel.x = Constants.WINDOW_WIDTH * 0.5 - 300;
            panel.y = Constants.WINDOW_HEIGHT * 0.5 - 200;

            let title = new PIXI.Text("GAME OVER", {font: "60px Arial", fill: "white"});
            title.anchor.x = 0.5;
            title.x = 300;
            title.y = 60;
            panel.addChild(title);

            let defaultTexture = imageLoader.get("panel-button");
            let hoveredTexture = imageLoader.get("panel-button-hovered");
            let clickedTexture = imageLoader.get("panel-button-clicked");
            
            let replayButton = new Button(defaultTexture, "REPLAY", {font: "45px Arial", fill: "white"});
            replayButton.hoveredTexture = hoveredTexture;
            replayButton.clickedTexture = clickedTexture;
            replayButton.anchor.x = 0.5;
            replayButton.x = 300;
            replayButton.y = 170;

            replayButton.onClick.register(function () {
                this.onReplayClicked.invoke();
            }, this);

            let menuButton = new Button(defaultTexture, "MENU", {font: "45px Arial", fill: "white"});
            menuButton.hoveredTexture = hoveredTexture;
            menuButton.clickedTexture = clickedTexture;
            menuButton.anchor.x = 0.5;
            menuButton.x = 300;
            menuButton.y = 275;

            menuButton.onClick.register(function () {
                this.onBackToMenuClicked.invoke();
            }, this);

            panel.addChild(replayButton);
            panel.addChild(menuButton);
            panel.addChild(replayButton);

            this.container.addChild(background);
            this.container.addChild(panel);
        }

        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }
    }
}