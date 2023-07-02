// Circle class
class Circle {
    constructor(x, y, r, color, opacity, decayRate) {
        this.x = x;
        this.y = y;
        this.xEnd = x;
        this.yEnd = y;
        this.r = r;
        this.color = color;
        this.opacity = opacity;
        this.decayRate = decayRate;
        this.isSelected = true;
    }

    changeSelected(status) {
        this.isSelected = status;
    }

    changeColor(color) {
        this.color = color
    }

    changeOpacity(opacity) {
        this.opacity = opacity
    }

    changeDecayRate(decayRate) {
        this.decayRate = decayRate
    }

    changeRadius(r) {
        this.r = r
    }

    moveTo(x, y) {
        this.xEnd = x;
        this.yEnd = y;
    }

    getRadius() {
        return this.r
    }

    getPosition() {
        return [this.x, this.y]
    }

    display() {
        if (this.isSelected) {
            stroke(255)
        } else {
            stroke(0, 0);
        }
        if (this.x === this.xEnd && this.y === this.yEnd) {
            let c = color(this.color);
            fill(red(c), green(c), blue(c), this.opacity);
            ellipse(this.x, this.y, this.r, this.r);
        }
        else if (this.y > this.yEnd) {
            let c = color(this.color);
            fill(red(c), green(c), blue(c), this.opacity);
            arc(this.xEnd, this.yEnd, this.r, this.r, PI, 2*PI, PIE)
            for (let y = this.yEnd; y < this.y; ++y){
                const ration = 1 - (y - this.yEnd) / (this.y - this.yEnd);
                const rate = this.decayRate / 100
                fill(red(c), green(c), blue(c), this.opacity * pow(ration, rate));
                rect(this.xEnd-this.r/2, y, this.r, 1)
            }
        }
        else {
            let c = color(this.color);
            fill(red(c), green(c), blue(c), this.opacity);
            arc(this.xEnd, this.yEnd, this.r, this.r, 0, PI, PIE)
            for (let y = this.yEnd; y > this.y; --y){
                const ration = (y - this.y) / (this.yEnd - this.y);
                const rate = this.decayRate / 50
                fill(red(c), green(c), blue(c), this.opacity * pow(ration, rate));
                rect(this.xEnd-this.r/2, y, this.r, -1)
            }

        }

    }
}

// Information about the circle
let cx;
let cy;
let overCircle = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

var selectedCircle;
circle_list = [];

function setup() {

    // create a canvas that fills the window
    createCanvas(windowWidth, windowHeight);

    cx = width / 2.0;
    cy = height / 2.0;
    strokeWeight(2);
}



function draw() {

    background(options.Background);

    if (circle_list.length > 0) {
        // Change color
        selectedCircle.changeColor(options.CircleColor)

        // Change opacity
        selectedCircle.changeOpacity(options.Opacity)

        // Change radius
        selectedCircle.changeRadius(options.Radius)

        // Change decay rate
        selectedCircle.changeDecayRate(options.DecayRate)

        for (let i = 0; i < circle_list.length; i++) {
            if (!(selectedCircle == circle_list[i])) {
                circle_list[i].changeSelected(false);
            }
            circle_list[i].display();
        }
    }
}

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function doubleClicked() {
    let newCircle = new Circle(mouseX, mouseY, options.Radius, options.CircleColor, options.Opacity, options.DecayRate);
    selectedCircle = newCircle
    circle_list.push(newCircle);
}

function mouseClicked() {
    for (let i = 0; i < circle_list.length; i++) {
        if (pow(mouseX - circle_list[i].xEnd, 2) + pow(mouseY - circle_list[i].yEnd, 2) < pow(circle_list[i].r, 2)){
            selectedCircle = circle_list[i];
            circle_list[i].changeSelected(true);
        }
        else {
            circle_list[i].changeSelected(false);
        }
    }

}

function mouseDragged(){
    if (pow(mouseX - selectedCircle.xEnd, 2) + pow(mouseY - selectedCircle.yEnd, 2) < pow(selectedCircle.r, 2)
    ) {
        selectedCircle.moveTo(mouseX, mouseY);
    }
}
