var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Due to scoping issues we need to initialize the friends array on a global scope so we can use it the array in any route (i.e to post new friends in the array) //
var friends = ["Tony","Miranda","Justin","Pierre","Lilly"];

// Body Parser is a package that takes the input from the body and converts it to a js object //
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");


app.get("/",function(req,res){
	res.render("home");
});

app.get("/friends",function(req,res){
	res.render("friends",{friends:friends});
})

// START POST ROUTE TO POST OR ADD FRIENDS TO THE LIST //
// ADD INPUT FROM newFriend in the name tag and add it to friends array using body-parser package //  
app.post("/addfriend",function(req,res){
	var newFriend = req.body.newfriend;
	// var friends = ["Tony","Miranda","Justin","Pierre","Lilly"]
	friends.push(newFriend);
	// res.send("You've got a new friend!");
	//Instead of sending a new message with you've got a friend, ideally we would want to see the friends list updated on the same page //
	res.redirect("/friends");
});




app.listen("3000",function(){
	console.log("SERVER IS NOW LISTENING ON PORT 3000!");
});

