var request = require('request');
request("http://jsonplaceholder.typicode.com/users/1",function(error,response,body){
	if(!error && response.statusCode == 200) {
		var parsedData = JSON.parse(body);
		console.log(parsedData.name + " " + "lives in " +parsedData.address.city);
	}
});