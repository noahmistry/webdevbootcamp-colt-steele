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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//BODY-PARSER
// parse application/x-www-form-urlencodedc
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
	res.render("landing");
});

// INDEX RESTful ROUTE - show all campgrounds //
app.get("/campgrounds",function(req,res){
	
	// GET ALL CAMPGROUNDS FROM DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});	
		}
	});
});

// NEW RESTful ROUTE - show form to create a new campground //
app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});

//  SHOW RESTful ROUTE - shows more info about one campground //
app.get("/campgrounds/:id",function(req,res){
	//find the campground with the provided ID
	// Using Mongoose Method FindById(id,callback )
	Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
		if(err) {
			console.log(err)
		} else {
			// console.log(campground);
			// render show template
			res.render("campgrounds/show",{campground:campground});
		}
	}); 
});

// CREATE RESTful Route - Add new campground to DB //
app.post("/campgrounds",function(req,res){
	
	// get data from form and add to campground array
	var name = req.body.newCampgroundName;
	var image = req.body.newImageUrl;
	var description = req.body.newCampgroundDescription;
	var newCampground = {name:name,image:image,description:description};
	//Create a new campground and save to DB
	Campground.create(newCampground,function(err,newCreatedCampground){
		if(err){
			console.log(err);
		} else {
		// redirect back to campgrounds page
		res.redirect("/campgrounds");		
		}
	});
	
});

// ==================
//	COMMENTS ROUTES
// ==================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
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

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
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



// AUTH ROUTES //

//Show Register Form //
app.get("/register",function(req,res){
	res.render("register");
});

// SIGN UP LOGIC //
app.post("/register",function(req,res){
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


//  LOGIN FORM //
app.get("/login",function(req,res){
	res.render("login");
});
// LOGIN LOGIC WITH PASSPORT AUTHENTICATE MIDDLEWARE //
// PASSPORT AUTHENTICATE MIDDLEWARE USING OUR LOCAL STRATEGY //
app.post("/login", passport.authenticate("local", {
	successRedirect:"/campgrounds",
	failureRedirect:"/login",
	}), function(req,res){
});

//  LOGOUT ROUTE USING LOGOUT() FROM PASSPORT  //
app.get("/logout",function(req,res){
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

// START THE SERVER //
app.listen("3000",function(){
	console.log("The YelpCamp Is now live!");
});


