let bg_color;
let logger;
let sound;
let socket;
var isPermissionGranted = false;

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(200)
  logger = new MyTerminal()
  sound = new Synther()
  isPermissionGranted = (window.DeviceMotionEvent ? true : false);
  
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