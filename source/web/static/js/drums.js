const KICK_SEGMENTATION = Math.pow(2, 6);

class Drums {

    // on pre load
    constructor() {
        soundFormats('wav');
        this._kick = loadSound('assets/kick_1.wav');
        this._kick.setVolume(1);
    }

    show() {}

    toKick() {
        this._kick.pan(random(-1, 1));
        this._kick.play();
    }
}