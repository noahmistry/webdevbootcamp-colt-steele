var mongoose = require("mongoose");
	Schema = mongoose.Schema;
// POST MODEL - title, content //
var postSchema = new Schema ({
	title: String,
	content: String	
});

// Exporting the Model so it can be required into another file //
				// Long Way
// var Post = mongoose.model("Post", postSchema);
// module.exports = Post;
				// ShortHand //
module.exports = mongoose.model("Post", postSchema);