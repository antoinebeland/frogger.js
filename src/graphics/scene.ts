/// <reference path="drawable.ts" />
/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;

    export class Scene {

        private width: number;
        private height: number;
        private renderer : PIXI.WebGLRenderer;
        private stage: PIXI.Container;

        public onRender = new Event<void>();

        public constructor(width: number, height: number) {

            this.width = width;
            this.height = height;

            this.renderer = new PIXI.WebGLRenderer(width, height);
            document.body.appendChild(this.renderer.view);

            this.stage = new PIXI.Container();
        }

        public addChild(object: PIXI.Sprite|Drawable) {
            if(object instanceof PIXI.Sprite) {
                this.stage.addChild(object);
            } else {
                this.stage.addChild(object.getSprite());
            }
        }

        public removeChild(sprite: PIXI.Sprite) {
            this.stage.removeChild(sprite);
        }

        public getWidth(): number {
            return this.width;
        }

        public getHeight(): number {
            return this.height;
        }

        public render() {
            let self = this;
            function animate() {
                requestAnimationFrame(animate);
                self.onRender.invoke();
                self.renderer.render(self.stage);
            }
            animate();
        }
    }
}