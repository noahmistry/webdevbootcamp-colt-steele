var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");


app.get("/",function(req,res){
	res.render("search");
});

app.get("/results",function(req,res){
	// GET DATA FROM THE SEARCH QUERY STRING //
	var querySearch = req.query.search;
	// MAKE URL VARIABLE TO STORE SEARCH QUERY //
	var url = "http://www.omdbapi.com/?s=" + querySearch + "&apikey=thewdb"; 
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var dataResults = JSON.parse(body);
			res.render("result",{dataResults:dataResults});
		}
	});
});



app.listen("3000",function(){
	console.log("MOVIE APP IS NOW LIVE!");
});