namespace FroggerJS.States {

    export interface UpdatableState extends State {
        update() : void;
    }
}
