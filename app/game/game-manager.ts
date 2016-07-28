/// <reference path="../utils/event.ts" />

namespace FroggerJS.Game {

    import Scene = FroggerJS.Rendering.Scene;

    export class GameManager {
        
        private scene : Scene;
        
        onGameOver : Utils.Event<void>;

        public constructor(scene : Scene) {
            this.scene = scene;
        }
    }
}
