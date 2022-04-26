if (typeof (module) !== 'undefined') { Cartridge = require('./cartridge'); }
if (typeof (module) !== 'undefined') { FpsMeterModel = require('../models/fpsmetermodel'); }
if (typeof (module) !== 'undefined') { ServerUpdateMeterModel = require('../models/serverupdatemetermodel'); }


class Game5Player {
    constructor(id) {
        this.id = id
        this.speed = 400 // units/s
        this.x = Math.floor(Math.random() * 200)
        this.y = Math.floor(Math.random() * 200)

        this.position_buffer = []
        this.last_processed_input = 0
    }

    draw(g) {
        g.rect(this.x, this.y, 32)
    }

    toJSON() {
        return `\{"id": "${this.id}", "x": "${this.x}", "y": "${this.y}", "last_processed_input" : "${this.last_processed_input}" \}`
    }

    applyInput(input) {
        this.x += input.x_press_time * this.speed
        this.y += input.y_press_time * this.speed
        //console.log(`apply player input: [${input.press_time}] x=[${this.x}]->[${update}]=>[${nx}]`)
        //this.x += (1) * update
        //this.x += 1
    }
}

class Game5Game {
    constructor() {
        this.players = []
        this.gameMap = new GameMap()
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
    addPlayer(id) {
        let player = new Game5Player(id);
        this.players.push(player)
        return player
    }

    removePlayer(id) {
        //this.players = this.players.filter(player => { player.id.localeCompare(id) != 0 })

        let index = 0
        for (let i = 0; i < this.players.length; i++)
            if (this.players[i].id.localeCompare(id) == 0) index = i
        this.players.splice(index, 1)

    }
}

class Game5Client extends Game5Game {
    constructor() {
        super()
        this.showCounters = true;
        this.fpsMeter = new FpsMeterModel();
        this.serverUpdateMeter = new ServerUpdateMeterModel()
        this.client = new RemoteClient((data) => this.processData(data))

        // Data needed for reconciliation.
        this.client_side_prediction = true;
        this.server_reconciliation = true;
        this.input_sequence_number = 0;
        this.pending_inputs = [];

        this.pending_updates = [];

        // Entity interpolation toggle.
        this.entity_interpolation = true;

        this.keyboard = new Keyboard()
        this.player = null

    }

    draw(g) {
        this.fpsMeter.update(g);




        g.background(100)





        g.push()
        if (this.player) g.translate(-this.player.x + g.width / 2, -this.player.y + g.height / 2)
        this.gameMap.draw()

        this.players.forEach(player => player.draw(g))
        g.pop()

        this.drawMousePosition(g, mouseX, mouseY) //p5
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

    drawMousePosition(g, x, y) {
        noCursor() //p5
        g.rect(x, y, 10, 10) //p5
    }

    update() {
        //.log("client tick")

        // process server messages
        this.processServerMessages2()

        // process inputs
        this.processInputs()

        // interpolate entities
        if (this.entity_interpolation) {
            this.interpolateEntities();
        }

        // render world
        // comes automatically after in draw(g) call
    }

    processData(data) {
        this.serverUpdateMeter.update();

        //console.log(`data from server: ${data}`)

        this.pending_updates.push(data)

    }

    processServerMessages2() {
        //console.log("process")
        while (true) {
            let data = this.pending_updates[0]
            this.pending_updates.splice(0, 1);
            if (!data) {
                //console.log("no more updates")
                break;
            }

            //console.log(`d:${data}`)
            data = JSON.parse(data)

            let playersUpdated = []

            data.forEach(element => {
                element = JSON.parse(element)
                //console.log(`element: id:${element.id}`)

                let id = element.id
                let x = +element.x
                let y = +element.y
                let last_processed_input = +element.last_processed_input

                playersUpdated.push(id)


                let player = this.getPlayerById(id)
                if (player == null) {
                    console.log(`adding player id:${id} data:${data} p:${this.players.length}`)
                    player = this.addPlayer(id)
                }
                //console.log(`id:${player.id} x:${player.x}->${x}`)


                if (id.localeCompare(this.client.id) == 0) {
                    this.player = player
                    player.x = x
                    player.y = y
                    player.last_processed_input = last_processed_input
                    if (this.server_reconciliation) {
                        // Server Reconciliation. Re-apply all the inputs not yet processed by
                        // the server.
                        var j = 0;
                        while (j < this.pending_inputs.length) {
                            var input = this.pending_inputs[j];
                            if (input.input_sequence_number <= player.last_processed_input) {
                                // Already processed. Its effect is already taken into account into the world update
                                // we just got, so we can drop it.
                                this.pending_inputs.splice(j, 1);
                            } else {
                                // Not processed by the server yet. Re-apply it.
                                //console.log(`using non-acknowledged input: i:${input.input_sequence_number} p:${player.last_processed_input}`)
                                player.applyInput(input);
                                j++;
                            }
                        }
                    }

                } else {


                    if (!this.entity_interpolation) {
                        player.x = x
                        player.y = y
                    } else {
                        // Add it to the position buffer.
                        var timestamp = +new Date();
                        player.position_buffer.push([timestamp, x, y]);
                    }
                }

            })

            let playersToRemove = []
            this.players.forEach(player => {
                if (!playersUpdated.includes(player.id)) {
                    playersToRemove.push(player.id)
                    console.log(`dropping player: ${player.id}`)
                }
            })

            playersToRemove.forEach(player => {
                this.removePlayer(player.id)
            })

        }
    }

    processServerMessages() {

    }


    processInputs() {
        // Compute delta time since last update.
        var now_ts = +new Date();
        var last_ts = this.last_ts || now_ts;
        var dt_sec = (now_ts - last_ts) / 1000.0;
        this.last_ts = now_ts;

        // Package player's input.

        let x_press_time = 0
        let y_press_time = 0

        if (this.keyboard.d) {
            x_press_time = dt_sec
        } else if (this.keyboard.a) {
            x_press_time = -dt_sec;
        }

        if (this.keyboard.w) {
            y_press_time = -dt_sec
        } else if (this.keyboard.s) {
            y_press_time = dt_sec;
        }

        if (!x_press_time && !y_press_time) return // no input this round

        let input = { x_press_time: x_press_time, y_press_time: y_press_time }

        // Send the input to the server.
        input.input_sequence_number = this.input_sequence_number++;
        //input.entity_id = this.entity_id;
        //this.server.network.send(this.lag, input);
        this.client.clientUpdate(input)

        // Do client-side prediction.
        if (this.client_side_prediction) {
            //console.log(this.client.id)
            let player = this.getPlayerById(this.client.id)
            if (!player) return // don't exist yet
            player.applyInput(input);
        }

        // Save this input for later reconciliation.
        this.pending_inputs.push(input);
    }

    mousePressed(x, y) {
        //this.client.clientUpdate(x)
    }


    interpolateEntities() {
        // Compute render timestamp.
        var now = +new Date();
        var render_timestamp = now - (1000.0 / 60)//server.update_rate);

        for (var i in this.players) {
            var player = this.players[i];

            // No point in interpolating this client's entity.
            //if (player.entity_id == this.entity_id) {
            //    continue;
            //}

            // Find the two authoritative positions surrounding the rendering timestamp.
            var buffer = player.position_buffer;

            // Drop older positions.
            while (buffer.length >= 2 && buffer[1][0] <= render_timestamp) {
                buffer.shift();
            }

            // Interpolate between the two surrounding authoritative positions.
            if (buffer.length >= 2 && buffer[0][0] <= render_timestamp && render_timestamp <= buffer[1][0]) {
                var y0 = buffer[0][2];
                var y1 = buffer[1][2];
                var x0 = buffer[0][1];
                var x1 = buffer[1][1];
                var t0 = buffer[0][0];
                var t1 = buffer[1][0];

                player.y = y0 + (y1 - y0) * (render_timestamp - t0) / (t1 - t0);
                player.x = x0 + (x1 - x0) * (render_timestamp - t0) / (t1 - t0);
            }
        }
    }
}

class Game5Server extends Game5Game {
    constructor(server) {
        super()
        this.server = server

        this.players = []

        this.inputs = []

        this.last_processed_input = []
    }

