/// <reference path="../config.ts" />

namespace FroggerJS.Views {

    import Constants = FroggerJS.Constants;

    export class GraphicsFactory {

        public static createBackgroundPane(): PIXI.Graphics {

            let background = new PIXI.Graphics();
            background.beginFill(0xFFFFFF, 0.5);
            background.drawRect(0, 0, Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);
            background.endFill();

            return background;
        }

        public static createPanel(width: number, heigth: number): PIXI.Graphics {

            let panel = new PIXI.Graphics();
            panel.beginFill(Constants.PANEL_COLOR);
            panel.lineStyle(4, 0x000000);
            panel.drawRect(0, 0, width, heigth);
            panel.endFill();

            panel.x = Constants.WINDOW_WIDTH * 0.5 - width * 0.5;
            panel.y = Constants.WINDOW_HEIGHT * 0.5 - heigth * 0.5;

            return panel;
        }
    }
}