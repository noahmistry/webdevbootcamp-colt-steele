var mongoose = require("mongoose");

// Campground Schema //
// campgroundSchema needs to be defined first to be used in userSchema //
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	author:{
		id: {
			type:mongoose.Schema.Types.ObjectId,
		},
		username: String
	},
		comments: [
		{
		// array of comments inside the user schema to associate Object_Id and Ref  //
		type: mongoose.Schema.Types.ObjectId,
		// ref refers to the object model to associate the Object_Id // 				
		ref:"Comment"
		}
	]
});
module.exports = mongoose.model("Campground", campgroundSchema);