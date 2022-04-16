if (typeof(module) !== 'undefined') { Cartridge = require('./cartridge'); }
if (typeof(module) !== 'undefined') { FpsMeterModel = require('../models/fpsmetermodel'); }
if (typeof(module) !== 'undefined') { ServerUpdateMeterModel = require('../models/serverupdatemetermodel'); }

class Game2 extends Cartridge {
    constructor() {
        super()
        this.showCounters = true;
        this.fpsMeter = new FpsMeterModel();
        this.serverUpdateMeter = new ServerUpdateMeterModel()
        
        this.x = 0
        
        this.client = null
    }

    preload() {
       
    }

    setup() {
        if (typeof(io) !== 'undefined') {
            console.log("using remote")
            this.client = new RemoteClient((data) => this.processData(data))

            
        } else {
            console.log("using local")
            this.client = new LocalClientServer((data) => this.processData(data))

        }
    }

    processInput() {
    }

    update() {
        this.x = (this.x + 1) % 400
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
        console.log(x)
        this.client.clientUpdate(x);
    }

    keyPressed(keyCode) {
        console.log('not implemented')

    }

    processData(data) {
        console.log(`processData: ${data}`)
        this.x = data
        this.serverUpdateMeter.update();
    }
    
    getData() {
        return this.x
    }
}

if (typeof(module) !== 'undefined') { module.exports = Game2; }
