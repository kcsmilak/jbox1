class Jbox {
    constructor(canvas) {
        this.g = canvas
        this.keyboard = new Keyboard()
        this.cartridge = new Studio(this.g)// Game5(1)

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
        this.cartridge.update()
    }

    draw() {
        this.cartridge.draw(this.g)
    }

    mousePressed(x, y) {
        this.cartridge.mousePressed(x, y);
    }

    loadGame() {
        this.cartridge = new Game5(1)
        this.preload()
    }

    loadStudio() {
        this.cartridge = new Studio()
        this.preload()
    }

    loadLoader() {
        this.cartridge = new Loader()
        this.preload()
    }

    keyPressed(keyCode) {

        console.log("handler")

        if (this.keyboard.k1) {
            console.log("loading game...")
            this.loadGame()
            return
        }

        if (this.keyboard.k2) {
            console.log("loading studio...")
            this.loadStudio()
            return
        }


        this.cartridge.keyPressed(keyCode)
    }
}