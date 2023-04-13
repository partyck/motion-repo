let bg_color;
let logger;
let sound;
let socket;
var isPermissionGranted = false;
let compass
let isPlaying = false;

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(200)

  compass = new Compass()
  logger = new MyTerminal()
  sound = new Synther(compass)
  isPermissionGranted = (window.DeviceMotionEvent ? true : false);
  if (isPermissionGranted) {
    select('#permission').hide();
  }
  
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
  compass.print()
}

function mousePressed() {
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

function reqPerm() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          console.log("motion event granted!");
          isPermissionGranted = true;
        }
      })
      .catch(console.error);
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == 'granted') {
          console.log("Orientation event granted!");
        }
      })
      .catch(console.error)
      select('#permission').hide();
  } else {
    alert( "No puedo acceder a los sensores de tu dispositivo :(" );
  }
}