/// <reference path="panelFactory.ts" />
/// <reference path="controls/animatedText.ts" />
/// <reference path="../graphics/renderable.ts" />
/// <reference path="../graphics/updatable.ts" />

namespace FroggerJS.Views {

    import AnimatedText = FroggerJS.Views.Controls.AnimatedText;
    import Constants = FroggerJS.Constants;
    import Renderable = FroggerJS.Graphics.Renderable;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the panel to display before to start the level.
     */
    export class GameLevelView implements Renderable, Updatable {

        private static PANEL_WIDTH = 600;
        private static PANEL_HEIGHT = 220;

        private container: PIXI.Container;
        private animatedLabel: AnimatedText;

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

            this.animatedLabel = new AnimatedText("PRESS ANY KEY TO START", {font: "30px Arial", fill: "white"});
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
            this.animatedLabel.update(deltaTime);
        }
    }
}