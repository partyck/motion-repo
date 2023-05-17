const PRESICION = 0.7;
const maxSpeed = 10;
const maxForce = 0.9;

class BodyParticle {

    constructor() {
        this.possition = createVector(windowWidth/2, windowHeight/2);
        this.velocity = createVector();
        this.acceleration = createVector();
    }


    show() {
        noStroke();
        let a = round(this.velocity.mag() * 20)

        for (let index = 0; index <= compass.iteration; index++) {
            let r = index == 2 ? 255 : 0;
            let g = index == 1 ? 255 : 0;
            let b = index == 0 ? 255 : 0;

            this._radialGradient(
                this.possition.x, this.possition.y, index * 100,//Start pX, pY, start circle radius
                this.possition.x, this.possition.y, 100 + index * 100,//End pX, pY, End circle radius
                color(r, g, b, a), //Start color
                color(0, 0, 0, 0) //End color
            );
            ellipse(this.possition.x, this.possition.y, 200 + index * 200);
        }

    }


    update(newCoordinates) {
        if (newCoordinates.confidence < PRESICION) {
            return;
        }

        let x = map(map(newCoordinates.x, 0, pose.video.width, 1, 0), 0, 1, 0, width);
        let y = map(map(newCoordinates.y, 0, pose.video.height, 0, 1), 0, 1, 0, height);
        this._appyforce(createVector(x, y));
    }

    _appyforce(target) {
        let desired = p5.Vector.sub(target, this.possition);
        let distance = desired.mag();
        desired.normalize();
        
        if (distance < 100) {
            let mappedSpeed = map(distance, 0, 100, 0, maxSpeed);
            desired.mult(mappedSpeed);
        } else {
            desired.mult(maxSpeed);
        }
        
        let steeringForce = p5.Vector.sub(desired, this.velocity);
        steeringForce.limit(maxForce);
        
        this.acceleration.add(steeringForce);
        this.velocity.add(this.acceleration);
        this.velocity.limit(maxSpeed);
        this.possition.add(this.velocity);
        
        this.acceleration.mult(0);
    }

    _radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE){
        let gradient = drawingContext.createRadialGradient(
            sX, sY, sR, eX, eY, eR
        );
        gradient.addColorStop(0, colorS);
        gradient.addColorStop(1, colorE);

        drawingContext.fillStyle = gradient;
    }
}