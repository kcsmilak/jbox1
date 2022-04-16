class Cartridge {
    constructor() {
    }

    preload() {
        console.log('preload not implemented')
    }

    setup() {
        console.log('setup not implemented')
    }

    processInput() {
        console.log('processInput not implemented')
    }

    update() {
        console.log('update not implemented')
    }

    draw(g) {
        console.log('draw not implemented')
    }

    mouseClicked(x, y) {
        console.log('mouseClicked not implemented')

    }

    windowResized() {
        console.log('windowResized not implemtned')
    }
    
    keyPressed(keyCode) {
        console.log('keyPressed not implemented')

    }

    processData(data) {
        
    }

    getData() {
        return null
    }
}

if (typeof(module) !== 'undefined') { module.exports = Cartridge; }
