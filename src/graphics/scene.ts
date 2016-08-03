/// <reference path="../configuration.ts" />
/// <reference path="renderable.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;

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

        public addChild(object: PIXI.Sprite | Renderable, scaleToApply: number = 1): void {
            let sprite = (object instanceof PIXI.Sprite) ? object : object.getSprite();
            sprite.scale.x = scaleToApply;
            sprite.scale.y = scaleToApply;

            this.stage.addChild(sprite);
        }

        public removeChild(object: PIXI.Sprite | Renderable): void {
            let sprite = (object instanceof PIXI.Sprite) ? object : object.getSprite();
            this.stage.removeChild(sprite);
        }

        // TODO: Use PIXI.ticker.shared instead...
        public render(): void {
            let self = this;
            function animate() {
                requestAnimationFrame(animate);
                self.onRender.invoke();
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