const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); //to use socket.io, we need access to it directly, and thus .createServer 

app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("server running"));