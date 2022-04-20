
if (typeof(module) !== 'undefined') { Game1 = require('./games/game1'); }
if (typeof(module) !== 'undefined') { Game2 = require('./games/game2'); }
if (typeof(module) !== 'undefined') { Game3 = require('./games/game3'); }
if (typeof(module) !== 'undefined') { Game4 = require('./games/game4'); }


class JboxServer {
    constructor() {
        this.cartridge = new Game4(2)
    }

    start() {
        setInterval(() => {
            this.update();
        }, 1000 / 2)
    }
    
    update() {

        this.cartridge.update()
        
        let data = this.cartridge.getData()
        this.broadcastState(data)
    }
    
    broadcastState(data) {
        // not implemented by base
        console.log("not implemented")
    }
    
    handleUpdateFromClient(id, data) {
        this.cartridge.processData(id, data)
    }

    addClient(id) {
        console.log(`adding player: ${id}`)
        this.cartridge.addPlayer(id)
    }

    removeClient(id) {
        console.log(`removing player: ${id}`)
        this.cartridge.removePlayer(id)
    }
}

if (typeof(module) !== 'undefined') { module.exports = JboxServer; }
