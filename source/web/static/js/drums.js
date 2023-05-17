const KICK_SEGMENTATION = Math.pow(2, 6);

class Drums {

    // on pre load
    constructor() {
        soundFormats('wav');
        this._kick = loadSound('assets/kick_1.wav');
        this._kick.setVolume(1);
        
        this._kickCount = 0;
        this._kicks = new Array(compass.limit/KICK_SEGMENTATION);
    }

    show() {
        if (!compass.isPlaying) {
            return;
        }
        
        if (this.toKick()) {
            if (compass.iteration > this._kickCount) {
                let kickIndex = round(random(0, KICK_SEGMENTATION));
                this._kicks[kickIndex] = true;
                this._kickCount ++;
            }
            
            let index = compass.contador / (compass.limit/KICK_SEGMENTATION);
            if (this._kicks[index]) {
                console.log('kick at : '+ index);
                this._kick.pan(random(-1, 1));
                this._kick.play();
            }
        }
    }

    toKick() {
        return (compass.contador % (compass.limit / KICK_SEGMENTATION)) === 0; 
    }
}