var express = require("express");
var app = express();

// 3 Routes //

// "/ root homepage" => "Hi there!"

app.get("/",function(req,res) {
	res.send("Hi there!");
});

// "/bye" => "Goodbye" 
app.get("/bye",function(req,res){
	res.send("Goodbye!");
});
// "/dog" => "MEOW!"
app.get("/dog",function(req,res){
	console.log("SOMEONE HAS MADE A REQUEST!!");
	res.send("MEOW!!");
});

// GET ALL '*' request handler //
app.get("*",function(req,res) {
	res.send("You have reached star status!!!");
});

// Tell express to listen for requests (start server) //
	app.listen(3000,function() {
	console.log("Server is listening on port 3000");
});