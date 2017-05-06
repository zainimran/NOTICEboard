const socket = io()

socket.on('ClientID', (id)=>{
	msg = $('.profile_info').text().split('\n')
	msg = msg[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
	socket.emit('Save',{'email':msg, 'id':id})
})

socket.on("notify", (msg)=>{
	console.log(msg)
})