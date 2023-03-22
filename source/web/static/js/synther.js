class Synther {
  
  constructor() {
    userStartAudio();
    this.delay_ms = 1000

    this.carrier = new p5.Oscillator(); // connects to master output by default
    this.carrier.freq(340);
    this.carrier.amp(0);
    // carrier's amp is 0 by default, giving our modulator total control
  
    this.carrier.start();
  
    this.modulator = new p5.Oscillator('triangle');
    this.modulator.disconnect(); // disconnect the modulator from master output
    this.modulator.freq(5);
    this.modulator.amp(1);
    this.modulator.start();
  
    this.isPaying = false;
    // Modulate the carrier's amplitude with the modulator
    // Optionally, we can scale the signal.
    this.carrier.amp(this.modulator.scale(-1, 1, 1, -1));

    this.fft = new p5.FFT();
    this.listenAcc();
  }

  print() {
    let modFreq = map(this.beta, 0, 180, 20, 0);
    this.modulator.freq(modFreq);

    let modAmp = map(this.alpha, 0, 360, 0, 1);
    this.modulator.amp(modAmp, 0.01);
    
    this.drawText(modFreq, modAmp)
  }

    
  drawText(modFreq, modAmp) {
    strokeWeight(1);
    fill(100);
    let _yPossition = 40;
    text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 50, _yPossition);
    text('Modulator Amplitude: ' + modAmp.toFixed(3), 50, _yPossition += 40);
    text('alpha: ' + this.alpha, 50, _yPossition += 40);
    text('beta: ' + this.beta, 50, _yPossition += 40);
    text('gamma: ' + this.gamma, 50, _yPossition += 40);
  }

  mousePressed() {
    if (this.isPaying) {
      this.modulator.stop(this.delay_ms)
      this.carrier.stop()
      this.isPaying = !this.isPaying;
    } 
    else {
      this.modulator.start()
      this.carrier.start()
      this.isPaying = !this.isPaying;
    }
  }

  listenAcc() {
    window.addEventListener('deviceorientation', ev => {
      this.alpha = Math.round(ev.alpha); // Z [0, 360]
      this.beta = Math.round(ev.beta);   // X [-180, 180]
      this.gamma = Math.round(ev.gamma); // Y [-90, 90]
    });
  }

}