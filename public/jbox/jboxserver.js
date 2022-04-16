
if (typeof(module) !== 'undefined') { Game1 = require('./games/game1'); }
if (typeof(module) !== 'undefined') { Game2 = require('./games/game2'); }


class JboxServer {
    constructor() {
        this.cartridge = new Game2()
    }

    start() {
        setInterval(() => {
            this.update();
        }, 1000 / 30)
    }
    
    update() {
        //for (let i = 0 ; i < 1000000 ; i++) {
        //   let j = 1
        //}
        this.cartridge.update()
        
        let data = this.cartridge.getData()
        this.broadcastState(data)
    }
    
    broadcastState() {
        // not implemented by base
    }
    
    handleClientUpdate(data) {
        this.cartridge.processData(data)
    }
}

if (typeof(module) !== 'undefined') { module.exports = JboxServer; }
