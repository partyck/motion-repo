class Compass {
  
  constructor() {
    this.limit = 1000;
    this.contador = 0;
    this.iteration = 0;
    this.isPlaying = false;
  }

  print() {
    if (!this.isPlaying) {
      return;
    }

    if (this.contador === this.limit) {
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