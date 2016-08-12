namespace FroggerJS.Game.Objects {

    /**
     * Defines the possible orientation for the objects.
     */
    export enum Orientation {
        Up,
        Down,
        Left,
        Right
    }

    /**
     * Defines some useful functions to manipulate the Orientation enum.
     */
    export class OrientationUtils {

        /**
         * Gets the orientation associated with the specified string.
         *
         * @param orientation       The orientation string to associated with a value of the Orientation enum.
         * @returns {Orientation}   The orientation associated with the specified string.
         */
        public static getOrientationFromString(orientation: string): Orientation {

            switch (orientation.toLowerCase()) {
                case "up":
                    return Orientation.Up;
                case "down":
                    return Orientation.Down;
                case "left":
                    return Orientation.Left;
                case "right":
                    return Orientation.Right;
            }
            throw new Error("The specified string for the orientation doesn't exist.");
        }
    }
}
