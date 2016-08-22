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
         * @param basePath  The base path where the audio files are located.
         */
        public constructor(basePath: string) {
            this.basePath = basePath;
            this.sounds = {};
        }

        /**
         * Registers the specified file name with the specified key.
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
         * Registers the specified maps.
         *
         * @param map   The map to register.
         */
        public registerMap(map: { name: string; file: string; }[]) {
            for (let entry of map) {
                this.register(entry.name, entry.file);
            }
        }

        /**
         * Plays the sound associated with the specified identifier.
         *
         * @param identifier    The identifier associated with the file name to play.
         * @param [inLoop]      Indicates if the sound must be played in loop. The default value is FALSE.
         * @param [volume]      The volume of the sound.
         */
        public play(identifier: string, inLoop: boolean = false, volume: number = 1): void {

            if (!this.sounds[identifier]) {
                throw new Error(`The specified '${identifier}' identifier doesn't exist.`);
            }

            let sound = this.sounds[identifier];
            sound.off("fade");
            sound.volume(volume);
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
         * @param [volume]      The volume of the sound at the end of the fade out.
         */
        public fadeIn(identifier: string, duration: number, inLoop: boolean = false, volume: number = 1): void {

            if (!this.sounds[identifier]) {
                throw new Error(`The specified '${identifier}' identifier doesn't exist.`);
            }

            this.play(identifier, inLoop, 0);
            this.sounds[identifier].fade(0, volume, duration);
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