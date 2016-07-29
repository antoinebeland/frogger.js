/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;

    export class Scene {

        private renderer : PIXI.WebGLRenderer;
        private stage: PIXI.Container;

        public onRender = new Event<void>();

        public constructor(width: number, height: number) {

            this.renderer = new PIXI.WebGLRenderer(width, height);
            document.body.appendChild(this.renderer.view);

            this.stage = new PIXI.Container();
        }

        public addChild(sprite: Sprite) {

        }

        public removeChild(sprite: Sprite) {

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