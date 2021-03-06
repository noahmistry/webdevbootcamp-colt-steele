// We need to require Campground and Comment models as dependencies for middleware //
var Campground	= require("../models/campground");
	Comment		= require("../models/comment");

// ==================
//	MIDDLEWARE
// ==================

var middlewareObj = {};

// LOGGED IN MIDDLEWARE //
middlewareObj.isLoggedIn = function (req,res,next) {
    if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

// CAMPGROUND MIDDLEWARE //
middlewareObj.campgroundAuthorization = function (req,res,next) {
    // if user is logged in //
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err,foundCampground){
			if (err) {
				// if user doesn't exist or database is not connected //
				res.redirect("back");
			} else {
				// does the owner of the campground match the user id?  //
				// We can't use a === or == to check for condition because foundCampground.author.id is a mongoose object and req.user._id is a string // 
				if (foundCampground.author.id.equals(req.user._id)) {
					// if the previous condition is true, go to next part of the next part of the middleware function // 
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}


// COMMENT MIDDLEWARE //
middlewareObj.commentAuthorization = function (req,res,next) {
    if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err,foundComment){
			if (err) {
				// if user doesn't exist or database is not connected //
				res.redirect("back");
			} else {
				// does the owner of the comment match the user id?  //
				// We can't use a === or == to check for condition because foundComment.author.id is a mongoose object and req.user._id is a string // 
				if (foundComment.author.id.equals(req.user._id)) {
					// if the previous condition is true, go to next part of the next part of the middleware function // 
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}


module.exports = middlewareObj;
