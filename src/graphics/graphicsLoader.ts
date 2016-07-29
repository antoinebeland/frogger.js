/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;

    export class GraphicsLoader {

        private loader: PIXI.loaders.Loader;
        private baseResourcesPath : string;

        public onLoadingCompleted = new Event<void>();

        public constructor(baseResourcesPath : string) {

            this.loader = PIXI.loader;
            this.baseResourcesPath = baseResourcesPath;

            let self = this;
            this.loader.once("complete", function () {
                self.onLoadingCompleted.invoke();
            });
        }

        public register(element: string|string[]) {

            if(element instanceof Array) {
                for(let i = 0; i < element.length; ++i) {
                    this.registerSingleElement(element[i]);
                }
            }
            else {
                this.registerSingleElement(element);
            }
        }

        public get() {

        }

        public load() {
            this.loader.load();
        }

        private registerSingleElement(name: string) {
            this.loader.add(name, `${this.baseResourcesPath}/${name}.png`);
        }
    }
}