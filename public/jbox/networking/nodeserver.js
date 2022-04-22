if (typeof (module) !== 'undefined') { JboxServer = require('./jboxserver'); }

class NodeServer extends JboxServer {
    constructor(io) {
        super();
        this.io = io;
    }

    start() {
        super.start()


        // Define Bindings for New Connections
        this.io.sockets.on("connection", socket => {
            console.log(`connected: ${socket.id}`);

            super.addClient(socket.id)

            socket.emit('login', socket.id);

            socket.on('disconnect', () => {
                console.log(`disconnect: ${socket.id}`);
                this.io.sockets.emit('disconnect', socket.id);
                super.removeClient(socket.id);
            });

            socket.on('setKey', (data) => {
                console.log(data);
                //game.recordInput(data.id, data.keyCode, data.value);
            });

            socket.on('heartbeat', (data) => {
                //console.log(data);
                //let player = game.getPlayerById(data.id);
                //if (null != player) {
                //player.heartbeatTime = new Date(data.time);
                //}
            });

            socket.on('login', (data) => {
                console.log(`login: ${data.name}`);

                //if (null == game.getPlayerById(data.name)) {
                //    let player = game.addPlayer(data.name)
                //    player.tank.color = data.color;
                //}

            });

            socket.on('clientUpdate', (data) => {
                //console.log(`clientUpdate: ${socket.id} ${data}`);
                super.handleUpdateFromClient(data, socket.id)
            });

        });

    }

    broadcastState(data) {
        //console.log(data)
        this.io.emit('heartbeat', data)
    }

}

if (typeof (module) !== 'undefined') { module.exports = NodeServer; }
