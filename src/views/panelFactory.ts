/// <reference path="../config.ts" />

namespace FroggerJS.Views {

    import Constants = FroggerJS.Constants;

    /**
     * Defines a factory for the panel.
     */
    export class PanelFactory {

        /**
         * Creates a transparent white panel to use as background.
         *
         * @returns {PIXI.Graphics}     The graphic of the background panel.
         */
        public static createBackgroundPanel(): PIXI.Graphics {

            let background = new PIXI.Graphics();
            background.beginFill(0xFFFFFF, 0.5);
            background.drawRect(0, 0, Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);
            background.endFill();

            return background;
        }

        /**
         * Creates a panel of the specified size.
         *
         * @param width                 The width of the panel to create.
         * @param height                The height of the panel to create.
         * @returns {PIXI.Graphics}     The graphic of the panel.
         */
        public static createPanel(width: number, height: number): PIXI.Graphics {

            let panel = new PIXI.Graphics();
            panel.beginFill(Constants.PANEL_COLOR);
            panel.lineStyle(4, 0x000000);
            panel.drawRect(0, 0, width, height);
            panel.endFill();

            panel.x = Constants.WINDOW_WIDTH * 0.5 - width * 0.5;
            panel.y = Constants.WINDOW_HEIGHT * 0.5 - height * 0.5;

            return panel;
        }
    }
}