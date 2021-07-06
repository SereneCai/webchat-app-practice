const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMsg = document.querySelector('.chat-messages');

//get username and room from url
const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

//join room
socket.emit('joinRoom', {username, room}); //send to server

//message from server
socket.on("message", (message) =>{
    console.log(message);
    outputMsg(message);

    //scroll to message
    chatMsg.scrollTop = chatMsg.scrollHeight;

})

chatForm.addEventListener('submit', (event)=>{
    event.preventDefault(); //to stop the automatic submission to a file, the default behaviour of submit

    const message = event.target.elements.msg.value; //targets the input with id 'msg' and grab the value

    socket.emit('chatMessage', message); //send to server

    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();

})

outputMsg= (message)=>{
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta"> ${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`

    document.querySelector('.chat-messages').appendChild(div);

}