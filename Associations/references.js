var mongoose = require("mongoose");
	Schema = mongoose.Schema;

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://localhost:27017/blog_app_2");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Referencing the post module file in the models directory //
// '.' is where we currently are and '/' to go into a specified directory //
var Post = require("./models/post");
var User = require("./models/user");


				// Create a Post //
Post.create({
		title: "How to cook the best burger - Part 4",
		content: "awdawkdjbnkajd-adasd-awdaw"
	
		// Associate the User with the Post //

	// "post" will store the contents of Post.create //
}, function(err,post){
	// Find the created User with either name or email attribute //
		User.findOne({email:"jimmy@gmail.com"}, function(err, foundUser){
			if(err){
				console.log(err)
			} else {
				// Take the created post and push it into the foundUser post //
				foundUser.post.push(post);
				// Save the user and post to the db collection//
				foundUser.save(function(err,data){
					if(err){
						console.log(err);
					} else {
						console.log(data);
					}
				});
			}
		});
});

// Find User //
									// Look up all the id's and data in the post array// 
									// Lastly execute the chained query with 'exec' //

// Find all posts for that user //
// User.findOne({email:"jimmy@gmail.com"}).populate("post").exec(function(err,user){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log(user);
// 		}
// });






