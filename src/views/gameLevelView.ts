/// <reference path="graphicsFactory.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/updatable.ts" />

namespace FroggerJS.Views {

    import Constants = FroggerJS.Constants;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    export class GameLevelView implements Renderable, Updatable {

        private static PANEL_WIDTH = 600;
        private static PANEL_HEIGHT = 220;
        private static LABEL_ALPHA_FACTOR = 0.012;
        private static MAX_LABEL_ALPHA = 1;
        private static MIN_LABEL_ALPHA = 0.35;

        private container: PIXI.Container;
        private animatedLabel: PIXI.Text;
        private animationFactor: number = -1;

        public constructor(level: number) {

            const HALF_PANEL_WIDTH = GameLevelView.PANEL_WIDTH * 0.5;

            this.container = new PIXI.Container();
            let panel = GraphicsFactory.createPanel(GameLevelView.PANEL_WIDTH, GameLevelView.PANEL_HEIGHT);

            let title = new PIXI.Text("LEVEL " + level, {font: "60px Arial", fill: "white"});
            title.anchor.x = 0.5;
            title.x = HALF_PANEL_WIDTH;
            title.y = 40;
            panel.addChild(title);

            this.animatedLabel = new PIXI.Text("PRESS ANY KEY TO START", {font: "30px Arial", fill: "white"});
            this.animatedLabel.anchor.x = 0.5;
            this.animatedLabel.x = HALF_PANEL_WIDTH;
            this.animatedLabel.y = 140;
            panel.addChild(this.animatedLabel);

            this.container.addChild(GraphicsFactory.createBackgroundPane());
            this.container.addChild(panel);
        }

        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }

        public update(deltaTime: number): void {

            let alphaToApply = this.animatedLabel.alpha +
                GameLevelView.LABEL_ALPHA_FACTOR * this.animationFactor * deltaTime;

            if (alphaToApply >= GameLevelView.MAX_LABEL_ALPHA) {
                alphaToApply = GameLevelView.MAX_LABEL_ALPHA;
                this.animationFactor = -1;
            } else if (alphaToApply <= GameLevelView.MIN_LABEL_ALPHA) {
                alphaToApply = GameLevelView.MIN_LABEL_ALPHA;
                this.animationFactor = 1;
            }
            this.animatedLabel.alpha = alphaToApply;
        }
    }
}