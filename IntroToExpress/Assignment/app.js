var express = require("express");
var app = express();

// 3 Routes //

// "/" Root Homepage //
app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment!");
});

// "/:speak" //
app.get("/speak/:animal",function(req,res) {
	
	//DRY WAY with javascript object//
	var animalSoundObject = {
		pig: "Oink",
		cow: "Moo",
		donkey: "Heehaw",
		dog: "Woof Woof!",
		lion: "Rawr!",
	};
	var animal = req.params.animal.toLowerCase(); // Make sure upper case entries are converted to lower case //
	var animalSound = animalSoundObject[animal];
		res.send("The " +animal + " says " +animalSound + "!");
});	

	// REPEAT ROUTES//
	app.get("/repeat/:message/:numberOfRepeats",function(req,res){
		var message = req.params.message;
		var repeats = Number(req.params.numberOfRepeats);
		//create a variable to store the res.send message//
		var space = "";
		var result = "";
		for(var i = 0; i < repeats; i++) {
			result += message+'\xa0';
		}
		res.send(result);
	});
	// ANY OTHER ROUTE//
	app.get("*",function(req,res){
		res.send("Sorry page not found...What are you doing with your life?");
	});
	

		
	
	// WET WAY // 
	/* var animal = req.params.animal;
	var animalSounds = "";
	if(animal === "pig") {
		animalSounds = "oink";
	} else if (animal === "cow") {
		animalSounds = "Moo";
	}
	res.send("The " +animal + " says " +animalSounds + "!");
});
	*/

// Tell express to listen for requests (start server) //
	app.listen(3000,function() {
	console.log("Server is listening on port 3000");
});