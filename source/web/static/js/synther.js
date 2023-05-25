class Synther {
  
  constructor(compass) {
    textFont('Courier New', 20);

    this.compass = compass;

    // Create an oscillator and start it
    this.oscillator = new p5.Oscillator();
    this.oscillator.setType('sine');
    
    // Create a reverb effect
    this.reverb = new p5.Reverb();
    this.oscillator.disconnect();
    this.reverb.process(this.oscillator, 2, 2);
    
    // Create a distortion effect
    this.distortion = new p5.Distortion(0.8);
    this.reverb.connect(this.distortion);
    
    this.isPaying = false;
    this.old_compass = new Array(this.compass.limit).fill(0);
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
  }

  show() {
    let freq = 0;
    let amp = 0;
    let dist = 0;

    if (this.isPaying) {
      freq = map(this.beta, -180, 180, 100, 1000);
      amp = this._getAmp();
      dist = this._getDistortion();

      this.distortion.set(this._getDistortion());
      this.oscillator.freq(freq);
      this.oscillator.amp(amp);
    }
    
    // this._drawText(freq, amp, dist)
  }
    
  toPlay() {
    this.oscillator.start();
    this.isPaying = true;
  }
  
  toStop() {
    this.oscillator.stop();
    this.isPaying = false;
  }

  updateAngles(newAnges) {
    this.alpha = newAnges.alpha;
    this.beta = newAnges.beta;
    this.gamma = newAnges.gamma;
  }

  _getDistortion() { // [0. 1]
    let dist0 = Math.pow(compass.counter / compass.limit, 2) * (0.1 + (compass.iteration * 0.1));
    return dist0;
  }

  _getAmp() { // [0, 0.5]
    let amp0 = Math.pow(compass.counter / compass.limit, 2) * 0.5;
    return amp0;
  }

  _drawText(freq, amp, dist) {
    strokeWeight(1);
    fill(200);
    let _yPossition = 40;
    text('freq       : ' + freq.toFixed(3) + ' Hz', 50, _yPossition);
    text('amp        : ' + amp.toFixed(3), 50, _yPossition += 40);
    text('distortion : ' + dist.toFixed(3), 50, _yPossition += 40);
    text('alpha      : ' + this.alpha, 50, _yPossition += 40);
    text('beta       : ' + this.beta, 50, _yPossition += 40);
    text('gamma      : ' + this.gamma, 50, _yPossition += 40);
    text('counter    : ' + this.compass.counter, 50, _yPossition += 40);
    text('iteration  : ' + this.compass.iteration, 50, _yPossition += 40);
  }
}