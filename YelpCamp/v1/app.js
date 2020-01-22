var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
	{name:"Madison Campgrounds", image:"https://live.staticflickr.com/5569/14831208733_4e2fbc74cc_b.jpg"},
	{name:"Hat Creek Campground", image:"https://farm2.staticflickr.com/1124/1487755105_59f9f7fe27_b.jpg"},
	{name:"Walker Pass", image:"https://farm4.staticflickr.com/3541/3620579983_81416238e9_b.jpg"},
	{name:"Madison Campgrounds", image:"https://live.staticflickr.com/5569/14831208733_4e2fbc74cc_b.jpg"},
	{name:"Hat Creek Campground", image:"https://farm2.staticflickr.com/1124/1487755105_59f9f7fe27_b.jpg"},
	{name:"Walker Pass", image:"https://farm4.staticflickr.com/3541/3620579983_81416238e9_b.jpg"},
	{name:"Madison Campgrounds", image:"https://live.staticflickr.com/5569/14831208733_4e2fbc74cc_b.jpg"},
	{name:"Hat Creek Campground", image:"https://farm2.staticflickr.com/1124/1487755105_59f9f7fe27_b.jpg"},
	{name:"Walker Pass", image:"https://farm4.staticflickr.com/3541/3620579983_81416238e9_b.jpg"},
]

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

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	
	// get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name,image:image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

