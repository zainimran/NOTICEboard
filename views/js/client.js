const socket = io()

socket.emit('chat message', "hello from the other side")
