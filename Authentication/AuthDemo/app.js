var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	User		  = require("./models/user"),
	passportLocalMongoose = require("passport-local-mongoose");	
	

// INITIALIZE EXPRESS //
var	app = express();

// EJS ENGINE SET //
app.set("view engine", "ejs");
// CONNECT EXPRESS TO PASSPORT JS //
app.use(passport.initialize());
app.use(passport.session());

// We are using the LocalStrategy model coming from user.ejs - passport local mongoose package //
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  EXPRESS SESSION //
app.use(require("express-session")({
	secret: "H3lloW0rld",
	resave: false,
	saveUninitialized: false
}));

//BODY-PARSER
app.use(bodyParser.urlencoded({extended:true}));


/ CONNECT MONGOOSE to MONGODB //
mongoose.connect('mongodb://localhost:27017/authentication');
// MONGOOSE DEPRECIATION WARNINGS //
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', false);
mongoose.set('useUnifiedTopology', true);

// ==========
// ROUTES //
// ==========
app.get("/",function(req,res){
	res.render("home");
});

// SECRET ROUTE //
// ADDED isLoggedIn Middleware to check if user is still logged in and avoid direct url manipulation//
app.get("/secret", isLoggedIn, function(req,res){
	res.render("secret");
});

// AUTH ROUTE //
// SHOW REGISTER PAGE // 
app.get("/register",function(req,res){
	res.render("register");
});
// SHOW REGISTER POST PAGE TO HANDLE USER SIGN UP //
app.post("/register",function(req,res){
	// We make a user object and only pass the username but we don't save the password to the database, password is the second argument  //
	User.register(new User({username: req.body.username}), req.body.password, function(err,user){
		if(err){
			console.log(err);
			// if there is a error go back to the register page //
			return res.render("register");
		}
		// Passport will authenticate the username and session and run the serialize user method and run the local strategy //  
		passport.authenticate("local")(req,res,function(){
			res.redirect("secret");
		});
	});
});

// LOGIN ROUTES //
// RENDER LOGIN FORM //
app.get("/login", function(req,res){
	res.render("login");
});

// LOGIN LOGIC //
// USING MIDDLEWARE - Middleware allows you to define a stack of actions that you should flow through before our final function callback. We can have multiple middlewares, they sit in between the beginning of the route and the end of the route //
// app.post("/login", passport.authenticate("local", {
// 	successRedirect:"/secret",
// 	failureRedirect:"/login"
// }), function(req,res){
	
// });

// LOGOUT ROUTE //
app.get("/logout",function(req,res){
	req.logout(); // Passport is destroying all the user data in the session from reques to request
	res.redirect("/");
});

// FUNCTION isLoggedIn - We need to check if the user is still logged in, then render secret page, if not then render login page //
function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()){
		return next();
		// Next refers to the function callback after isLoggedIn is done // 
		// if not the redirect to login page //
	}
	res.redirect("/login");
}

// START THE SERVER //
app.listen("4000",function(){
	console.log("Auth Demo is live!");
});

