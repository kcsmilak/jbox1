
let jbox = new Jbox(this);


function preload() { //p5
    jbox.preload();
}


function setup() { // p5
    canvas = createCanvas(windowWidth, windowHeight); // p5
    jbox.setup()
}

//function update() { // never called in p5
//    jbox.update()
//}

function draw() { // p5
    jbox.update()
    jbox.draw()
}

function mousePressed(event) { // p5
    jbox.mousePressed(event.x,event.y)
}
