class LocalClientServer extends Client {
    constructor(callback) {
        super();
        this.callback = callback
        this.server = new LocalServer((data) => { this.handleServerUpdate(data) })
        this.server.start()
    }
    
    handleUpdateFromServer(data) {
        this.callback(data)
    }
    
    clientUpdate(data) {
        console.log(`update server ${data}`)
        this.server.handleUpdateFromClient(data)
    }
}