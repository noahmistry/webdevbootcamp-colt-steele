var mongoose = require("mongoose");

// Create Comment Model Schema //
var commentSchema = mongoose.Schema({
	text: String,
	author: String
});


module.exports = mongoose.model("Comment",commentSchema);