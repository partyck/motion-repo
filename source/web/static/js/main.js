let bg_color;
let logger;
let sound;
let socket;

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(0, 0, 0)
  logger = new MyTerminal()
  sound = new Synther()
  
  // socket
  socket = io()
  socket.on('connect', function() {
      socket.emit('my_event', {data: 'I\'m connected!'});
  });
  
  background(bg_color);
}

function draw() {
  background(bg_color);
  logger.print()
  sound.print()
}

function mousePressed() {
  sound.mousePressed()
}