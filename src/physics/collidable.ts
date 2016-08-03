/// <reference path="bounding.ts" />

namespace FroggerJS.Physics {

    export interface Collidable {
        getBounding(): Bounding;
    }
}