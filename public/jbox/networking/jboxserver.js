
if (typeof(module) !== 'undefined') { Game1 = require('../games/game1'); }
if (typeof(module) !== 'undefined') { Game2 = require('../games/game2'); }
if (typeof(module) !== 'undefined') { Game3 = require('../games/game3'); }
if (typeof(module) !== 'undefined') { Game4 = require('../games/game4'); }


class JboxServer {
    constructor() {
        this.cartridge = new Game4(2, this)
    }

    start() {
        setInterval(() => {
            this.update();
        }, 1000 / 30)
    }
    
    update() {

        this.cartridge.update()
        
        //let data = this.cartridge.getData()
        //this.broadcastState(data)
    }
    
    broadcastState(data) {
        // not implemented by base
        console.log("not implemented")
    }
    
    handleUpdateFromClient(input, id) {
        this.cartridge.processInput(input, id)
    }

    addClient(id) {
        this.cartridge.addClient(id)
    }

    removeClient(id) {
        this.cartridge.removeClient(id)
    }

    handleLineInput(line) {
        this.cartridge.handleLineInput(line)
    }
}

if (typeof(module) !== 'undefined') { module.exports = JboxServer; }