    update() {
        //console.log("server tick")

        // processInputs
        this.processInputs()

        // update world


        // broadcastState
        /*
        let state = {}
        players.forEach(player => {
            state.push({
                id: player.id,
                
            })
        })
        */

        let state = JSON.stringify(this.players)
        this.server.broadcastState(state)

        // renderWorld

    }



    addClient(id) {
        this.addPlayer(id)
    }

    removeClient(id) {
        this.removePlayer(id)
    }

    processInput(data, id) {
        var now = +new Date();
        data.id = id
        this.inputs.push({ recv_ts: now, data: data })
    }

    receiveInput() {
        var now = +new Date();
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            if (input.recv_ts <= now) {
                this.inputs.splice(i, 1);
                return input.data;
            }
        }
    }
    processInputs() {
        // Process all pending messages from clients.
        while (true) {
            var data = this.receiveInput();
            if (!data) {
                break;
            }


            // Update the state of the entity, based on its input.
            // We just ignore inputs that don't look valid; this is what prevents clients from cheating.
            if (1 || this.validateInput(data)) {
                //console.log(`process input: id:${data.id} data:${data.press_time} seq:${data.input_sequence_number}`)
                var id = data.id;
                let player = this.getPlayerById(id)
                if (!player) continue // player must have disconnected
                player.applyInput(data);
                player.last_processed_input = data.input_sequence_number;
                //console.log(player.last_processed_input)
            }

        }


    }

    handleLineInput(line) {
        switch (line.trim()) {
            case 'help':
                console.log('players | quit');
                break;
            case 'hello':
                console.log('world!');
                break;
            case 'game':
                console.log(game);
                break;
            case 'players':
                console.log(this.players);
                break;
            case 'quit':
                console.log('Have a great day!');
                process.exit(0);
                break;
            default:
                break;
        }
    }
}

class Game5 extends Cartridge {
    constructor(type = 0, server) {
        super()
        if (type == 1) {
            this.part = new Game5Client()
        } else if (type == 2) {
            this.part = new Game5Server(server)
        }
    }


    preload() {

    }

    setup() {
        this.part.gameMap.loadGameMap()

    }

    processInput(input, id) {
        this.part.processInput(input, id)
    }

    update() {
        this.part.update()

    }

    draw(g) {
        this.part.draw(g)
    }

    mousePressed(x, y) {
        this.part.mousePressed(x, y)
    }

    keyPressed(keyCode) {
        console.log('not implemented')
    }

    processData(data) {
        this.part.processData(data)
    }

    getData() {
        return JSON.stringify(this.players)
    }

    addClient(id) {
        this.part.addClient(id)
    }

    removeClient(id) {
        this.part.removeClient(id)
    }

    handleLineInput(line) {
        this.part.handleLineInput(line)
    }

}

if (typeof (module) !== 'undefined') { module.exports = Game5; }
