let bg_color;
let synth;
let socket;
let compass;
let drums;
let pose;
let isPlaying = false;


function preload() {
  compass = new Compass()
  drums = new Drums();
  pose = new PoseCapturer();
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(200);

  compass = new Compass();
  synth = new Synther(compass);
  mySocket = new MySocket();
}

function draw() {
  background(bg_color);
  synth.print();
  compass.print();
  drums.print();
  pose.print();
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
