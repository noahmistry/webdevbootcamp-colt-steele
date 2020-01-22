var mongoose = require("mongoose");

// CONNECTING THE CARS APP DB //
mongoose.connect("mongodb://localhost/cars_app",{useNewUrlParser:true});
mongoose.set({useFindAndModify:false});
mongoose.set({useCreateIndex:true});
mongoose.set({useUnifiedTopology:true});



// SCHEMA IS A MODEL OR PATTERN //
var  carSchema = new mongoose.Schema({
	name: String,
	model: String,
	year: Number
});


// WE TAKE THE CAT SCHEMA AND COMPILE IT TO AN OBJECT AND WE CAN USE VARIOUS METHODS BASED ON THIS MODEL // 
var Car = mongoose.model("Car",carSchema);

//adding a new car to the database

var ford = new Car({
	name: "Ford",
	model: "Ranger",
	year: 2001
});

// CALLBACK FUNCTION - JS TAKES TIME TO COMMUNCATE WITH save() method or other methods
// ford.save(function(err,car){ //error parameters if something went wrong and couldn't add save the object to the db //
// 	if(err) {
// 		console.log("Internet Connection Lost!");
// 	} else { // if all is well, object is created
// 		console.log("Successfully created new card Ford!");
// 		console.log(car);
// 	}
// });

// ANOTHER METHOD TO CREATE AND SAVE AN ENTRY IN THE DATABASE //
Car.create({
	name: "Ferrari",
	model: "Spider",
	year: 2010,
}, function(err,car){
	if (err){
		console.log(err);
	} else {
		console.log(car);
	}
});

Car.create({
name: "Lamborghini",
	model: "Diablo",
	year: 2011,
}, function(err,car){
	if (err){
		console.log(err);
	} else {
		console.log(car);
	}
});

// retreive all cats from the DB and console.log each one

Car.find({},function(err,cars){
	if(err){
		console.log("OH NO! ERROR!");
	} else {
		console.log("ALL THE CARS.....");
		console.log("cars");
	}
});

