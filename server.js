const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); //to use socket.io, we need access to it directly, and thus .createServer 
const io = socketio(server); 

app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket =>{

    socket.emit("message", "Welcome to the chatroom"); //emit to single user connecting

    //when user connects
    socket.broadcast.emit("message", "A user have connected."); //emits to all except the user connecting

    //when user disconnects
    socket.on('disconnect', ()=>{
        io.emit("message", "A user had left the room.")
    })

    //io.emit(); // to all users
})
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("server running"));