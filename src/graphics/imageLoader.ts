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
         *
         * @type {Utils.Event<void>}
         */
        public onLoadingCompleted = new Event<void>();

        /**
         * Initializes a new instance of the ImageLoader class.
         *
         * @param baseResourcesPath     The base path where the resources are stored.
         */
        public constructor(baseResourcesPath: string) {

            this.loader = PIXI.loader;
            this.baseResourcesPath = baseResourcesPath;

            let self = this;
            this.loader.once("complete", function () {
                self.onLoadingCompleted.invoke();
            });
        }

        /**
         * Registers the specified image with the specified name.
         *
         * @param name      The name to associate with the image.
         * @param fileName  The image file name to register.
         */
        public register(name: string, fileName: string): void {

            if (this.loader.resources[name]) {
                throw new Error(`An image is already registered with the '${name}' identifier.`);
            }
            this.loader.add(name, `${this.baseResourcesPath}/${fileName}`);
        }

        /**
         * Registers the specified maps.
         *
         * @param map   The map to register.
         */
        public registerMap(map: { name: string; file: string; }[]) {
            for (let entry of map) {
                this.register(entry.name, entry.file);
            }
        }

        /**
         * Gets the image associated with the specified name.
         *
         * @param name          The name of the resource.
         * @returns {Texture}   The surface associated with the specified name.
         */
        public get(name: string): PIXI.Texture {

            if(!this.loader.resources[name]) {
                throw new Error(`The "${name}" doesn't exist in the resources.`)
            }
            return this.loader.resources[name].texture;
        }

        /**
         * Loads the register resources.
         */
        public load(): void {
            this.loader.load();
        }
    }
}