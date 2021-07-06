const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMsg = require('./utils/message');
const {userJoin, getUser} = require('./utils/user');
const chatRoomName = "ChatRoom";

const app = express();
const server = http.createServer(app); //to use socket.io, we need access to it directly, and thus .createServer 
const io = socketio(server); 

app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket =>{
    socket.on("joinRoom", ({username, room})=>{

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

    socket.emit("message", formatMsg(chatRoomName, "Welcome to the Chatroom!")); //emit to single user connecting

    //when user connects
    //user .to(user.room) tp emit to a specific room
    socket.broadcast.to(user.room).emit("message", formatMsg(chatRoomName, `${user.username} has joined the chat.`)); //emits to all except the user connecting
    })

    //when user disconnects
    socket.on('disconnect', ()=>{
        io.emit("message", formatMsg(chatRoomName, "A user has left the room."))
    })

    //io.emit(); // to all users

    //listen for chat messages
    socket.on('chatMessage', (message)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message', formatMsg(user.username, message));
    })
})
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("server running"));