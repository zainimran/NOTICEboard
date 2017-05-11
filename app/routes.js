// app/routes.js
var Events            = require('../app/models/events');
var Books             = require('../app/models/books');
var Courses             = require('../app/models/courses');
var LnF             = require('../app/models/lostandfound');
var Notifications = require('../app/models/notifications');
module.exports = function(app, passport,path,clientSockets,nodemailer) {
	
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "noticeboardlums@gmail.com",
	        pass: "Software2017"
	    }
	});
	var rand,mailOptions,host,link;
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		//res.render('index.ejs'); // load the index.ejs file
		res.render(path.join(path.dirname(__dirname) + '/views/landingpage.ejs'),{ message1: req.flash('loginMessage'),message2: req.flash('signupMessage') });
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	/*app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});*/
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render(path.join(path.dirname(__dirname) + '/views/landingpage.ejs'),{ message1: req.flash('loginMessage'),message2: req.flash('signupMessage') });
		//res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/mainpage', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/verification', function(req, res) {
		console.log(req)
		rand=Math.floor((Math.random() * 100) + 54);
		host=req.get('host');
		link="http://"+req.get('host')+"/verify?id="+rand;
		mailOptions={
			to : req.user.local.email,
			subject : "Please confirm your Email account",
			html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
		}
		console.log(mailOptions);
		smtpTransport.sendMail(mailOptions, function(error, response){
		   	 if(error){
		        	console.log(error);
				res.end("error");
			 }else{
		        	console.log("Message sent: " + response.message);
				res.end("A verification email has been sent to this account. Please click on the link in the email to finish signup");
		    }
		});
	});

	app.get('/verify',function(req,res){
		console.log(req.protocol+":/"+req.get('host'));
		if((req.protocol+"://"+req.get('host'))==("http://"+host))
		{
			console.log("Domain is matched. Information is from Authentic email");
			if(req.query.id==rand)
			{
				console.log("email is verified");
				res.redirect('/mainpage')
				//res.render(path.join(path.dirname(__dirname) + '/views/landingpage.ejs'),{ message1: req.flash('loginMessage'),message2: req.flash('signupMessage') });
			}
			else
			{
				console.log("email is not verified");
				res.end("<h1>Bad Request</h1>");
			}
		}
		else
		{
			res.end("<h1>Request is from unknown source");
		}
	});
	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/verification', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.post('/edit',isLoggedIn,function(req,res){
		res.redirect('/mainpage')
	})
	app.post('/deleteEvent',isLoggedIn,function(req,res){
		res.redirect('/mainpage')
		console.log('DELETING EVENTTTTTTTTTTTTTTT')
		console.log(req.body.id)
		Events.remove({'_id' : req.body.id},function(err){
			console.log(err)
		}).exec()
		

	})
	app.get('/mainpage', isLoggedIn, function(req, res) {
		//console.log('trying to redirect')
		Events.find({},function(err,data){
			//console.log(data)
			var arr = [];
			var k = 1;
			emailID = "";
			for(j = data.length-1; j>=data.length-6; j--){
				x = data[j]
				y = {}
				if(j>=0){
					y['Date'] = x.local.DATETIME.toISOString().split('T')[0]
					y['Time'] = x.local.DATETIME.toISOString().split('T')[1].split(':')[0] + ':' + x.local.DATETIME.toISOString().split('T')[1].split(':')[1]
					if (parseInt(x.local.DATETIME.toISOString().split('T')[1].split(':')[0]) >=12){
						y['Time'] = y['Time']+ "PM"
					}
					else{
						y['Time'] = y['Time']+ "AM"
					}
					y['Description'] = x.local.Description
					var tmp = x.local.Description.split(' ')
					var bla = "";
					i = 0;
					tmp.forEach(p => {
						if(i < 9){
							bla = bla + p + " ";
						}
						else if(i == 10){
							bla = bla + p;
						}
						i = i + 1
					})
					y['parsed'] = bla
					//console.log(bla)
					y['title'] = x.local.Title
					y['location'] = x.local.LOCATION
					y['img'] = x.local.image
					y['email'] = x.local.email
					y['id'] = "eventpost event"+k.toString()
					y['event_id'] = x._id
					//console.log(y)
					arr.push(y)
					//console.log(y)
					//console.log("THIS IS HERE")
					k = k + 1
					emailID = x.local.email
				}	
			}
			//console.log(arr)
			//console.log("PUSHED IN FOR TEMPLATING")
			var arr2 = [];
			k = 1
			LnF.find({},function(err,data){
				for(j = data.length-1; j>=data.length-6; j--){
					x = data[j]
					y = {}
					if(j>=0){
						y['Description'] = x.local.Description
						y['LostORFound'] = x.local.LostORFound
						y['img'] = x.local.image
						y['owner'] = x.local.email
						y['LostItem'] = x.local.LostItem
						y['id'] = 'lostnfound'+k.toString()
						//console.log(y['id'], 'IWASHERERRRRRRRRRRR')
						arr2.push(y)
					}
					k = k +	1
					if( k === 3){
						k = 1;
					}
				}
				/*console.log('EVENT DATA')
				console.log(arr)
				console.log('LNF DATA')
				console.log(arr2)*/
				var arr3 = [];
				Courses.find({},function(err,data){
					for(j = data.length-1; j>=data.length-6; j--){
						x = data[j]
						y = {}
						if(j>=0){
							y['owner'] = x.local.email
							y['CourseOffered'] = x.local.CourseOffered
							y['TimingsOffered'] = x.local.TimingsOffered
							y['InstructorOffered'] = x.local.InstructorOffered
							y['CourseRequired'] = x.local.CourseRequired
							y['TimingsRequired'] = x.local.TimingsRequired
							y['InstructorRequired'] = x.local.InstructorRequired
							arr3.push(y)
						}
					}
					var arr4 = [];
					Books.find({},function(err,data){
						for(j = data.length-1; j>=data.length-6; j--){
							x = data[j]
							y = {}
							if(j>=0){
								y['owner'] = x.local.email
								y['BookOffered'] = x.local.BookOffered
								y['BookOffAuthor'] = x.local.BookOffAuthor
								y['BookRequired'] = x.local.BookRequired
								y['BookReqAuthor'] = x.local.BookReqAuthor
								y['ContactNumber'] = x.local.ContactNumber
								arr4.push(y)
							}
							k = k +	1
							if( k === 3){
								k = 1;
							}
						}
						//console.log("THIS IS ARRAY4")
						//console.log(arr4)
						res.render('mainpage.ejs', {
							user : req.user, // get the user out of session and pass to template
							Event: arr,
							LnF : arr2,
							Courses : arr3,
							Books : arr4
						});	
					})
					
				})	
			})
		})
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/eventsInsert', isLoggedIn, function(req, res) {
		var newEvent            = new Events();
		// set the user's local credentials
		//console.log(req.user.local.email)
		newEvent.local.email    = req.user.local.email;
		newEvent.local.Title = req.body.eventname; // use the generateHash function in our user model
		newEvent.local.DATETIME    = new Date(req.body.date+ 'T'+req.body.time);
		newEvent.local.LOCATION    = req.body.venue;
		//newEvent.local.Name    = req.body.Name;
		newEvent.local.Description    = req.body.description;
		newEvent.local.image = req.body.image
		// save the user
		// set the user's local credentials
		//newEvent.local.email    = email;
		
		console.log(newEvent)
		//console.log(req.body)
		newEvent.save(function(err) {
		    if (err)
		        throw err;
		    console.log("successfully saved event")
		})
		res.redirect('/mainpage')
	});

	app.post('/bookSwapInsert', isLoggedIn, function(req, res) {
		var newEvent            = new Books();
		// set the user's local credentials
		//console.log(req.user.local.email)
		newEvent.local.email    = req.user.local.email;
		newEvent.local.BookOffered = req.body.bookoffered; // use the generateHash function in our user model
		newEvent.local.BookOffAuthor    = req.body.bookoffauthor;
		newEvent.local.BookRequired    = req.body.bookrequired;
		newEvent.local.BookReqAuthor    = req.body.bookreqauthor;
		newEvent.local.ContactNumber    = req.body.contact;
		//newEvent.local.Name    = req.body.Name;
		// save the user
		// set the user's local credentials
		//newEvent.local.email    = email;
		
		console.log(newEvent)
		newEvent.save(function(err) {
		    if (err)
		        throw err;
		    console.log("successfully saved book")
		})
		res.redirect('/mainpage')
	});

	app.post('/courseSwapInsert', isLoggedIn, function(req, res) {
		var newEvent            = new Courses();
		// set the user's local credentials
		//console.log(req.user.local.email)
		newEvent.local.email    = req.user.local.email;
		newEvent.local.CourseOffered = req.body.courseoffered; // use the generateHash function in our user model
		newEvent.local.TimingsOffered = req.body.timingsoffered;
		newEvent.local.InstructorOffered    = req.body.instructoroffered;
		newEvent.local.CourseRequired    = req.body.courserequired;
		newEvent.local.TimingsRequired    = req.body.timingsrequired;
		newEvent.local.InstructorRequired    = req.body.instructorrequired;
		newEvent.local.Description = req.body.courseoffered + ' ' + req.body.instructoroffered; + ' ' + req.body.courserequired + ' ' + req.body.instructorrequired;
		console.log(newEvent.local.TimingsOffered)
		//newEvent.local.Name    = req.body.Name;
		// save the user
		// set the user's local credentials
		//newEvent.local.email    = email;
		
		console.log(newEvent)
		newEvent.save(function(err) {
		    if (err)
		        throw err;
		    console.log("successfully saved course")
		})
		res.redirect('/mainpage')
	});

	app.post('/lostandFound', isLoggedIn, function(req, res) {
		var newEvent            = new LnF();
		// set the user's local credentials
		//console.log(req.user.local.email)
		newEvent.local.email    = req.user.local.email;
		newEvent.local.LostItem = req.body.lostitem; // use the generateHash function in our user model
		newEvent.local.Description = req.body.description;
		newEvent.local.image = req.body.image
		console.log(req.body)
		//console.log(req.body.choice1)
		//console.log(req.body.choice2)
		console.log(req.body)
		if (req.body.choice === 'choiceLost')
			newEvent.local.LostORFound    = 'Lost';
		else if(req.body.choice === 'choiceFound')
			newEvent.local.LostORFound    = 'Found';
		else
			console.log("THIS IS AN ERROR")
		//newEvent.local.Name    = req.body.Name;
		// save the user
		// set the user's local credentials
		//newEvent.local.email    = email;
		
		console.log(newEvent)
		newEvent.save(function(err) {
		    if (err)
		        throw err;
		    console.log("successfully saved Lost and found.")
		})
		res.redirect('/mainpage')
	});

	app.post('/search', isLoggedIn, function(req, res) {
		//let x = req.body.searchfilter
		let query = req.body.query
		//console.log(query)
		email = req.body.email
		//console.log(x)
		//console.log(req.body)
		//let json = [];
		var dat = new Promise ((resolve) =>{
			var x = req.body.searchfilter
			console.log(x)
			
			//console.log(query)
			let json = [];
			if(x === 'Events'){
				var x = new Promise (resolve => {Events.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
				.exec(function(err,results){resolve(results)})})
				x.then(val=>{json.push(val); resolve(json)})

			
			}
			else if(x === 'LostAndFound'){
				var x = new Promise (resolve => {LnF.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
				.exec(function(err,results){resolve(results)})})
				x.then(val=>{json.push(val); resolve(json)})
			}
			else if(x === 'CourseSwap'){
				var x = new Promise (resolve => {Courses.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
				.exec(function(err,results){resolve(results)})})
				x.then(val=>{json.push(val); resolve(json)})
			}
			else if(x === 'BookSwap'){
				var x = new Promise (resolve => {Books.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
				.exec(function(err,results){resolve(results)})})
				x.then(val=>{json.push(val); resolve(json)})
			}
			else if(x !== undefined){
				let i = x.length
				x.forEach(y=>{
					if(y === 'Events'){
						var x = new Promise (resolve => {Events.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i = i - 1; if(i ===0){resolve(json)}})
					}
					else if(y === 'LostAndFound'){
						var x = new Promise (resolve => {LnF.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i= i - 1; if(i ===0){resolve(json)}})
					}
					else if(y === 'CourseSwap'){
						var x = new Promise (resolve => {Courses.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i= i - 1; if(i ===0){resolve(json)}})
					}
					else if(y === 'BookSwap'){
						var x = new Promise (resolve => {Books.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i= i-1; if(i ===0){resolve(json)}})
					}
				})
			}
			else {
				x = ['Events','LostAndFound','CourseSwap','BookSwap']
				let i = x.length
				console.log('no filter')
				x.forEach(y=>{
					if(y === 'Events'){
						var x = new Promise (resolve => {Events.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i = i - 1; if(i ===0){resolve(json)}})
					}
					else if(y === 'LostAndFound'){
						var x = new Promise (resolve => {LnF.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i= i - 1; if(i ===0){resolve(json)}})
					}
					else if(y === 'CourseSwap'){
						var x = new Promise (resolve => {Courses.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i= i - 1; if(i ===0){resolve(json)}})
					}
					else if(y === 'BookSwap'){
						var x = new Promise (resolve => {Books.find({"$text":{"$search": query}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
						.exec(function(err,results){resolve(results)})})
						x.then(val=>{if(val !== undefined) {json.push(val)} i= i-1; if(i ===0){resolve(json)}})
					}
				})
			}
		})
		y = [];
		dat.then(val => {
			val.forEach(x=> {
				x.forEach(z => {
					console.log(z.local)
					y.push(z.local)
					console.log(z.local)
				})
				//console.log(x[0].local)
				//console.log(x)
			})
			clientSockets[email].emit('results', y)
			//need to send response to client from here
		})
		
		res.send()
		//console.log('array')
		//db.getCollection('events').find({"$text":{"$search": "hosted"}},{ textScore: {$meta: "textScore"}}).sort({textScore: {$meta: "textScore"}})
	})
	app.post('/star_on', isLoggedIn, function(req, res) {
		//console.log(req.body)
		email = req.body.user
		eventData = req.body.eventData
		title = req.body.title
		//DATETIME = req.body.timings
		email = email.split('\n')
		email = email[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
		eventData = eventData.replace(/(\r\n|\n|\r|\t)/gm,"");
		//eventData = eventData.replace("...read more"," ");
		/*DATETIME = DATETIME.replace(/(\r\n|\r|\t)/gm,"");
		DATETIME = DATETIME.split('\n')
		DATE = DATETIME[0]
		TIME = DATETIME[1]
		TIME = TIME.replace("   ","")
		LOCATION = DATETIME[2]
		LOCATION = LOCATION.replace("   ","")*/
		title = title.replace(/(\r\n|\n|\r|\t| )/gm,"");
		//console.log(title)
		//console.log(eventData)
		console.log("someone turned on notifications for "+title + " " + email)
		var newEvent            = new Notifications();
		Events.findOne({'local.Title' : title, 'local.Description' : eventData }, function(err, events) {
			if (err)
            	return done(err);

            if (events) {
            	newEvent.local.email    = email;
            	newEvent.local.event_id = events._id
            	newEvent.save(function(err) {
			    	if (err){
			    		throw err;
			    	}
			        else {
			        	console.log("successfully saved notification data")
			    		clientSockets[email].emit('notify', "You just turned on notifications for "+ title)	
			        }	
			    	
				})
            }
            else {
            	clientSockets[email].emit('notify', "You cant turn on notifications for unsubscribed "+ title + " because it doesnt exist")
		
            }
		})
		res.send()			
	})

	app.post('/star_off', isLoggedIn, function(req, res) {
		//console.log(req.body)
		email = req.body.user
		eventData = req.body.eventData
		title = req.body.title
		//DATETIME = req.body.timings
		email = email.split('\n')
		email = email[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
		eventData = eventData.replace(/(\r\n|\n|\r|\t)/gm,"");
		eventData = eventData.replace("...read more"," ");
		/*DATETIME = DATETIME.replace(/(\r\n|\r|\t)/gm,"");
		DATETIME = DATETIME.split('\n')
		DATE = DATETIME[0]
		TIME = DATETIME[1]
		TIME = TIME.replace("   ","")
		LOCATION = DATETIME[2]
		LOCATION = LOCATION.replace("   ","")*/
		title = title.replace(/(\r\n|\n|\r|\t| )/gm,"");
		console.log("someone turned OFF notifications for "+ title + " "+ email)
		//clientSockets[email].emit('notify', "You just turned off notifications for "+ title)
		Events.findOne({'local.Title' : title, 'local.Description' : eventData }, function(err, events) {
			if (err)
            	return done(err);

            // check to see if theres already a user with that email
            
            if (events) {
            	Notifications.findOne({'local.email' : email, 'local.event_id' : events._id}, function(err, notif) {
            		if(err)
            			return done(err);
            		if(notif){
            			notif.remove()
            			clientSockets[email].emit('notify1', "You just turned off notifications for "+ title)	
            		}
            	})	
            }
            else {
            	clientSockets[email].emit('notify1', "You cant turn off notifications for unsubscribed "+ title + " because it doesnt exist")
            }
		})
		res.send()			
	})
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	//console.log('no')
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
