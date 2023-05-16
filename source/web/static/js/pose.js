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
    }

    print() {
        push();
        scale(-1, 1);
        // image(this.video, -1 * width, 0, width, height);
        pop();

        fill(0, 0, 255);
        ellipse(this.leftWrist.x, this.leftWrist.y, 50);
    }

    _getContinuityCamera() {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                console.log('input devices :');
                devices.forEach((device) => {
                    console.log(`${device.kind}: ${device.label}`);
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

    updateLeftWrist(x, y) {
        let circleX = map(x, 0, 1, 0, width);
        let circleY = map(y, 0, 1, 0, height);
        
        this.leftWrist.x = circleX;
        this.leftWrist.y = circleY;
        
        fill(0, 0, 255);
        ellipse(circleX, circleY, 50);
    }
}


function _gotPoses(poses) {
    if (poses.length < 1) {
        return;
    }

    let leftWrist = poses[0].pose.leftWrist;
    if (leftWrist.confidence > PRESICION) {
        console.log('leftWrist');

        let x = map(leftWrist.x, 0, pose.video.width, 1, 0)
        let y = map(leftWrist.y, 0, pose.video.height, 0, 1)

        pose.updateLeftWrist(x, y);
    }
}
