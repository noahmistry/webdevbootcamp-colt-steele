// CREATING MULTIPLE VARIABLES //
var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	Comment		= require("./models/comment")
	// seedDB 		= require("./seeds")

// seedDB();
	

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://localhost:27017/yelp_camp_v4",{useNewUrlParser:true},{useUnifiedTopology:true},{useCreateIndex:true},{useFindAndModify:false});


app.set("view engine", "ejs");

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
			// res.render("campgrounds/index",{campgrounds:allCampgrounds});	
			res.render("campgrounds/index",{campgrounds:allCampgrounds});	
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
	Campground.findById(req.params.id).populate("comment").exec(function(err,campground){
		if(err) {
			console.log(err)
		} else {
			console.log(campground);
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
		res.redirect("campgrounds/show");		
		}
	});
	
});

// ==================
//	COMMENTS ROUTES
// ==================

app.get("/campgrounds/:id/comments/new", function(req,res){
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

app.post("/campgrounds/:id/comments", function(req,res){
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




// START THE SERVER //
app.listen("3000",function(){
	console.log("The YelpCamp Is now live!");
});


