let bg_color;
let logger;
let sound;
let socket;
let mic

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(0, 0, 0)
  logger = new MyTerminal()
  sound = new Synther()

  // mic
  mic = new p5.AudioIn();
  mic.start();
  
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
  
  
  let vol = mic.getLevel();
  let w = map(vol, 0, 1, 0, width);
  logger.addText(w);

  noStroke();
  fill(0, 0, 250);
  ellipse(width / 2, height / 2, w + 20 , w + 20);
}

function mousePressed() {
  sound.mousePressed()
}