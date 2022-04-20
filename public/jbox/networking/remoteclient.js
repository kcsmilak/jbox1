class RemoteClient extends Client {
    constructor(callback) {
        super();
        this.socket = io();
        

          this.socket.on("connect", () => {
            console.log(`event: connect | session id: ${this.socket.id}`);
          });
        
          this.socket.on("connect_error", (err) => {
            console.log(`event: connect_error | reason: ${err}`);
            if (err.description == 404) {
                console.log("not trying to reconnect")
                socket.disconnect(); // don't try to reconnect
            }
          });
        
            this.socket.on("disconnect", (reason) => {
                console.log(`event: disconnect | reason: ${reason}`);
            });
          
            this.socket.on("heartbeat", (data) => {
                this.handleUpdateFromServer(data);
            })
            
        this.callback = callback;
    }
    
    handleUpdateFromServer(data) {
        this.callback(data)
    }
    
    clientUpdate(data) {
        this.socket.emit("clientUpdate", data)
    }
}