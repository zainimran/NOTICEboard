const socket = io()
let src = ""
let email = "" 
tmp = $('.profile_info').text().split('\n')
email = tmp[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
socket.on('ClientID', (id)=>{
	msg = $('.profile_info').text().split('\n')
	msg = msg[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
	socket.emit('Save',{'email':msg, 'id':id})
})

socket.on("notify", (msg)=>{
	console.log(msg)
})

socket.on("notify1", (msg)=>{
	console.log(msg)
})

var uploader = new SocketIOFileClient(socket);
var form = document.getElementById('eventform');
var form2 = document.getElementById('lnfform')
uploader.on('ready', function() {
	console.log('SocketIOFile ready to go!');
});
uploader.on('start', function(fileInfo) {
	console.log('Start uploading', fileInfo);
});
uploader.on('stream', function(fileInfo) {
	console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
});
uploader.on('complete', function(fileInfo) {
	console.log('Upload Complete', fileInfo);
	console.log(src)
	if (src === 'eventform') {
		form.submit()
	}
	else {
		form2.submit()
	}
	src = ""

	//socket.emit('pic',"Pic delivered with success to "+email)
});
uploader.on('error', function(err) {
	console.log('Error!', err);
});
uploader.on('abort', function(fileInfo) {
	console.log('Aborted: ', fileInfo);
});

form.onsubmit = function(ev) {
	ev.preventDefault();
	// Send File Element to upload
	var fileEl = document.getElementById('fileevent');
	console.log("here")
	console.log(fileEl.form.id)
	src = fileEl.form.id
	var uploadIds = uploader.upload(fileEl.files);
	return true
};

form2.onsubmit = function(ev) {
	ev.preventDefault();
	// Send File Element to upload
	var fileEl = document.getElementById('fileevent1');
	console.log("here")
	console.log(fileEl.form.id)
	src = fileEl.form.id
	var uploadIds = uploader.upload(fileEl.files);
	return true
};


socket.on('updateNotify',(msg)=>{
	console.log(msg)
	form3.submit()
})