const PRESICION = 0.7;
const maxSpeed = 10;
const maxForce = 0.9;

class BodyParticle {

    constructor() {
        this.oldPos = { 'x': windowWidth/2, 'y': windowHeight/2 };
        this.possition = createVector(this.oldPos.x, this.oldPos.y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.oldParticles = [[]];
    }


    show() {
        noStroke();
        let a = round(this.velocity.mag() * 30)

        this._showParticle(this.possition.x, this.possition.y, a);
        this.oldParticles.forEach(pastIteration => {
            let oldParticle = pastIteration[compass.counter];
            if (oldParticle) {
                this._showParticle(oldParticle.x, oldParticle.y, oldParticle.a);
            }
        });

        this._storeParticle(this.possition.x, this.possition.y, a)

        this._appyforce(createVector(this.oldPos.x, this.oldPos.y));
    }

    _showParticle(x, y, a) {
        if (! a > 0) {
            return;
        }
        
        let r = compass.iteration == 2 ? 255 : 0;
        let g = compass.iteration == 1 ? 255 : 0;
        let b = compass.iteration == 0 ? 255 : 0;
        
        this._radialGradient(
            x, y, 0,//Start pX, pY, start circle radius
            x, y, 400 * compass.getCounter01(),//End pX, pY, End circle radius
            color(r, g, b, a), //Start color
            color(0, 0, 0, 0) //End color
        );
        ellipse(x, y, 800 * compass.getCounter01());
    }

    
    _storeParticle(x, y, a) {
        if (this.oldParticles.length <= compass.iteration) {
            this.oldParticles.push([]);
        }
        if (this.oldParticles[compass.iteration].length <= compass.counter) {
            this.oldParticles[compass.iteration].push({ x, y, a});
        }
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