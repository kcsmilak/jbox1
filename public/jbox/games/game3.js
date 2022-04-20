if (typeof (module) !== 'undefined') { Cartridge = require('./cartridge'); }
if (typeof (module) !== 'undefined') { FpsMeterModel = require('../models/fpsmetermodel'); }
if (typeof (module) !== 'undefined') { ServerUpdateMeterModel = require('../models/serverupdatemetermodel'); }

if (typeof (module) !== 'undefined') { AnimatedCharacter = require('../../jgame/animated_character'); }


class Player {
    constructor(id) {
        this.id = id
        this.x = Math.floor(Math.random() * 300)
        this.y = Math.floor(Math.random() * 300)
    }

    update() {
        this.x = (this.x + 1) % 400
    }

    draw(g) {
        //console.log("hi")
        g.rect(this.x, this.y, 100)

    }

    toJSON() {
        return `\{"id": "${this.id}", "x": "${this.x}"\}`
    }
}

class Game3 extends Cartridge {
    constructor() {
        super()
        this.showCounters = true;
        this.fpsMeter = new FpsMeterModel();
        this.serverUpdateMeter = new ServerUpdateMeterModel()

        this.client = null

        this.players = []

    }

    addPlayer(id) {
        //console.log(`.adding player ${id}`)
        let player = new Player(id)
        this.players.push(player)
        return player;
    }

    removePlayer(id) {
        this.players = this.players.filter(player => { player.id != id })
    }

    preload() {
        //this.character.load();
    }

    setup() {
        if (typeof (io) !== 'undefined') {
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
        this.players.forEach(player => {
            player.update()
        })
    }

    draw(g) {
        this.fpsMeter.update(g);



        g.background(100)
        g.rect(this.x, 100, 100)

        this.players.forEach(player => {
            player.draw(g)
            //console.log("draw")
        })

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

    mousePressed(x, y) {
        console.log(x)
        //this.client.clientUpdate(x);
    }

    keyPressed(keyCode) {
        console.log('not implemented')

    }

    processData(data) {
        data = JSON.parse(data)
        //console.log(`processData: data:${data}`)
        this.players.forEach(player => {
            //console.log(`id:${player.id} x:${player.x}`)
        })        //this.x = data

        data.forEach(element => {
            element = JSON.parse(element)
            //console.log(`element: id:${element.id}`)

            let id = element.id
            let x = element.x
            
            let player = this.getPlayerById(id)
            if (player == null) {
                console.log(`adding player id:${id} data:${data} p:${this.players.length}`)
                player = this.addPlayer(id)
            } 
            //console.log(`id:${player.id} x:${player.x}->${x}`)
            player.x = x
        
        })



        this.serverUpdateMeter.update();
    }

    getData() {
        return JSON.stringify(this.players)
    }

    getPlayerById(id) {
        let player = null
        this.players.forEach(p => {
            //console.log(`compare [${p.id}] [${id}] v:${p.id.localeCompare(id)}`)
            if (p.id.localeCompare(id) == 0) {
                player = p
            }
        })
        return player
    }
}

if (typeof (module) !== 'undefined') { module.exports = Game3; }
