var mongoose = require("mongoose");
	Schema = mongoose.Schema;

// USER - email, name //
var userSchema = new Schema({
    email:  String,
    name: String,
	// array of posts inside the user schema for one:many relationship //
	// postSchema needs to be defined first to be used in userSchema //
	post: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	] 
  });
// Exporting the Model so it can be required into another file //
				// Long Way
// var Post = mongoose.model("Post", postSchema);
// module.exports = Post;
				// ShortHand //
module.exports = mongoose.model("User", userSchema);
