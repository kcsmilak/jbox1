

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

class Client {
    constructor() {
    }
    
    handleServerUpdate(data) {
        
    }
}

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
                this.handleServerUpdate(data);
            })
            
        this.callback = callback;
    }
    
    handleServerUpdate(data) {
        this.callback(data)
    }
    
    clientUpdate(data) {
        this.socket.emit("clientUpdate", data)
    }
}

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


class Game {
    constructor() {
        this.showCounters = true;
        this.fpsMeter = new FpsMeterModel();
        this.serverUpdateMeter = new ServerUpdateMeterModel()
        
        this.x = 0
        
        this.client = null
        
    }
    
    handleServerUpdate(data) {
        //console.log(`client: ${data}`)
        this.x = data
        this.serverUpdateMeter.update()
    }
    
    preload() {
        
    }
    
    setup() {
        
        if (typeof(io) !== 'undefined') {
            console.log("using remote")
            this.client = new RemoteClient((data) => this.handleServerUpdate(data))

            
        } else {
            console.log("using local")
            this.client = new LocalClientServer((data) => this.handleServerUpdate(data))

        }
    }
    
    handleInput() {
        
    }
    
    update() {
    }
    
    draw(g) {
        this.fpsMeter.update(g);

        g.background(100)
        g.rect(this.x,100,100)

        if (this.showCounters) {
            g.push();
            g.translate(0,g.height-100);
            g.scale(0.5,0.5);
            this.fpsMeter.render(g, 0, 0);
            this.serverUpdateMeter.render(g, 200, 0);
            //this.objectMeter.render(g, 400, 0);
            g.pop();
        }
        
    }
    
    mousePressed(x, y) {
        this.client.clientUpdate(x);
    }
}

class Jbox {
    constructor(canvas) {
        this.g = canvas
        this.game = new Game()

    }
    
    preload() {
        this.game.preload()
    }
    
    setup() {
        this.game.setup()
        this.g.frameRate(60)

    }
    
    handleInput() {
        this.game.handleInput()
    }
    
    update() {
        this.game.update()
    }
    
    draw() {
        this.game.draw(this.g)
    }
    
    mousePressed(x, y) {
        this.game.mousePressed(x, y);
    }
}

let jbox = new Jbox(this);


function preload() {

    jbox.preload();
}


function setup() {

    
    canvas = createCanvas(windowWidth, windowHeight);
    jbox.setup()
}

function update() {
    jbox.update()
}

function draw() {
    jbox.draw()
}

function mousePressed(event) {
    jbox.mousePressed(event.x,event.y)
}
