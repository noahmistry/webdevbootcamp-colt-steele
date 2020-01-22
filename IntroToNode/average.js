function average(testScores) {
	//add all the scores
	var sum = 0;
	testScores.forEach(function(score){
		sum += score;	
	});
	// get average by dividing scores with sum of scores
		var average = sum/testScores.length;
	// round number
	return Math.round(average);
}

var scores = [29,39,59,28,14,36,90];
console.log(average(scores));
var scores2 = [82,34,62,37,12,74,25];
console.log(average(scores2));