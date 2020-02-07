// REQUIRE EXPRESS,EXPRESS ROUTER, CAMPGROUND MODEL //
var express 	= require("express"),
	router		= express.Router();
	Campground	= require("../models/campground");

// INDEX RESTFUL ROUTE - LANDING PAGE //
// V7 - CHANGED APP ROUTE TO ROUTER //
router.get("/",function(req,res){
	
	// GET ALL CAMPGROUNDS FROM DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});	
		}
	});
});

// CREATE RESTful Route - Add new campground to DB //
// V7 - CHANGED APP ROUTE TO ROUTER //
router.post("/", isLoggedIn, function (req,res){
	
	// get data from form and add to campground array
	var name = req.body.newCampgroundName;
	var image = req.body.newImageUrl;
	var description = req.body.newCampgroundDescription;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name,image:image,description:description, author:author};
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

// NEW RESTful ROUTE - show form to create a new campground //
// V7 - CHANGED APP ROUTE TO ROUTER //
router.get("/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//  SHOW RESTful ROUTE - shows more info about one campground //
// V7 - CHANGED APP ROUTE TO ROUTER //
router.get("/:id",function(req,res){
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

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
