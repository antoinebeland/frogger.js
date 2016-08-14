/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../utils/event.ts" />

namespace FroggerJS.Views.Controls {

    import Renderable = FroggerJS.Graphics.Renderable;
    import Event = Utils.Event;

    /**
     * Defines a button.
     */
    export class Button implements Renderable {

        private defaultTexture: PIXI.Texture;
        private clickedTexture: PIXI.Texture;

        private sprite: PIXI.Sprite;
        private text: PIXI.Text;

        /**
         * Occurred when the button is clicked.
         *
         * @type {Utils.Event<void>}
         */
        public onClick = new Event<void>();

        /**
         * Initializes a new instance of the Button class.
         *
         * @param defaultTexture    The default texture of the button.
         * @param clickedTexture    The texture to display when the button is clicked.
         * @param [text]            The text to display with the button.
         * @param [style]           The text style to apply.
         */
        public constructor(defaultTexture: PIXI.Texture, clickedTexture: PIXI.Texture, text: string = "", style?: any) {

            this.defaultTexture = defaultTexture;
            this.clickedTexture = clickedTexture;

            this.sprite = new PIXI.Sprite(this.defaultTexture);
            this.sprite.interactive = true;
            this.sprite
                .on('mousedown', onButtonDown)
                .on('mouseup', onButtonUp)
                .on('mouseupoutside', onButtonUp)
                .on('touchstart', onButtonDown)
                .on('touchend', onButtonUp)
                .on('touchendoutside', onButtonUp);

            this.text = (style) ? new PIXI.Text(text, style) : new PIXI.Text(text);
            this.text.anchor.x = 0.5;
            this.text.anchor.y = 0.5;
            this.text.position.y = this.sprite.height * 0.5;

            this.sprite.addChild(this.text);

            let self = this;
            function onButtonDown() {
                this.texture = self.clickedTexture;
            }

            function onButtonUp() {
                self.onClick.invoke();
                this.texture = self.defaultTexture;
            }
        }

        /**
         * Gets the display object associated with the button.
         *
         * @returns {PIXI.Sprite}   The sprite associated with the button.
         */
        public getDisplayObject(): PIXI.DisplayObject {
            return this.sprite;
        }

        /**
         * Sets the text to display with the button.
         *
         * @param text      The text to display.
         */
        public setText(text: string) {
            this.text.text = text;
        }

        /**
         * Sets the text style to apply.
         *
         * @param style     The style to apply.
         */
        public setTextStyle(style: any) {
            this.text.style = style;
        }
    }
}