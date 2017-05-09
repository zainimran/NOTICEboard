// app/models/events.js
// load the things we need
//each event is already assigned a unique id. So no need for an autoincrement field.
//to extract date and time from DB separately, use method DATETIME.toISOString()
//email id shows the owner of the post and must be primary and required
//sanity check for stopping same user from spamming is performed in routes.js /eventsInsert.
//need to add primary key constraint, {type : String, unique : true} didnt work

var mongoose = require('mongoose');
// define the schema for our events model
var lnFSchema = mongoose.Schema({

    local            : {
        email 		 : String,
        LostItem	 : String,
        Description	 : {type : String, index :true,text:true},
        LostORFound  : String,
        image 		 : String,
    }
});


// create the model for events and expose it to our app
module.exports = mongoose.model('LnF', lnFSchema);
