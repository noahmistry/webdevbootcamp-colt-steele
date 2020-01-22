var mongoose = require("mongoose");
// Add Passport Local Plugin //
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// Use the passport local plugin with the UserSchema we created and add methods to our user  model //
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);