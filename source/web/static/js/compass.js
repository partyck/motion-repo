class Compass {
  
  constructor() {
    this.limit = pow(2, 10);
    this.contador = 0;
    this.iteration = 0;
    this.isPlaying = false;
  }

  show() {
    if (!this.isPlaying) {
      return;
    }

    if (this.contador === this.limit) {
      console.log('iteration : '+this.iteration);
      this.iteration++;
      this.contador = 0;
    }

    this.contador++;
  }

  toPlay() {
    this.isPlaying = !this.isPlaying;
  }
  
  toStop() {
    this.isPlaying = !this.isPlaying;
  }

}