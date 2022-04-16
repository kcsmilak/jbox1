class JboxServer {
    constructor() {
        this.x = 0
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
        this.x += 4
        if (this.x > 400) this.x = 0
        
        let data = this.x
        this.broadcastState(data)
    }
    
    broadcastState() {
        // not implemented by base
    }
    
    handleClientUpdate(data) {
        this.x = data
    }
}

if (typeof(module) !== 'undefined') { module.exports = JboxServer; }
