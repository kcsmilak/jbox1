if (typeof (module) !== 'undefined') { Cartridge = require('./cartridge'); }
if (typeof (module) !== 'undefined') { FpsMeterModel = require('../models/fpsmetermodel'); }
if (typeof (module) !== 'undefined') { ServerUpdateMeterModel = require('../models/serverupdatemetermodel'); }

class Game4Client {
    constructor() {
        this.showCounters = true;
        this.fpsMeter = new FpsMeterModel();
        this.serverUpdateMeter = new ServerUpdateMeterModel()
    }

    draw(g) {
        this.fpsMeter.update(g);



        g.background(100)


        if (this.showCounters) {
            g.push();
            g.translate(0, g.height - 100);
            g.scale(0.5, 0.5);
            this.fpsMeter.render(g, 0, 0);
            this.serverUpdateMeter.render(g, 200, 0);
            //this.objectMeter.render(g, 400, 0);
            g.pop();
        }
    }

    update() {
        console.log("client tick")
    }

    handleServerUpdate() {
        this.serverUpdateMeter.update();

    }
}

class Game4Server {
    constructor() {

    }

    update() {
        console.log("server tick")
    }
}

class Game4 extends Cartridge {
    constructor(type = 0) {
        super()
        if (type == 1) {
            this.part = new Game4Client()
        } else if (type == 2) {
            this.part = new Game4Server()
        }
    }


    preload() {
    }

    setup() {

    }

    processInput() {
        this.part.processInput()
    }

    update() {
        this.part.update()

    }

    draw(g) {
        this.part.draw(g)
    }

    mousePressed(x, y) {

    }

    keyPressed(keyCode) {
        console.log('not implemented')
    }

    processData(data) {
    }

    getData() {
        return JSON.stringify(this.players)
    }

}

if (typeof (module) !== 'undefined') { module.exports = Game4; }
