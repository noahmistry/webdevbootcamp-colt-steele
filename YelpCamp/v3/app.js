// CREATING MULTIPLE VARIABLES //
var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	seedDB 		= require("./seeds")

seedDB();
	

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3",{useNewUrlParser:true},{useUnifiedTopology:true},{useCreateIndex:true},{useFindAndModify:false});


app.set("view engine", "ejs");

//BODY-PARSER
// parse application/x-www-form-urlencodedc
app.use(bodyParser.urlencoded({extended:true}));

// START THE SERVER //
app.listen("3000",function(){
	console.log("The YelpCamp Is now live!");
});



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
			res.render("index",{campgrounds:allCampgrounds});	
		}
	});
});

// NEW RESTful ROUTE - show form to create a new campground //
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

//  SHOW RESTful ROUTE - shows more info about one campground //
app.get("/campgrounds/:id",function(req,res){
	//find the campground with the provided ID
	// Using Mongoose Method FindById(id,callback )
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err) {
			console.log(err)
		} else {
			console.log(foundCampground);
			// render show template
			res.render("show",{campground:foundCampground});
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





