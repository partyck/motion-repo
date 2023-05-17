class PoseCapturer {

    constructor() {
        this.particles = [
            new BodyParticle(),
            new BodyParticle(),
            new BodyParticle(),
            new BodyParticle(),
            new BodyParticle()];
        
        this.video = createCapture(VIDEO);
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, () => {
            console.log('model ready');
        });
        this.poseNet.on('pose', _gotPoses);
        console.log(`video width : ${this.video.width}; height : ${this.video.height}`); //
    }

    show() {
        push();
        scale(-1, 1);
        let xS =  -1 * width;
        let xE = width;
        // image(this.video, xS, 0, xE, height);
        // image(this.video, xS, 0, this.video.width, this.video.height);
        pop();

        this.particles.forEach((particle) => {
            particle.show();
        });
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
}


function _gotPoses(poses) {
    if (poses.length < 1) {
        return;
    }
    
    // console.log(poses[0].pose);
    pose.particles[0].update(poses[0].pose.nose)
    pose.particles[1].update(poses[0].pose.leftWrist)
    pose.particles[2].update(poses[0].pose.rightWrist)
    pose.particles[3].update(poses[0].pose.leftAnkle)
    pose.particles[4].update(poses[0].pose.rightAnkle)
}
