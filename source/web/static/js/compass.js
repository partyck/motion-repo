class Compass {
  
  constructor() {
    this.limit = pow(2, 11);
    this.counter = 0;
    this.iteration = 0;
    this.isPlaying = false;
    
    this._kickSegmentation = Math.pow(2, 6);
    this._kickCount = 0;
    this._kickIncrement = 2;
    this._kicks = new Array(this.limit/this._kickSegmentation);
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

    if (this._toKick()) {
      if (this._kickIncrement + (this.iteration * this._kickIncrement) > this._kickCount) {
        let kickIndex = round(random(0, this._kickSegmentation));
        this._kicks[kickIndex] = true;
        this._kickCount ++;
      }
          
      let index = this.counter / (this.limit/this._kickSegmentation);
      if (this._kicks[index]) {
        kickAll();
      }
    }
  }

  _toKick() {
    return (this.counter % (this.limit / this._kickSegmentation)) === 0; 
  }

  toPlay() {
    this.isPlaying = !this.isPlaying;
  }
  
  toStop() {
    this.isPlaying = !this.isPlaying;
  }

}