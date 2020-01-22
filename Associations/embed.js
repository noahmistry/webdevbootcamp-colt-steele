var mongoose = require("mongoose");
	Schema = mongoose.Schema;

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://localhost:27017/blog_app");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



// TWO MODELS //
// POST - title, content //
var postSchema = new Schema ({
	title: String,
	content: String	
});

// USER - email, name //
var userSchema = new Schema({
    email:  String,
    name: String,
	// array of posts inside the user schema for one:many relationship //
	// postSchema needs to be defined first to be used in userSchema //
	post: [postSchema] 
  });

// CREATE USER MODEL //
var User = mongoose.model("User", userSchema);
// CREATE POST MODEL //
var Post = mongoose.model("Post", postSchema);


// Create a new user document //
// var newUser = new User({
//     email: "jhonny@brown.edu",
// 	name: "Johnny Brown"
//   });

// Pushing a post to the newUser document //
// newUser.post.push({
// 	title: "How to make a delicious vegan brunch",
// 	content: "Follow these three key steps",
// });

//Save the user document //
// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log(user);
// 	}
// });

// Retrieve the user Johnny Brown //
User.findOne({name: "Johnny Brown"},function(err, user){
	if(err){
		console.log(err);
	} else {
		user.post.push({
			title: "5 Steps to Nutritional Balance",
			content: "Eat, Sleep, Exercise and Faith"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
	}	
)

// Create a new post document //
// newPost = new Post({
// 	title: "Shepherd's Pie",
// 	content: "How to make the best shepherd's pie!"
// });
// // Save the post document //
// newPost.save(function(err, newPost){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(newPost);
// 	}
// });


