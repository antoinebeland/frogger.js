namespace FroggerJS.Graphics {

    export class Sprite {

        private sprite: PIXI.Sprite;

        constructor(texture: PIXI.Texture) {
            this.sprite = new PIXI.Sprite(texture);
        }

        public getSprite(): PIXI.Sprite {
            return this.sprite;
        }
    }
}