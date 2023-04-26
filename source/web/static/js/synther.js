class Synther {
  
  constructor(compass) {
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
  }

  print() {
    let freq = 0;

    if (this.isPaying) {
      // Set the frequency of the oscillator based on the mouse position
      freq = map(this.alpha, 0, 360, 100, 1000);
      this.oscillator.freq(freq);
    }
    
    this._drawText(freq)
  }
    
  toPlay() {
    this.oscillator.start();
    this.isPaying = true;
  }
  
  toStop() {
    this.oscillator.stop();
    this.isPaying = false;
  }

  _drawText(freq) {
    strokeWeight(1);
    fill(100);
    let _yPossition = 40;
    text('freq: ' + freq.toFixed(3) + ' Hz', 50, _yPossition);
    text('alpha: ' + this.alpha, 50, _yPossition += 40);
    text('beta: ' + this.beta, 50, _yPossition += 40);
    text('gamma: ' + this.gamma, 50, _yPossition += 40);
    text('contador: ' + this.compass.iteration, 50, _yPossition += 40);
    text('iteration: ' + this.compass.contador, 50, _yPossition += 40);
  }
}