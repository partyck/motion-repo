class PoseCapturer {

    constructor() {
        this.particles = [
            new BodyParticle(),
            new BodyParticle(),
            new BodyParticle(),
            new BodyParticle(),
            new BodyParticle()];
        
        this._getContinuityCamera();
    }

    show() {
        if (! this.video) {
            return;
        }

        let h = width * this.video.height / this.video.width;
        let h0 = (h - height ) / 2 * -1;
        
        // camera mirrored
        push();
        scale(-1, 1);
        // image(this.video, -1 * width, h0, width, h);
        pop();

        // camera unmirrored
        image(this.video, 0, h0, width, h);

        this.particles.forEach((particle) => {
            particle.show();
        });
    }

    async _getContinuityCamera() {
        await navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                console.log('input devices :');
                let videoConfig = VIDEO;
                devices.some((device) => {
                    console.log(`${device.kind}: ${device.label}`);
                    if (device.kind.includes('videoinput') && device.label.includes('iPhone')) {
                        console.log(`${device.label} found!`);
                        videoConfig = {
                            audio: false,
                            video: {
                                deviceId: device.deviceId
                            }
                        };
                        return true;
                    }
                });
                _initVideo(videoConfig);
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            });
    }
}

function _initVideo(vid) {
    pose.video = createCapture(vid, (stream) => {
        let poseNet = ml5.poseNet(pose.video, () => {
            console.log('model ready');
        });
        poseNet.on('pose', _gotPoses);
    });
    pose.video.hide();
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
