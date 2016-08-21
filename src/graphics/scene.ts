/// <reference path="container.ts" />
/// <reference path="renderable.ts" />
/// <reference path="../config.ts" />

namespace FroggerJS.Graphics {

    import Sprite = PIXI.Sprite;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the graphic scene.
     */
    export class Scene extends Container implements Updatable {

        private width: number;
        private height: number;

        private renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        /**
         * Initializes a new instance of the Scene class.
         *
         * @param width     The width of the scene.
         * @param height    The height of the scene.
         */
        public constructor(width: number, height: number) {

            super();

            this.width = width;
            this.height = height;

            this.renderer = PIXI.autoDetectRenderer(width, height, {
                resolution: window.devicePixelRatio
            });

            this.resize();
            
            document.body.appendChild(this.renderer.view);
            window.addEventListener("resize", this.resize.bind(this));
        }

        /**
         * Updates the scene.
         *
         * @param deltaTime     The delta time to use.
         */
        public update(deltaTime: number): void {
            //noinspection TypeScriptValidateTypes
            this.renderer.render(this.container);
        }

        /**
         * Resizes the scene at the good dimension based on the window size.
         *
         * @see http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/
         */
        private resize() {
            let ratio = Math.min(window.innerWidth / this.width, window.innerHeight / this.height);
            this.container.scale.x = this.container.scale.y = ratio;
            this.renderer.resize(Math.ceil(this.width * ratio), Math.ceil(this.height * ratio));
        }
    }
}