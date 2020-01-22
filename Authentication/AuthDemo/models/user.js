var mongoose = require("mongoose"),
var	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
});

// This plugin takes care of hashing the password and adding username in the database//
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);