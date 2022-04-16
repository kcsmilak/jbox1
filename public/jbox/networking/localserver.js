class LocalServer extends JboxServer {
    constructor(callback) {
        super()
        this.callback = callback;
        
        this.cartridge = new Game2()
        
    }

    broadcastState(data) {
        //this.callback(data);
    }
    
    handleClientUpdate(data) {
        console.log("hi")
        this.cartridge.processData(data)
    }
    
}