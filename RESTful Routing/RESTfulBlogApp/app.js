// CREATING MULTIPLE VARIABLES //
var express 	= require("express"),
	bodyParser	= require("body-parser"),
	mongoose 	= require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");
	app 		= express();

// CONNECT MONGOOSE to MONGODB //
mongoose.connect("mongodb://localhost:27017/restfulBlogApp",{useNewUrlParser:true},{useUnifiedTopology:true},{useCreateIndex:true},{useFindAndModify:false});
// SET EJS FORMAT //
app.set("view engine", "ejs");
// SERVING STATIC FILES e.g Images, CSS, Custom JS //
app.use(express.static("public"));
//BODY-PARSER
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
// Express-Sanitizer - JS Script tag protection - Needs to come after body-parser //
app.use(expressSanitizer());
// Method-Override for converting query string to a PUT Request //
app.use(methodOverride("_method"));



// BLOG SCHEMA & MODEL //
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema); // model is actually called Blogs

// Blog.create({
// 	title: "Test Blog",
// 	image: "https://farm3.staticflickr.com/2225/1962956995_1b25e55bd0_m.jpg",
// 	body: "This is a test blog to initiate the db",
// });

// RESTful ROUTES //

// INDEX ROUTE //
app.get("/",function(req,res){
	res.redirect("/blogs");
});

// BLOG ROUTE //
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err)
		} else {
			res.render("index",{blogs:blogs});
		}
	})
});

// NEW POST BLOG //
app.get("/blogs/new",function(req,res){
	res.render("new");
});

// CREATE ROUTE //
app.post("/blogs",function(req,res){
	// sanitizing the blog[body] content and also req.body which is the data coming from our form body //
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// create blog //
	Blog.create(req.body.blog, function(err,newBlog){
		if(err){
			res.render("new");
		} else {
			// redirect to index route //
			res.redirect("/blogs");
		}
	});
	
});


// SHOW ROUTE //
app.get("/blogs/:id",function(req,res){
	// take the id, finding correct blog and render show template //
	// finding correct blog - Moogoose Method //
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show",{blog:foundBlog});
		}
	});
});

// EDIT ROUTE //
app.get("/blogs/:id/edit",function(req,res){
	// find the correct id //
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit",{blog:foundBlog});
		} 
	});
});

// UPDATE ROUTE //
app.put("/blogs/:id",function(req,res){
	// sanitizing the blog[body] content and also req.body which is the data coming from our form body //
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// Take the ID, find the existing post and blog and update new data //
	//Blog.findByIdAndUpdate(id,newData,callback)//
	Blog.findById(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id)
		}
	});
});

// DELETE ROUTE //
app.delete("/blogs/:id", function(req,res){
	// Destroy blog needs an id, and callback //
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
	// redirection //
});



// START THE SERVER //
app.listen("4000",function(){
	console.log("RESTful Routes is now live!");
});