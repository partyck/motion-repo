let PRESICION = 0.7;

class PoseCapturer {

    constructor() {
        this.video = createCapture(this._getContinuityCamera());
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, () => {
            console.log('model ready');
        });
        this.poseNet.on('pose', _gotPoses);
        this.leftWrist = {'x' : 0, 'y' : 0};
        this.wd =this.video.width;
    }

    print() {
        push();
        scale(-1, 1);
        image(this.video, -1 * width, 0, width, height);
        pop();
    }

    _getContinuityCamera() {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                console.log('input devices :');
                devices.forEach((device) => {
                    console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
                    if (device.kind.includes('videoinput') && device.label.includes('iPhone')) {
                        return {
                            audio: false,
                            video: {
                              deviceId: device.deviceId
                            }
                          };
                    }
                });
                return VIDEO;
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            });
    }

    updateLeftWrist(leftWrist) {
        console.log('leftWrist');
        this.leftWrist.x = map(leftWrist.x, 0, this.video.width, width, 0);
        this.leftWrist.y = map(leftWrist.y, 0, this.video.width, 0, width);
        
        fill(0, 0, 255);
        ellipse(this.leftWrist.x, this.leftWrist.y, 50);
    }
}


function _gotPoses(poses) {
    if (poses.length < 1) {
        return;
    }
    
    let leftWrist = poses[0].pose.leftWrist;
    if (leftWrist.confidence > PRESICION) {
        pose.updateLeftWrist(leftWrist);
    }
}
