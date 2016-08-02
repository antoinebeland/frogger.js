namespace FroggerJS.Game.Objects {

    export enum Orientation {
        Up = 0,
        Left = 3 * Math.PI / 2,
        Down = Math.PI,
        Right = Math.PI / 2
    }

    export class OrientationUtils {
        
        public static fromStringToOrientation(orientationString: string): Orientation {
            switch (orientationString.toLowerCase()) {
                case "up":
                    return Orientation.Up;
                case "left":
                    return Orientation.Left;
                case "down":
                    return Orientation.Down;
                case "right":
                    return Orientation.Right;
            }
            throw "ERROR: Invalid orientation string specified.";
        }
    }
}