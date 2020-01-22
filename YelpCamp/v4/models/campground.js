var mongoose = require("mongoose");

// Campground Schema //
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	comments: [{
		// array of comments inside the user schema to associate Object_Id and Ref  //
		// campgroundSchema needs to be defined first to be used in userSchema //
		type: mongoose.Schema.Types.ObjectId,
		ref:"Comment"
			}
		]
});
module.exports = mongoose.model("Campground", campgroundSchema);