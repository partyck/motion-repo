let bg_color;
let logger;
let synth;
let socket;
let compass;
let drums;
let isPlaying = false;
let isResetValues = false;
let distance = {alpha: 0, beta: 0, gamma: 0};


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
  
  // sockets
  socket = io();
  listenSockets();  
  
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

function listenSockets() {
  socket.on('connect', function() {
    console.log('Socket connected!');
  });
  
  socket.on('toggle_start', function(data) {
    tooglePlay();
    isResetValues = data.isPlaying;
  });
  
  socket.on('move', data => {
    toggleDistance(data)
    let newAngles = {};
    newAngles.alpha = edges(data.alpha + distance.alpha, 0, 360);
    newAngles.beta = edges(data.beta + distance.beta, -180, 180);
    newAngles.gamma = data.gamma;
    
    synth.updateAngles(newAngles);
  });
}

function toggleDistance(data) {
  if (!isResetValues) {
    return;
  }
  
  isResetValues = ! isResetValues;
  distance.alpha = data.alpha * -1;
  distance.beta = data.beta * -1;
  distance.gamma = data.gamma;
}

function edges(value, min, max) {
  if (value > max) {
    return min + (value - max);
  } else if (value < min) {
    return max - (value + max);
  }
  return value;
}