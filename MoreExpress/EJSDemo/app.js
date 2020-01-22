var express = require("express");
var app = express();


// By Default our external stylesheets will not load automatically from our public folder, so we have to make a route to link ext. stylesheets //
app.use(express.static("public"));

// Instead of always specifying the .ejs filename extension we can tell EJS that we intend to use ejs extension ahead of time //
app.set("view engine","ejs");


app.get("/",function(req,res){
	
	//Instead of using the send method to show html and js on the frontend, which is long and not DRY we use the render() method and an embedded js template to link to an html & JS file // 
	res.render("home");
	res.send("Welcome to the homepage!");	
});

// We need to first create a views directory for all HTML & JS on the front-end and initalize ejs --save before rendering HTML & JS Objects //

app.get("/musicallypunny/:instrument",function(req,res){
	var instrument = req.params.instrument;
	res.render("puns",{guitar:instrument}); // with a use of a js object we can link the instrument variable to the JS Objects and display them accordingly //
});

// ARRAY OF POSTS for LOOP Logic //
app.get("/posts",function(req,res){
	var posts = [
		{title:"Post 1",author: "Jimmy"},
		{title:"Jack and Jill",author: "Jack & Jill"},
		{title:"Who let the dogs out?",author: "The Bahamen"},
	]
	
	res.render("posts",{posts:posts});
});

// Tell express to listen for requests (start server) //
	app.listen(3000,function() {
	console.log("Server is listening on port 3000");
});


