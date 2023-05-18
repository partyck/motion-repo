class Compass {
  
  constructor() {
    this.limit = pow(2, 10);
    this.counter = 0;
    this.iteration = 0;
    this.isPlaying = false;
  }

  getCounter01() {
    return map(this.counter, 0, this.limit, 0, 1);
  }

  show() {
    if (!this.isPlaying) {
      return;
    }

    this.counter++;

    if (this.counter === this.limit) {
      console.log('iteration : '+this.iteration);
      this.iteration++;
      this.counter = 0;
    }
  }

  toPlay() {
    this.isPlaying = !this.isPlaying;
  }
  
  toStop() {
    this.isPlaying = !this.isPlaying;
  }

}