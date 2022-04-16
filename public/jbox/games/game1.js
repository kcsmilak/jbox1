if (typeof(module) !== 'undefined') { Cartridge = require('./cartridge'); }
    
class Game1 extends Cartridge {
    constructor() {
        super()
        this.x = 0
    }

    preload() {
       
    }

    setup() {
    }

    processInput() {
    }

    update() {
        this.x = (this.x + 1) % 400
    }

    draw(g) {
        g.background(0)
        g.rect(this.x, 100,100)
    }

    mouseClicked(x, y) {
        this.x = x

    }

    keyPressed(keyCode) {
        console.log('not implemented')
    }

    processData(data) {
        this.x = data
    }

    getData() {
        return this.x
    }
}

if (typeof(module) !== 'undefined') { module.exports = Game1; }
