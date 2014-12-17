var secretNumber, guessedNumber;
var oldGuesses = [];
var randomizer = function(){
	return Math.floor((Math.random() * 100) + 1);
};
var isHotter = function(oldNum, newNum, winNum){
	oldDif = Math.abs(winNum-oldNum);
	newDif = Math.abs(winNum-newNum);
	if(newDif < oldDif){
		return true;
	}else{
		return false;
	}
};
$(document).ready(function(){

	//a random number is generated by the computer
	secretNumber = randomizer();
	//on click of guess button
	$(".guess").on("click", function(){
		//stores users guess
		guessedNumber = +$(".guessInput").val();
		
		//verifies that guessedNumber is a valid guess between 1-100
		if(isNaN(guessedNumber)){
			alert("your guess was not a valid number");
		}
		if(guessedNumber < 0|| guessedNumber > 100){
			alert("please pick a number between 1 and 100");
		}
		
		//checks to see if guessedNumber is a winner
		if(guessedNumber===secretNumber){
			alert("you won!");
		}
		//if guessedNumber isn't a winner:
		else{
			//keeps track of the guessedNumber
			oldGuesses.push(guessedNumber);
			//if this is the first guess, prompt to try again
			if(oldGuesses.length < 2){
				alert("try again");
			}
			//checks to see if hotter or colder
			else if(isHotter(oldGuesses[oldGuesses.length-2],oldGuesses[oldGuesses.length-1],secretNumber)){
				alert("getting hotter");
			}
			else{
				alert("getting colder");
			}
		}
	});
});
