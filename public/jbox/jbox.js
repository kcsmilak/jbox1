class Jbox {
    constructor(canvas) {
        this.g = canvas
        this.cartridge = new Game4(1)

    }
    
    preload() {
        this.cartridge.preload()
    }
    
    setup() {
        this.cartridge.setup()
        this.g.frameRate(60)

    }
    
    handleInput() {
        this.cartridge.handleInput()
    }
    
    update() {
        //this.cartridge.update()
    }
    
    draw() {
        this.cartridge.draw(this.g)
    }
    
    mousePressed(x, y) {
        this.cartridge.mousePressed(x, y);
    }
}