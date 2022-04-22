// Setup server

const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const NodeServer = require('../public/jbox/networking/nodeserver')

const port = process.env.port || 8080;

console.log("--------------------------------------------");


let jboxServer = new NodeServer(io);
jboxServer.start();

// Setup serving for Web Client HTML/JS
app.use(express.static("public"));

// Begin Listening
server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

rl.prompt();

rl.on('line', (line) => {
    jboxServer.handleLineInput(line)

    rl.prompt();
}).on('close', () => {

});

