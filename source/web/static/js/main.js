let bg_color;
let logger;
let synth;
let socket;
let compass;
let drums;
let isPlaying = false;


function preload() {
  compass = new Compass()
  drums = new Drums();
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(200);

  compass = new Compass();
  logger = new MyTerminal();
  synth = new Synther(compass);
  mySocket = new MySocket();
}

function draw() {
  background(bg_color);
  logger.print();
  synth.print();
  compass.print();
  drums.print();
}

function tooglePlay() {
  if(isPlaying) {
    synth.toStop();
    compass.toStop();
  }
  else {
    synth.toPlay();
    compass.toPlay();
  }

  isPlaying = !isPlaying;
}
