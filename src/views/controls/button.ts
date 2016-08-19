/// <reference path="../../graphics/renderable.ts" />
/// <reference path="../../utils/event.ts" />

namespace FroggerJS.Views.Controls {

    import Renderable = FroggerJS.Graphics.Renderable;
    import Event = Utils.Event;

    /**
     * Defines a button.
     */
    export class Button extends PIXI.Sprite {

        private defaultTexture: PIXI.Texture;
        private isHovered: boolean = false;

        /**
         * Gets or sets the hovered texture for the button.
         *
         * @type {PIXI.Texture}
         */
        public hoveredTexture: PIXI.Texture = undefined;

        /**
         * Gets or sets the clicked texture for the button.
         *
         * @type {PIXI.Texture}
         */
        public clickedTexture: PIXI.Texture = undefined;

        /**
         * Gets or sets the text of the button.
         *
         * @type {PIXI.Text}
         */

        public text: PIXI.Text;

        /**
         * Occurred when the button is clicked.
         *
         * @type {Utils.Event<void>}
         */
        public onClick = new Event<void>();

        /**
         * Occurred when the button is hovered.
         *
         * @type {Utils.Event<void>}
         */
        public onHover = new Event<void>();

        /**
         * Initializes a new instance of the Button class.
         *
         * @param defaultTexture    The default texture of the button.
         * @param [text]            The text to display with the button.
         * @param [style]           The text style to apply.
         */
        public constructor(defaultTexture: PIXI.Texture, text: string = "", style?: any) {

            super(defaultTexture);

            this.interactive = true;
            this.defaultTexture = defaultTexture;

            this.on('mouseover', onMouseOver)
                .on('mouseout', onMouseOut)
                .on('mousedown', onButtonDown)
                .on('mouseup', onButtonUp)
                .on('mouseupoutside', onButtonUp)
                .on('touchstart', onButtonDown)
                .on('touchend', onButtonUp)
                .on('touchendoutside', onButtonUp);

            this.text = (style) ? new PIXI.Text(text, style) : new PIXI.Text(text);
            this.text.anchor.x = 0.5;
            this.text.anchor.y = 0.5;
            this.text.position.y = this.height * 0.5;

            this.addChild(this.text);
            
            function onButtonDown() {
                if (this.clickedTexture) {
                    this.texture = this.clickedTexture;
                }
            }

            function onButtonUp() {
                if (this.isHovered) {
                    this.onClick.invoke();
                }
                this.texture = this.defaultTexture;
            }

            function onMouseOver() {
                this.isHovered = true;
                if (this.hoveredTexture) {
                    this.texture = this.hoveredTexture;
                }
            }

            function onMouseOut() {
                this.isHovered = false;
                this.texture = this.defaultTexture;
            }
        }
    }
}