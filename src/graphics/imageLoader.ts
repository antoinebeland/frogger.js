/// <reference path="../utils/event.ts" />

namespace FroggerJS.Graphics {

    import Event = Utils.Event;

    /**
     * Loader for the image resources.
     */
    export class ImageLoader {

        private loader: PIXI.loaders.Loader;
        private baseResourcesPath : string;

        /**
         * Occurred when the images loading is completed.
         * @type {Utils.Event<void>}
         */
        public onLoadingCompleted = new Event<void>();

        /**
         * Initializes a new instance of the ImageLoader class.
         * @param baseResourcesPath     The base path where the resources are stored.
         */
        public constructor(baseResourcesPath : string) {

            this.loader = PIXI.loader;
            this.baseResourcesPath = baseResourcesPath;

            let self = this;
            this.loader.once("complete", function () {
                self.onLoadingCompleted.invoke();
            });
        }

        /**
         * Registers one or many images to load.
         * @param element   The element can be a string or a list of strings. 
         *                  The specified string must be the name of the resource.
         */
        public register(element: string|string[]): void {

            if(element instanceof Array) {
                for(let i = 0; i < element.length; ++i) {
                    this.registerSingleElement(element[i]);
                }
            } else {
                this.registerSingleElement(element);
            }
        }

        /**
         * Gets the image associated with the specified name.
         * @param name          The name of the resource.
         * @returns {Texture}
         */
        public get(name: string): PIXI.Texture {

            if(!this.loader.resources[name]) {
                throw `ERROR: The "${name}" doesn't exist in the resources.`
            }
            return this.loader.resources[name].texture;
        }

        /**
         * Loads the register resources.
         */
        public load(): void {
            this.loader.load();
        }

        private registerSingleElement(name: string): void {
            this.loader.add(name, `${this.baseResourcesPath}/${name}.png`);
        }
    }
}