// REQUIRE EXPRESS,EXPRESS ROUTER, PASSPORT AND USER MODELS //
var express 	= require("express"),
	router		= express.Router();
	passport	= require("passport");
	User		= require("../models/user");

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
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	// CREATE AND REGISTER USER TO DB //
	User.register(newUser, req.body.password, function(err,user){
		if(err) {
			console.log(err);
			return res.render("register");
		}
	// ONCE USER IS CREATED AND SAVED IN THE DATABASE, RUN PASSPORT AUTHENTICATE WITH LOCAL STRATEGY // 		
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});

module.exports = router;


//  LOGIN FORM //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPENDED / in app.js to DRY Code //
router.get("/login",function(req,res){
	res.render("login");
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
	res.redirect("/campgrounds");
});

// IS LOGGED IN //
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;