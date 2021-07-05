const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMsg = require('./utils/message');
const chatRoomName = "ChatRoom";

const app = express();
const server = http.createServer(app); //to use socket.io, we need access to it directly, and thus .createServer 
const io = socketio(server); 

app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket =>{

    socket.emit("message", formatMsg(chatRoomName, "Welcome to the Chatroom!")); //emit to single user connecting

    //when user connects
    socket.broadcast.emit("message", formatMsg(chatRoomName, "A user connected")); //emits to all except the user connecting

    //when user disconnects
    socket.on('disconnect', ()=>{
        io.emit("message", formatMsg(chatRoomName, "A user has left the room."))
    })

    //io.emit(); // to all users

    //listen for chat messages
    socket.on('chatMessage', (message)=>{
        io.emit('message', formatMsg('USER', message));
    })
})
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("server running"));