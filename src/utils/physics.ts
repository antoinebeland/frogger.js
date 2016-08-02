namespace Utils {

    export class Physics {

        public static collides(rect1: PIXI.Rectangle, rect2: PIXI.Rectangle): boolean {
            return (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y);
        }
    }
}