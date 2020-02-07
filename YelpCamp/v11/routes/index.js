// REQUIRE EXPRESS,EXPRESS ROUTER, PASSPORT AND USER MODELS //
var express 	= require("express"),
	router		= express.Router();
	passport	= require("passport");
	User		= require("../models/user");
	Campground  = require("../models/campground");
	Comment  	= require("../models/comment");

// INDEX RESTFUL ROUTE - LANDING PAGE //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED / in app.js to DRY Code //
router.get("/",function(req,res){
	res.render("landing");
});


// AUTH ROUTES //

//Show Register Form //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED / in app.js to DRY Code //
router.get("/register",function(req,res){
	res.render("register");
});

// SIGN UP LOGIC //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED / in app.js to DRY Code //
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	// CREATE AND REGISTER USER TO DB //
	User.register(newUser, req.body.password, function(err,user){
		if(err) {
			// Flash Error Message - If an err exist it will send us whatever the error is located inside the callback function(err) //
			req.flash("error", err.message);
			// console.log(err);
			return res.render("register");
		}
	// ONCE USER IS CREATED AND SAVED IN THE DATABASE, RUN PASSPORT AUTHENTICATE WITH LOCAL STRATEGY // 		
		passport.authenticate("local")(req,res,function(){
			// Flash Error Message - After successful login, custom message is flashed to the user and username is also displayed //
			req.flash("success","Welcome to YelpCamp" + " " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//  LOGIN FORM //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED / in app.js to DRY Code //
router.get("/login",function(req,res){
	// V-11 Connect flash module from the index.js middleware for flash messaging //
	res.render("login", {message:req.flash("error")});
});
// LOGIN LOGIC WITH PASSPORT AUTHENTICATE MIDDLEWARE //
// PASSPORT AUTHENTICATE MIDDLEWARE USING OUR LOCAL STRATEGY //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED / in app.js to DRY Code //
router.post("/login", passport.authenticate("local", {
	successRedirect:"/campgrounds",
	failureRedirect:"/login",
	}), function(req,res){
});

//  LOGOUT ROUTE USING LOGOUT() FROM PASSPORT  //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED / in app.js to DRY Code //
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "Successfully logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;