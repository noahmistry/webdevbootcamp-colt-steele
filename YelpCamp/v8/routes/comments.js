// REQUIRE EXPRESS,EXPRESS ROUTER, CAMPGROUNDS AND COMMENTS MODELS //
var express 	= require("express"),
// V7 - NEEDS TO MERGE TOGETHER PARAMETERS FROM CAMPGROUNDS AND COMMENTS SO ID WILL BE PASSED THROUGH   //
	router		= express.Router({mergeParams:true});
	Campground	= require("../models/campground");
	Comment		= require("../models/comment");

// ==================
//	NEW COMMMENTS
// ==================
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED /campgrounds/:id/comments in app.js to DRY Code //
router.get("/new", isLoggedIn, function(req,res){
	// Since we already have new page template, we will have to split views directory //
	// Now, find camground by id //
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground:campground});
		}
	});
});


// ==================
//	POST COMMENTS
// ==================
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED /campgrounds/:id/comments in app.js to DRY Code //
router.post("/", isLoggedIn, function(req,res){
	// Look up campground using ID //
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// We can use the req.body.comment to gather all info from HTML array attribute 'comment[]' //
				// Create new Comment //
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
				// add username and id to comment //
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
				// 	save comment //
					comment.save();
				// Connect new comment to campground //
					campground.comments.push(comment);
				// Save the comment to the found campground //
					campground.save();
				// Redirect to Campground showpage "/campgrounds/:id //
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// ==================
//	MIDDLEWARE
// ==================
 
// V7 - NEEDS IS isLoggedIn MIDDLEWARE TO CHECK IF USER IS AUTHORIZED TO CREATE A COMMENT  //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED /campgrounds/:id/comments in app.js to DRY Code //
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
