class LocalClientServer extends Client {
    constructor(callback) {
        super();
        this.callback = callback
        this.server = new LocalServer((data) => { this.handleServerUpdate(data) })
        this.server.start()
    }
    
    handleServerUpdate(data) {
        this.callback(data)
    }
    
    clientUpdate(data) {
        this.server.handleClientUpdate(data)
    }
}