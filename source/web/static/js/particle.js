const PRESICION = 0.7;
const maxSpeed = 10;
const maxForce = 0.9;

class BodyParticle {

    constructor() {
        this.oldPos = { 'x': windowWidth/2, 'y': windowHeight/2 };
        this.possition = createVector(this.oldPos.x, this.oldPos.y);
        this.velocity = createVector();
        this.acceleration = createVector();
    }


    show() {
        noStroke();
        let a = round(this.velocity.mag() * 30)

        for (let i = 0; i <= compass.iteration; i++) {
            let r = i == 2 ? 255 : 0;
            let g = i == 1 ? 255 : 0;
            let b = i == 0 ? 255 : 0;

            this._radialGradient(
                this.possition.x, this.possition.y, i * 100,//Start pX, pY, start circle radius
                this.possition.x, this.possition.y, 200 + i * 100,//End pX, pY, End circle radius
                color(r, g, b, a), //Start color
                color(0, 0, 0, 0) //End color
            );
            ellipse(this.possition.x, this.possition.y, 300 + i * 200);
        }
        this._appyforce(createVector(this.oldPos.x, this.oldPos.y));
    }


    update(newCoordinates) {
        if (newCoordinates.confidence < PRESICION) {
            return;
        }

        // camera mirrored
        // let x = map(map(newCoordinates.x, 0, pose.video.width, 1, 0), 0, 1, 0, width);
        
        // camera unmirrored
        let x = map(map(newCoordinates.x, 0, pose.video.width, 0, 1), 0, 1, 0, width);
        
        let y = map(map(newCoordinates.y, 0, pose.video.height, 0, 1), 0, 1, 0, height);
        this.oldPos = { 'x': x, 'y': y };
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