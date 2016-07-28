/// <reference path="../utils/event.ts" />

namespace FroggerJS.Rendering {

    import Event = Utils.Event;

    export class Scene {

        private scene: THREE.Scene;
        onRendering: Event<void>;

        public constructor() {
            this.scene = new THREE.Scene();
            this.onRendering = new Event<void>();
        }

        public add(object: THREE.Mesh|THREE.Camera) {
            this.scene.add(object);
        }
        
        public removeAll() {
            for( let i = this.scene.children.length - 1; i >= 0; i--) {
                this.scene.remove(this.scene.children[i]);
            }
        }

        public render() {

            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            let self = this;
            var update = function () {
                self.onRendering.invoke();
                renderer.render(this.scene, this.camera);
                requestAnimationFrame(update);
            };
            update();
        }
    }
}