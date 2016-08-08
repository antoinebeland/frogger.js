/// <reference path="../config.ts" />
/// <reference path="renderable.ts" />
/// <reference path="updatable.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;
    import Sprite = PIXI.Sprite;
    import Updatable = FroggerJS.Graphics.Updatable;

    export class Scene implements Updatable {

        private width: number;
        private height: number;

        private stage: PIXI.Container;
        private renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer;

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

        public addChild(object: PIXI.DisplayObject | Renderable): void {

            if (object instanceof PIXI.DisplayObject) {
                this.stage.addChild(object);
            }
            else {
                this.stage.addChild((object as Renderable).getDisplayObject());
            }
        }

        public removeChild(object: PIXI.DisplayObject | Renderable): void {
            
            if (object instanceof PIXI.DisplayObject) {
                this.stage.removeChild(object);
            }
            else {
                this.stage.removeChild((object as Renderable).getDisplayObject());
            }
        }

        public clear() {
            this.stage.removeChildren();
        }

        public update(deltaTime: number): void {
            //noinspection TypeScriptValidateTypes
            this.renderer.render(this.stage);
        }

        /**
         * @see http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/
         */
        private resize() {
            let ratio = Math.min(window.innerWidth / this.width, window.innerHeight / this.height);
            this.stage.scale.x = this.stage.scale.y = ratio;
            this.renderer.resize(Math.ceil(this.width * ratio), Math.ceil(this.height * ratio));
        }
    }
}