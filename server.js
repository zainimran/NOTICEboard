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
app.use(express.static(__dirname + '\\views'));

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
		store: mongoStore
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
            console.log('efe');
            if (err) return next(err, false);
            if (!session) return next(new Error('session was not found for ' + sessionId), false);

            // Set the Socket.io session information
            socket.request.session = session;
            console.log(sessionId);
            console.log(socket.request.user);
            console.log(socket)

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

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        console.log('a use connected');
        var name = "efe";
        console.log(msg)
        /*chatdb.saveMsg({
            name: name,
            msg: msg
        }, function(err) {
            if (err) throw err;
            io.emit('chat message', msg);
        });*/
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});


// routes ======================================================================
require('./app/routes.js')(app, passport,path); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);
console.log(__dirname + '\\views')