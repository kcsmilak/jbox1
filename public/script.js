









let jbox = new Jbox(this);


function preload() {

    jbox.preload();
}


function setup() {

    
    canvas = createCanvas(windowWidth, windowHeight);
    jbox.setup()
}

function update() {
    jbox.update()
}

function draw() {
    jbox.draw()
}

function mousePressed(event) {
    jbox.mousePressed(event.x,event.y)
}
