namespace FroggerJS.Audio {

    /**
     * Defines the manager for the audio.
     */
    export class AudioManager {

        private basePath: string;
        private sounds: { [identifier: string]: Howl };

        /**
         * Initializes a new instance of the AudioManager class.
         *
         * @param basePath  The base path where the sound files are located.
         */
        public constructor(basePath: string) {
            this.basePath = basePath;
            this.sounds = {};
        }

        /**
         * Registers the specified sound with the specified key.
         *
         * @param identifier    The identifier associated with the sound file name.
         * @param fileName      The sound file name to load.
         */
        public register(identifier: string, fileName: string) {

            if (this.sounds[identifier]) {
                throw new Error(`A sound is already registered with the '${identifier}' identifier.`);
            }

            this.sounds[identifier] = new Howl({
                src: `${this.basePath}/${fileName}`
            });
        }

        /**
         * Plays the sound associated with the specified identifier.
         *
         * @param identifier    The identifier associated with the sound to play.
         * @param [inLoop]      Indicates if the sound must be played in loop. The default value is FALSE.
         */
        public play(identifier: string, inLoop: boolean = false): void {

            if (!this.sounds[identifier]) {
                throw new Error(`The specified '${identifier}' identifier doesn't exist.`);
            }

            let sound = this.sounds[identifier];
            sound.off("fade");
            sound.loop(inLoop);
            sound.play();
        }

        /**
         * Stops the sound associated with the specified identifier.
         *
         * @param identifier    The identifier associated with the sound to stop.
         */
        public stop(identifier: string): void {

            if (!this.sounds[identifier]) {
                throw new Error(`The specified '${identifier}' identifier doesn't exist.`);
            }
            this.sounds[identifier].stop();
        }

        /**
         * Fades in the sound associated with the specified identifier.
         *
         * @param identifier    The identifier associated with the sound to fade in.
         * @param duration      The duration of the fade in.
         * @param [inLoop]      Indicates if the sound must be played in loop. The default value is FALSE.
         */
        public fadeIn(identifier: string, duration: number, inLoop: boolean = false): void {

            if (!this.sounds[identifier]) {
                throw new Error(`The specified '${identifier}' identifier doesn't exist.`);
            }

            this.play(identifier, inLoop);
            this.sounds[identifier].fade(0, 1, duration);
        }

        /**
         * Fades out the sound associated with the specified identifier.
         *
         * @param identifier    The identifier associated with the sound to fade out.
         * @param duration      The duration of the fade out.
         */
        public fadeOut(identifier: string, duration: number) {

            if (!this.sounds[identifier]) {
                throw new Error(`The specified '${identifier}' identifier doesn't exist.`);
            }

            let sound = this.sounds[identifier];
            sound.on("fade", function () {
                sound.stop();
            });
            sound.fade(sound.volume(), 0, duration);
        }

        /**
         * Mutes or unmutes all the registered sounds based on the specified value.
         *
         * @param muted     Indicates if the sounds must be muted.
         */
        public mute(muted: boolean) {

            for (var key in this.sounds) {
                if (this.sounds.hasOwnProperty(key)) {
                    this.sounds[key].mute(muted);
                }
            }
        }
    }
}