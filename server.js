// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var http = require('http');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socketio = require('socket.io')
var SocketIOFile = require('socket.io-file');
var nodemailer = require("nodemailer");
app.use(express.static(__dirname + '\\views'));
app.use(express.static(__dirname + '\\views\\data'));

var Events            = require('./app/models/events');
var Notifications = require('./app/models/notifications');

var configDB = require('./config/database.js');
var MongoStore = require('connect-mongo')(session);

// configuration ===============================================================
var db = mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

var mongoStore = new MongoStore({
  mongooseConnection: db.connection,
});

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({
		secret: 'ilovescotchscotchyscotchscotch',
		clear_interval: 900,
		cookie: { maxAge: 2 * 60 * 60 * 1000 },
		store: mongoStore,
        resave: false
    })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// socketio ======================================================================
var server = http.Server(app)
const io = socketio(server)
io.use(function(socket, next) {
    // Use the 'cookie-parser' module to parse the request cookies
    cookieParser('ilovescotchscotchyscotchscotch')(socket.request, {}, function(err) {
        // Get the session id from the request cookies
        var sessionId = socket.request.signedCookies ? socket.request.signedCookies['connect.sid'] : undefined;
        if (!sessionId) return next(new Error('sessionId was not found in socket.request'), false);
        // Use the mongoStorage instance to get the Express session information
        mongoStore.get(sessionId, function(err, session) {
            //console.log('efe');
            if (err) return next(err, false);
            if (!session) return next(new Error('session was not found for ' + sessionId), false);
            // Set the Socket.io session information
            socket.request.session = session;
            //console.log(sessionId);
            //console.log(socket.request.user);
            //console.log(socket)
            // Use Passport to populate the user details
            passport.initialize()(socket.request, {}, function() {
                passport.session()(socket.request, {}, function() {
                    // This will prohibit non-authenticated users from connecting to your
                    // SocketIO server.
                    if (socket.request.user) {
                        next(null, true);
                    } else {
                        next(new Error('User is not authenticated'), false);
                    }
                });
            });
        });
    });
  });

let clientSockets = {}
io.on('connection', function(socket) {
    var uploader = new SocketIOFile(socket, {
        uploadDir: __dirname +'\\views\\data',                          // simple directory
        chunkSize: 10240,                           // default is 10240(1KB)
        transmissionDelay: 0,                       // delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
        overwrite: false,                           // overwrite file if exists, default is true.
        // rename: function(filename) {
        //  var split = filename.split('.');    // split filename by .(extension)
        //  var fname = split[0];   // filename without extension
        //  var ext = split[1];

        //  return `${fname}_${count++}.${ext}`;
        // }
    });
    uploader.on('start', (fileInfo) => {
        console.log('Start uploading');
        console.log(fileInfo);
    });
    uploader.on('stream', (fileInfo) => {
        console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
    });
    uploader.on('complete', (fileInfo) => {
        //console.log('Upload Complete.');
        //console.log(fileInfo);
        /*socket.on('pic', (msg)=>{
            console.log(msg)
        })*/
    });
    uploader.on('error', (err) => {
        console.log('Error!', err);
    });
    uploader.on('abort', (fileInfo) => {
        console.log('Aborted: ', fileInfo);
    });
    socket.emit('ClientID', 0)    
    socket.on('Save', msg => {
        console.log('user connected')
        console.log(msg)
        console.log('socket added')
        for (var key in clientSockets){
            clientSockets[key].emit("notify", "A new user just got online! Email " + msg['email'])
        }
        for (var key in clientSockets){
            console.log('people online are '+key)
        }
        clientSockets[msg['email']] = socket;
        notifications = []
        Notifications.find({'local.email' : msg['email']}, function(err,dat){
            console.log('Notifications for this person in the following events')
            myarr = new Promise ((resolve) => {
                p = 0
                dat.forEach(x => {
                    //console.log(x.local.event_id)
                    Events.findOne({'_id': x.local.event_id},function(err,d){
                        //console.log("the event is as follows")
                        //console.log(d.local)
                        if(d!== null){
                            notifications.push({
                                "name": d.local.Title,
                                "startdate": d.local.DATETIME.toISOString().split('T')[0],
                                "enddate": d.local.DATETIME.toISOString().split('T')[0],
                                "starttime": d.local.DATETIME.toISOString().split('T')[1].split(':')[0] + ':' + d.local.DATETIME.toISOString().split('T')[1].split(':')[1],
                                "color": "#99CCCC"  
                            })
                            
                        }
                        p = p + 1
                        console.log(notifications)
                        if(p === dat.length){
                            resolve(notifications)    
                        }
                    })
                })    
            }).then((dat) =>{
                socket.emit('calendarData',dat)  
                console.log('Initializing calendar data for user. Sending...')
                console.log(dat)
                  
            })
            
        })
    })
    socket.on('updateEvent', (y)=>{
        console.log('UPDATE THE DATA FOR EVENT')
        socket.emit('updateNotify', "Your update has been successfull!")
        console.log(y)
        id = y['id']
        console.log(id)
        delete y['id']

        Events.findOneAndUpdate({'_id' : id}, y,function (err,data){
            //console.log('I TRIED UPDATINGGGGGGGGGGGGGGG')
            console.log(y)
            if(err)
                throw err
            console.log(err)
            console.log(data)
        })
    })
    socket.on('disconnect', function() {
        console.log('user disconnected');
        for (var key in clientSockets){
            if(clientSockets[key] === socket){
                delete clientSockets[key]
                console.log(key + " disconnected")
            }
        }
        for (var key in clientSockets){
            console.log('people online are '+key)
        }
    });

    
});


// routes ======================================================================
require('./app/routes.js')(app, passport,path,clientSockets,nodemailer); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);
console.log(__dirname + '\\views')

