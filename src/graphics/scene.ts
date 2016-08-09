/// <reference path="../config.ts" />
/// <reference path="renderable.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;
    import Sprite = PIXI.Sprite;
    import Updatable = FroggerJS.Graphics.Updatable;

    /**
     * Defines the graphic scene.
     */
    export class Scene implements Updatable {

        private width: number;
        private height: number;

        private stage: PIXI.Container;
        private renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        /**
         * Initializes a new instance of the Scene class.
         *
         * @param width     The width of the scene.
         * @param height    The height of the scene.
         */
        public constructor(width: number, height: number) {

            this.width = width;
            this.height = height;

            this.stage = new PIXI.Container();
            this.renderer = PIXI.autoDetectRenderer(width, height, {
                resolution: window.devicePixelRatio
            });
            this.resize();
            
            document.body.appendChild(this.renderer.view);
            window.addEventListener("resize", this.resize.bind(this));
        }

        /**
         * Adds the specified child to the scene.
         *
         * @param object    The object to add.
         */
        public addChild(object: PIXI.DisplayObject | Renderable): void {

            if (object instanceof PIXI.DisplayObject) {
                this.stage.addChild(object);
            }
            else {
                this.stage.addChild((object as Renderable).getDisplayObject());
            }
        }

        /**
         *  Removes the specified of the scene.
         *
         * @param object    The object to remove.
         */
        public removeChild(object: PIXI.DisplayObject | Renderable): void {
            
            if (object instanceof PIXI.DisplayObject) {
                this.stage.removeChild(object);
            }
            else {
                this.stage.removeChild((object as Renderable).getDisplayObject());
            }
        }

        /**
         * Clears all the objects of the scene.
         */
        public clear() {
            this.stage.removeChildren();
        }

        /**
         * Updates the scene.
         *
         * @param deltaTime     The delta time to use.
         */
        public update(deltaTime: number): void {
            //noinspection TypeScriptValidateTypes
            this.renderer.render(this.stage);
        }

        /**
         * Resizes the scene at the good dimension based on the window size.
         *
         * @see http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/
         */
        private resize() {
            let ratio = Math.min(window.innerWidth / this.width, window.innerHeight / this.height);
            this.stage.scale.x = this.stage.scale.y = ratio;
            this.renderer.resize(Math.ceil(this.width * ratio), Math.ceil(this.height * ratio));
        }
    }
}