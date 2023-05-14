class MySocket {

    constructor() {
        this.socket = io();
        this.isResetValues = false;
        this.distance = {alpha: 0, beta: 0, gamma: 0};
        this.listenSockets();
    }


    listenSockets() {
        this.socket.on('connect', function() {
            console.log('Socket connected!');
        });
        
        this.socket.on('toggle_start', function(data) {
            tooglePlay();
            this.isResetValues = data.isPlaying;
        });
        
        this.socket.on('move', data => {
            this.toggleDistance(data)
            let newAngles = {};
            newAngles.alpha = this.edges(data.alpha + this.distance.alpha, 0, 360);
            newAngles.beta = this.edges(data.beta + this.distance.beta, -180, 180);
            newAngles.gamma = data.gamma;
            
            synth.updateAngles(newAngles);
        });
    }


    toggleDistance(data) {
        if (!this.isResetValues) {
            return;
        }
        
        this.isResetValues = ! this.isResetValues;
        this.distance.alpha = data.alpha * -1;
        this.distance.beta = data.beta * -1;
        this.distance.gamma = data.gamma;
    }


    edges(value, min, max) {
        if (value > max) {
            return min + (value - max);
        } else if (value < min) {
            return max - (value + max);
        }
        return value;
    }
}