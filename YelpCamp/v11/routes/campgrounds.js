// REQUIRE EXPRESS,EXPRESS ROUTER, CAMPGROUND MODEL //
var express 	= require("express"),
	router		= express.Router(); 
	Campground	= require("../models/campground");
	// Require middleware //
	// We don't use index.js because it is given that when require from the directory it will look for index.js //
	middleware 	= require("../middleware");

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
// V.10 - We need to add the middleware from the new index.js file //
router.post("/", middleware.isLoggedIn, function (req,res){
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
router.get("/new", middleware.isLoggedIn, function(req,res){
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
			// render show template
			res.render("campgrounds/show",{campground:campground});
		}
	}); 
});

// EDIT CAMPGROUND ROUTE //
// V.10 - New Middleware to check user authorization called campgroundAuthorization //
router.get("/:id/edit", middleware.campgroundAuthorization, function(req,res){
// V.10 - Once we have authorization through the middleware then we can go ahead and edit the users campground //   
	Campground.findById(req.params.id,function(err,foundCampground){
			res.render("campgrounds/edit", {campground:foundCampground});
		});
});

// UPDATE CAMPGROUND ROUTE //
router.put("/:id", middleware.campgroundAuthorization, function(req,res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
		if(err) {
			res.redirect("/campgrounds");
		} else {
			// redirect to the show page //
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE //
router.delete("/:id", middleware.campgroundAuthorization, function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
})


module.exports = router;
