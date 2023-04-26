let bg_color;
let sound;
let socket;
var isPermissionGranted = false;
let compass
let isPlaying = false;

let alpha = 0;
let beta = 0;
let gamma = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg_color = color(200)

  isPermissionGranted = (window.DeviceMotionEvent ? true : false);
  
  // socket
  socket = io()
  listenSockets()
}

function draw() {
  background(bg_color);
  if (isPermissionGranted && isPlaying) {
    listenMotion();
    sendMotion();
  }
}

function mousePressed() {
  console.log('send socket toggle start stop');
  isPlaying = !isPlaying;
  socket.emit('toggle_start', {isPlaying: isPlaying });
}

function listenMotion() {
  window.addEventListener('deviceorientation', ev => {
    alpha = Math.round(ev.alpha); // Z [0, 360]
    beta = Math.round(ev.beta);   // X [-180, 180]
    gamma = Math.round(ev.gamma); // Y [-90, 90]
  });
}

function sendMotion() {
  console.log('send socket acc values');
  socket.emit('motion', {
    alpha: alpha,
    beta: beta,
    gamma: gamma
  });
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

function listenSockets() {
  socket.on('connect', function() {
    console.log('Socket connected!');
  });
}