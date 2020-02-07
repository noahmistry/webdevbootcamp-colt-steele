var mongoose = require("mongoose");

// Create Comment Model Schema //
var commentSchema = mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
	// ref is to refer to the model object we want the to associate the model to the id // 			
			ref: "User"
		},
		username: String
	}
});


module.exports = mongoose.model("Comment", commentSchema);