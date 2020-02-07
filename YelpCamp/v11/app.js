// CREATING MULTIPLE VARIABLES //
var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose 	= require("mongoose"),
	flash		= require("connect-flash"),
	passport 	= require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground  = require("./models/campground"),
	Comment		= require("./models/comment"),
	User 		= require("./models/user"),
// REQUIRING ROUTES //
	commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes 	= require("./routes/index")
	

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp_v10");
// MONGOOSE DEPRECIATION WARNINGS //
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', false);
mongoose.set('useUnifiedTopology', true);

//BODY-PARSER
// parse application/x-www-form-urlencoded //
app.use(bodyParser.urlencoded({extended:true}));

// EJS ENGINE SET //
app.set("view engine", "ejs");

// EXPRESS STATIC FILES //
app.use(express.static(__dirname + "/public"));

// METHOD OVERRIDE //
app.use(methodOverride("_method"));

// CONNECT FLASH FOR FLASH MESSAGES //
app.use(flash());

// PASSPORT CONFIGURATION //
app.use(require("express-session")({
	secret: "YelpC@mp",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE USED PASS IN currentUser:req.user TO ALL ROUTES //
app.use(function(req,res,next){
	// Expose local variables to the view engine and templates  //
	res.locals.currentUser = req.user;
	// connect-flash messages are now can now be accessed locally in all view templates //
	res.locals.error = req.flash("error"); 
	res.locals.success = req.flash("success"); 
	next();
});

// V7 - USE NEW EXPRESS ROUTES //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPEND / to DRY Code //
app.use("/",indexRoutes);
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPEND /campgrounds to DRY Code //
app.use("/campgrounds",campgroundRoutes);
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPEND /campgrounds/:id/comments to DRY Code //
app.use("/campgrounds/:id/comments",commentRoutes);




// START THE SERVER //
app.listen("3000",function(){
	console.log("The YelpCamp Is now live!");
});


