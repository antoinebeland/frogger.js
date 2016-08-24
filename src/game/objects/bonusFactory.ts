/// <reference path="bonus.ts" />
/// <reference path="heart.ts" />
/// <reference path="star.ts" />
/// <reference path="../../graphics/imageLoader.ts" />

namespace FroggerJS.Game.Objects {

    import ImageLoader = FroggerJS.Graphics.ImageLoader;

    /**
     * Defines a factory for the bonus objects.
     */
    export class BonusFactory {

        private imageLoader: ImageLoader;

        /**
         * Initializes a new instance of the BonusFactory class.
         *
         * @param imageLoader   The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {
            this.imageLoader = imageLoader;
        }

        /**
         * Creates a new bonus based on the specified name.
         *
         * @param bonusName     The name associated with the bonus to create.
         * @returns {Bonus}     A new instance of a mobile based on the specified features.
         */
        public create(bonusName: string): Bonus {

            switch (bonusName.toLowerCase()) {
                case Heart.TYPE:
                    return new Heart(this.imageLoader);
                case Star.TYPE:
                    return new Star(this.imageLoader);
            }
            throw new Error("The bonus name doesn't exist.");
        }
    }
}
