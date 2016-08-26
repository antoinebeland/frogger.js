/// <reference path="mobile.ts" />
/// <reference path="orientation.ts" />
/// <reference path="../../graphics/imageLoader.ts" />
/// <reference path="../../physics/rectangleBounding.ts" />
/// <reference path="../../utils/random.ts" />

namespace FroggerJS.Game.Objects {

    import Bounding = FroggerJS.Physics.Bounding;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Random = Utils.Random;
    import RectangleBounding = FroggerJS.Physics.RectangleBounding;

    /**
     * Defines a boat.
     */
    export class Boat extends Mobile {

        public static TYPE = "boat";
        private static availableColors = [
            "red",
            "yellow",
            "white"
        ];

        private sprite: PIXI.Sprite;
        private bounding: Bounding;

        /**
         * Initializes a new instance of the Boat class.
         *
         * @param imageLoader       The image loader to use.
         * @param orientation       The orientation of the boat.
         * @param speed             The speed of the boat.
         */
        public constructor(imageLoader: ImageLoader, orientation: Orientation, speed: number) {
            super(speed, orientation);
            
            let colorIndex = Random.getRandomInt(0, Boat.availableColors.length);
            let surface = imageLoader.get(`${Boat.TYPE}-${Boat.availableColors[colorIndex]}-${orientation}`);

            this.sprite = new PIXI.Sprite(surface);
            this.bounding = new RectangleBounding(this.sprite.position, this.sprite.width, this.sprite.height);
        }

        /**
         * Gets the display object associated with the boat.
         *
         * @returns {PIXI.Sprite}   The sprite associated with the boat.
         */
        public getDisplayObject(): PIXI.Sprite {
            return this.sprite;
        }

        /**
         * Gets the bounding associated with the boat.
         *
         * @returns {Bounding}      The bounding associated with the boat.
         */
        public getBounding(): Bounding {
            return this.bounding;
        }


        /**
         * Indicates if the boat can be hit by the actor.
         *
         * @returns {boolean}       TRUE: the boat can always be hit by the actor.
         */
        public canBeHit(): boolean {
            return true;
        }
    }
}
