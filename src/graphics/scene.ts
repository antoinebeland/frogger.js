/// <reference path="../config.ts" />
/// <reference path="renderable.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;
    import Sprite = PIXI.Sprite;

    export class Scene {

        private width: number;
        private height: number;
        private stage: PIXI.Container;
        private renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        public onRender = new Event<void>();

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
            let displayObject = (object instanceof PIXI.DisplayObject) ? object
                : (object as Renderable).getDisplayObject();

            this.stage.addChild(displayObject);
        }

        public removeChild(object: PIXI.DisplayObject | Renderable): void {
            let sprite = (object instanceof PIXI.DisplayObject) ? object
                : (object as Renderable).getDisplayObject();

            this.stage.removeChild(sprite);
        }

        // TODO: Use PIXI.ticker.shared instead...
        public render(): void {
            let self = this;
            function animate() {
                requestAnimationFrame(animate);
                self.onRender.invoke();
                //noinspection TypeScriptValidateTypes
                self.renderer.render(self.stage);
            }
            animate();
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