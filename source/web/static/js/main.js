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
    createCanvas(windowWidth, windowHeight);
    bg_color = color(0);

    compass = new Compass();
    synth = new Synther(compass);
    mySocket = new MySocket();
}

function draw() {
    background(bg_color);
    synth.show();
    compass.show();
    drums.show();
    pose.show();
}

function tooglePlay() {
    if (isPlaying) {
        synth.toStop();
        compass.toStop();
    }
    else {
        synth.toPlay();
        compass.toPlay();
    }

    isPlaying = !isPlaying;
}
