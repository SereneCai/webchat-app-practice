const socket = io();
const chatForm = document.getElementById('chat-form');
socket.on("message", (message) =>{
    console.log(message);
})

chatForm.addEventListener('submit', (event)=>{
    event.preventDefault(); //to stop the automatic submission to a file, the default behaviour of submit

    const message = event.target.elements.msg.value; //targets the input with id 'msg' and grab the value

    console.log(message);

})