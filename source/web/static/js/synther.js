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
  }

  print() {
    let modFreq = map(mouseY, 0, height, 20, 0);
    this.modulator.freq(modFreq);
  
    let modAmp = map(mouseX, 0, width, 0, 1);
    this.modulator.amp(modAmp, 0.01);
    
    this.drawWaveform(this.fft.waveform())
    this.drawText(modFreq, modAmp)
  }

  drawWaveform(waveform) {
    stroke(100);
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i], -1, 1, -height / 2, height / 2);
      vertex(x, y + height / 2);
    }
    endShape();
  }
    
  drawText(modFreq, modAmp) {
    strokeWeight(1);
    fill(100);
    text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 50, 20);
    text('Modulator Amplitude: ' + modAmp.toFixed(3), 20, 40);
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

}