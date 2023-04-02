class Synther {
  
  constructor(compass) {
    this.compass = compass;
    userStartAudio();
    this.delay_ms = 1000

    // OLD

    // set attackLevel, releaseLevel
    // this.env.setRange(1, 0);
    this.carrier_old = new p5.Oscillator(); // connects to master output by default
    this.carrier_old.freq(340);
    this.carrier_old.amp(0);
    // carrier's amp is 0 by default, giving our modulator total control
    // this.carrier_old.start();
    
    // Oscilator options ['sine' (default), 'triangle', 'sawtooth', 'square']
    this.modulator_old = new p5.Oscillator('sine');
    this.modulator_old.disconnect(); // disconnect the modulator from master output
    this.modulator_old.freq(5);
    this.modulator_old.amp(1);
    // this.modulator_old.start();
    
    // Modulate the carrier's amplitude with the modulator
    // Optionally, we can scale the signal.
    this.carrier_old.amp(this.modulator_old.scale(-1, 1, 1, -1));
    
    // NEW
    
    this.carrier_new = new p5.Oscillator();
    this.carrier_new.freq(340);
    this.carrier_new.amp(0);
    // this.carrier_new.start();
    
    this.modulator_new = new p5.Oscillator('square');
    this.modulator_new.disconnect();
    this.modulator_new.freq(5);
    this.modulator_new.amp(1);
    // this.modulator_new.start();
  
    this.carrier_new.amp(this.modulator_new.scale(-1, 1, 1, -1));
    
    
    this.isPaying = false;
    this.fft = new p5.FFT();
    this.listenAcc();

    this.old_compass = new Array(this.compass.limit).fill(0);
  }

  print() {
    let old_freq = 0;
    let new_freq = 0;

    if (this.isPaying) {
      old_freq = this.oldModFreq();
      new_freq = this.newModFreq();
      this.modulator_new.freq(new_freq);
      this.modulator_old.freq(old_freq);
    }


    // let modAmp = map(this.alpha, 0, 360, 0, 1);
    // let modAmp = 0.5;
    this.modulator_new.amp(0.7, 0.01);
    this.modulator_old.amp(0.4, 0.01);
    
    this.drawText(new_freq, old_freq)
  }

  oldModFreq() {
    let old_alpha = this.old_compass[this.compass.contador]
    let mod_freq = map(old_alpha, 0, 360, 20, 0);
    return mod_freq;
  }

  newModFreq() {
    let old_alpha = this.old_compass[this.compass.contador]
    let new_alpha = abs(this.alpha - old_alpha);
    this.old_compass[this.compass.contador] = new_alpha;
    
    let mod_freq = map(new_alpha, 0, 360, 20, 0);
    return mod_freq;
  }

    
  drawText(new_freq, old_freq) {
    strokeWeight(1);
    fill(100);
    let _yPossition = 40;
    text('Mod freq old: ' + old_freq.toFixed(3) + ' Hz', 50, _yPossition);
    text('Mod freq new: ' + new_freq.toFixed(3) + ' Hz', 50, _yPossition += 40);
    text('alpha: ' + this.alpha, 50, _yPossition += 40);
    text('beta: ' + this.beta, 50, _yPossition += 40);
    text('gamma: ' + this.gamma, 50, _yPossition += 40);
    text('contador: ' + this.compass.iteration, 50, _yPossition += 40);
    text('iteration: ' + this.compass.contador, 50, _yPossition += 40);
  }

  toPlay() {
    this.modulator_new.start();
    this.carrier_new.start();

    this.modulator_old.start();
    this.carrier_old.start();

    this.isPaying = true;
  }
  
  toStop() {
    this.modulator_new.stop(this.delay_ms);
    this.carrier_new.stop();
    
    this.modulator_old.stop(this.delay_ms);
    this.carrier_old.stop();
    this.isPaying = false;
  }

  listenAcc() {
    window.addEventListener('deviceorientation', ev => {
      this.alpha = Math.round(ev.alpha); // Z [0, 360]
      this.beta = Math.round(ev.beta);   // X [-180, 180]
      this.gamma = Math.round(ev.gamma); // Y [-90, 90]
    });
  }

}