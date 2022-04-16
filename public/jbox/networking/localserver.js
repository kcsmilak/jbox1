class LocalServer extends JboxServer {
    constructor(callback) {
        super()
        this.callback = callback;
    }

    broadcastState(data) {
        this.callback(data);
    }
    
    handleClientUpdate(data) {
        super.handleClientUpdate(data)
    }
    
}