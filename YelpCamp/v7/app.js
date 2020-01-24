// CREATING MULTIPLE VARIABLES //
var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose 	= require("mongoose"),
	passport 	= require("passport"),
	LocalStrategy = require("passport-local"),
	Campground  = require("./models/campground"),
	Comment		= require("./models/comment")
	User 		= require("./models/user"),
// REQUIRING ROUTES //
	var commentRoutes = require("./routes/comments"),
	var campgroundRoutes = require("./routes/campground"),
	var indexRoutes 	= require("./routes/index"),
	

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://localhost:27017/yelp_camp_v6");
// MONGOOSE DEPRECIATION WARNINGS //
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', false);
mongoose.set('useUnifiedTopology', true);


// EJS ENGINE SET //
app.set("view engine", "ejs");

// EXPRESS STATIC FILES //
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION //
app.use(require("express-session")({
	secret: "YelpC@mp",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// MIDDLEWARE USED PASS IN currentUser:req.user TO ALL ROUTES //
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

// V7 - USE NEW EXPRESS ROUTES //
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPEND / to DRY Code //
app.use("/",indexRoutes);
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPEND /campgrounds to DRY Code //
app.use("/campgrounds",campgroundRoutes);
// V7 - CHANGED APP ROUTE TO EXPRESS ROUTER & APPEND /campgrounds/:id/comments to DRY Code //
app.use("/campground/:id/comments",commentRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//BODY-PARSER
// parse application/x-www-form-urlencodedc
app.use(bodyParser.urlencoded({extended:true}));




// START THE SERVER //
app.listen("3000",function(){
	console.log("The YelpCamp Is now live!");
});


