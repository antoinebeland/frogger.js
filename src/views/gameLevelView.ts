/// <reference path="panelFactory.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/updatable.ts" />

namespace FroggerJS.Views {

    import Constants = FroggerJS.Constants;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the panel to display before to start the level.
     */
    export class GameLevelView implements Renderable, Updatable {

        private static PANEL_WIDTH = 600;
        private static PANEL_HEIGHT = 220;
        private static LABEL_ALPHA_FACTOR = 0.012;
        private static MAX_LABEL_ALPHA = 1;
        private static MIN_LABEL_ALPHA = 0.35;

        private container: PIXI.Container;
        private animatedLabel: PIXI.Text;
        private animationFactor: number = -1;

        /**
         * Initializes a new instance of the GameLevelView class.
         *
         * @param level     The level number to display in the panel.
         */
        public constructor(level: number) {

            const HALF_PANEL_WIDTH = GameLevelView.PANEL_WIDTH * 0.5;

            this.container = new PIXI.Container();
            let panel = PanelFactory.createPanel(GameLevelView.PANEL_WIDTH, GameLevelView.PANEL_HEIGHT);

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

            this.container.addChild(PanelFactory.createBackgroundPanel());
            this.container.addChild(panel);
        }

        /**
         * Gets the display object associated with the game level panel.
         *
         * @returns {PIXI.Container}    The container that contains the visual elements of the panel.
         */
        public getDisplayObject(): PIXI.DisplayObject {
            return this.container;
        }

        /**
         * Updates the alpha of the animated label.
         *
         * @param deltaTime             The delta time to use.
         */
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