// REQUIRE EXPRESS,EXPRESS ROUTER, CAMPGROUNDS AND COMMENTS MODELS //
var express 	= require("express"),
// V7 - NEEDS TO MERGE TOGETHER PARAMETERS FROM CAMPGROUNDS AND COMMENTS SO ID WILL BE PASSED THROUGH   //
	router		= express.Router({mergeParams:true});
	Campground	= require("../models/campground");
	Comment		= require("../models/comment");
	// Require middleware //
	// We don't use index.js because it is given that when require from the directory it will look for index.js //
	middleware 	= require("../middleware");

// ==================
//	NEW COMMMENTS
// ==================
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED /campgrounds/:id/comments in app.js to DRY Code //
router.get("/new", middleware.isLoggedIn, function(req,res){
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
router.post("/", middleware.isLoggedIn, function(req,res){
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
					// Flash Error Message if there is a data or database error //
					req.flash("error", "Something went wrong!");
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
				// Flash Success Message - Comment is created successfully //
					req.flash("success", "Comment successfully created!"); 
				// Redirect to Campground showpage "/campgrounds/:id //
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


// EDIT ROUTE //
router.get("/:comment_id/edit", middleware.commentAuthorization, function(req,res){
	// We technically already have the campground id through our app.use in our app.js //
	// We now can use comments id through our Comment model and findById //
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	});
});

// UPDATE ROUTE //
// Route path /campgrounds/:campgrounds:id/comments/comment_id //
router.put("/:comment_id", middleware.commentAuthorization, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment) {
		if (err) {
			res.redirect("back");
		} else {
			// We are using the campground id not the comments id //
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DELETE ROUTE //
router.delete("/:comment_id", middleware.commentAuthorization,  function(req,res) {
	// findByIdAndRemove //
	Comment.findByIdAndRemove(req.params.comment_id, function(err,deletedComment) {
		if (err) {
			res.redirect("back");
		} else {
			// Flash Error Message - Comment has successfully been deleted //
			req.flash("success","Comment successfully deleted!");
			// We are using the campground id not the comments id //
			res.redirect("/campgrounds/" + req.params.id)
		}
	});
});


module.exports = router;
