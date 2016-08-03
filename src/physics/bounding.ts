/// <reference path="../graphics/renderable.ts" />

namespace FroggerJS.Physics {

    import Renderable = FroggerJS.Graphics.Renderable;

    export interface Bounding extends Renderable {

        isCollide(bounding: Bounding): boolean;
    }
}