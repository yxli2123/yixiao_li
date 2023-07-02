// Circle class
class Circle {
    constructor(x, y, r, color, opacity) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.opacity = opacity;
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

    changeRadius(r) {
        this.r = r
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
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
        let c = color(this.color);
        fill(red(c), green(c), blue(c), this.opacity);
        ellipse(this.x, this.y, this.r, this.r);
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

    selectedCircle = new Circle(width / 2.0, height / 2.0, options.Radius, options.CircleColor, options.Opacity)
    selectedCircle.display()
    circle_list.push(selectedCircle)

}



function draw() {

    background(options.Background);


    // Change color
    selectedCircle.changeColor(options.CircleColor)

    // Change opacity
    selectedCircle.changeOpacity(options.Opacity)

    // Change radius
    selectedCircle.changeRadius(options.Radius)

    // Change position



    for (let i = 0; i < circle_list.length; i++) {
        if (!(selectedCircle == circle_list[i])) {
            circle_list[i].changeSelected(false);
        }
        circle_list[i].display();
    }

}

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function doubleClicked() {
    let newCircle = new Circle(mouseX, mouseY, options.Radius, options.CircleColor, options.Opacity);
    circle_list.push(newCircle);
}

function mouseClicked() {
    for (let i = 0; i < circle_list.length; i++) {
        if (pow(mouseX - circle_list[i].x, 2) + pow(mouseY - circle_list[i].y, 2) < pow(circle_list[i].r, 2)){
            selectedCircle = circle_list[i];
            circle_list[i].changeSelected(true);
        }
        else {
            circle_list[i].changeSelected(false);
        }
    }

}

function mouseDragged(){
    if (pow(mouseX - selectedCircle.x, 2) + pow(mouseY - selectedCircle.y, 2) < pow(selectedCircle.r, 2)) {
        selectedCircle.moveTo(mouseX, mouseY);
    }
}
