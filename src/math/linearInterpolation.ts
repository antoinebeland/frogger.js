/// <reference path="interpolation.ts" />

namespace FroggerJS.Math {
    
    /**
     * Defines a linear interpolation.
     */
    export class LinearInterpolation implements Interpolation {

        private static DEFAULT_SIGN = 1;
        private static DEFAULT_REPETITION = InterpolationRepetition.None;

        private minValue: number;
        private maxValue: number;
        private increment: number;
        private sign: number;
        private repetition: InterpolationRepetition;
        private currentValue: number;

        /**
         * Initializes a new instance of the LinearInterpolation class.
         *
         * @param configuration                 The interpolation configuration to use.
         * @param configuration.minValue        The minimum value.
         * @param configuration.maxValue        The maximum value.
         * @param configuration.increment       The increment to use.
         * @param [configuration.sign]          The sign to use to use. By default, the value is 1.
         * @param [configuration.repetition]    The interpolation repetition to use. By default, the value is None.
         * @param [configuration.initialValue]  The initial value to use. By default, the value is
         *                                      the minimum specified.
         */
        public constructor(configuration: InterpolationConfiguration) {

            // Checks if the minimum is valid.
            if (configuration.minValue > configuration.maxValue) {
                throw new Error("The minimum must be less than the maximum.");
            }
            // Checks if the maximum is valid.
            if (configuration.maxValue < configuration.minValue) {
                throw new Error("The maximum must be higher than the minimum.");
            }

            this.minValue = configuration.minValue;
            this.maxValue = configuration.maxValue;
            this.increment = configuration.increment;

            // Optional values
            this.sign = (configuration.sign) ? configuration.sign
                : LinearInterpolation.DEFAULT_SIGN;

            this.repetition = (configuration.repetition) ? configuration.repetition
                : LinearInterpolation.DEFAULT_REPETITION;

            this.currentValue = (configuration.initialValue !== undefined) ? configuration.initialValue
                : configuration.minValue;

            // Checks if the sign is valid.
            if (this.sign != -1 && this.sign != 1) {
                throw new Error("The sign must be 1 or -1.");
            }
            // Checks if the initial value is valid.
            if (this.minValue > this.currentValue ||
                this.maxValue < this.currentValue) {
                throw new Error("The initial value must be bounded by the minimum and the maximum.");
            }
        }

        /**
         * Returns the next value of the interpolation.
         *
         * @param [deltaTime]   The delta time to use. By default, the value is 1.
         * @returns {number}    The next value of the interpolation.
         */
        public next(deltaTime: number = 1): number {

            this.currentValue += this.increment * this.sign * deltaTime;
            if (this.currentValue >= this.maxValue) {
                this.currentValue = this.maxValue;
                this.applyRepetition();
            } else if (this.currentValue <= this.minValue) {
                this.currentValue = this.minValue;
                this.applyRepetition();
            }
            return this.currentValue;
        }

        /**
         * Applies the repetition.
         */
        private applyRepetition() {

            switch (this.repetition) {
                case InterpolationRepetition.Inverse:
                    this.sign = -this.sign;
                    break;
                case InterpolationRepetition.Same:
                    this.currentValue = (this.sign > 0) ? this.minValue : this.maxValue;
            }
        }
    }
}
