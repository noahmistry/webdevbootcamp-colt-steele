// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");

// CREATING MULTIPLE VARIABLES //
var express 	= require("express");
	app 		= express();
	bodyParser	= require("body-parser");
	mongoose 	= require("mongoose");

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://localhost:27017/yelp_camp_v10",{useNewUrlParser:true},{useUnifiedTopology:true},{useCreateIndex:true},{useFindAndModify:false});


// SCHEMA SETUP //
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

// COMPILE INTO A MODEL //

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{name:"VCA Cozy Campground", 
// 	 image:"https://live.staticflickr.com/7139/7634427560_3231d9ef64_m.jpg",
// 	 description: "This is a cozy campground, family and pet friendly. Lot's of scenic views and lakes to explore!"
// 	},
// 	function(err,campground){
// 	if(err){
// 		console.log("SOMETHING WENT WRONG!");
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND: ");
// 		console.log(campground);
// 	}
// });




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
	Campground.findById(req.params.id,function(err,campgroundId){
		if(err) {
			console.log(err)
		} else {
			// render show template
			res.render("show",{campground:campgroundId});
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





