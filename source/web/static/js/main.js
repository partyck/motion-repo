let bg_color;
let logger;
let sound;
let socket;
let compass
let isPlaying = false;

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(200)

  compass = new Compass()
  logger = new MyTerminal()
  sound = new Synther(compass)
  
  // sockets
  socket = io();
  listenSockets();  
  
}

function draw() {
  background(bg_color);
  logger.print()
  sound.print()
  compass.print()
}

function tooglePlay() {
  if(isPlaying) {
    sound.toStop();
    compass.toStop();
  }
  else {
    sound.toPlay();
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
  });
  
  socket.on('move', data => {
    console.log(data.alpha);
    sound.alpha = data.alpha;
    sound.beta = data.beta;
    sound.gamma = data.gamma;
  });
}
