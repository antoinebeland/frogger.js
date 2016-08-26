namespace FroggerJS.Math {

    /**
     * Defines the base methods for an interpolation.
     */
    export interface Interpolation {

        /**
         * The next value of the interpolation.
         *
         * @param [deltaTime]     The delta time to use.
         */
        next(deltaTime?: number): number;
    }

    /**
     * Defines the repetition type of the interpolation.
     */
    export enum InterpolationRepetition {

        /**
         * No repetition
         */
        None,

        /**
         * Repeats always the inverse of the current interpolation.
         */
        Inverse,

        /**
         * Repeats always the same interpolation.
         */
        Same
    }

    /**
     * Defines the interpolation configuration.
     */
    export type InterpolationConfiguration = {

        minValue: number,
        maxValue: number,
        increment: number,
        repetition?: InterpolationRepetition,
        sign?: number,
        initialValue?: number
    };
}