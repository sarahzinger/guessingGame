var secretNumber, guessedNumber, oldGuesses;
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
var resetAlerts = function(){
	$(".feedback").removeClass("alert-success");
	$(".feedback").removeClass("alert-warning");
	$(".feedback").removeClass("alert-info");
	$(".feedback").removeClass("alert-danger");
};
var newGame = function(){
	//clears form and feedback box
	$(".guessInput").val("");
	resetAlerts();
	//unhides stuff that was previously hidden
	$(".feedback").show();
	$(".row").show();
	$('.hint').show();
	//resets instructions
	$("p").text("I've picked a number! What do you think it is?");
	//hides play again button and previous guesses box
	$(".playAgain").hide();
	$(".prevGuess").hide();
	//welcomes user
	$(".feedback").addClass("alert-success");
	$(".feedback").text("Welcome! Pick a number between 1 and 100");
	//a random number is generated by the computer
	secretNumber = randomizer();
	//resets guessCount and oldGuesses
	oldGuesses = [];
};
$(document).ready(function(){
	//new game automatically starts when site loads
	newGame();

	//on click of play again a new game starts
	$(".playAgain").on("click", function(){
		newGame();
	});

	//on click of hint button a hint is shown
	$(".hint").on("click", function(){

		var hintHelper= randomizer();
		var hintNum = secretNumber-hintHelper;
		$(".feedback").text("If you added "+hintHelper+" and "+hintNum+" you would get my secret number");
	});
	//on click of guess button
	$(".guess").on("click", function(){

		//checks to see if user has used up all guesses yet
		//if it has it won't allow you to guess more and offers to play again
		if(oldGuesses.length > 8){
			$(".feedback").addClass("alert-warning");
			$(".feedback").hide();
			$(".row").hide();
			$(".hint").hide();
			$(".playAgain").show();
			$("p").text("Oh no! You ran out of guesses. I was thinking of "+secretNumber);
		}
	
		//stores users guess
		guessedNumber = +$(".guessInput").val();

		//keeps track of the guessedNumber and shows it to user
		oldGuesses.push(guessedNumber);
		$(".prevGuess").text("You're allowed 10 guesses. You've guessed "+oldGuesses.length+" so far: "+oldGuesses).show();
		
		//resets form and alert colors
		resetAlerts();
		$(".guessInput").val("");

		//verifies that guessedNumber is a valid guess between 1-100
		if(isNaN(guessedNumber)){
			$(".feedback").addClass("alert-warning");
			$(".feedback").text(":( That wasn't a valid number");
			
		} else if(guessedNumber < 0 || guessedNumber > 100){
			$(".feedback").addClass("alert-warning");
			$(".feedback").text("That number wasn't between 1-100, try again!");
		
		}
		//checks to see if guessedNumber is a winner
		else if(guessedNumber===secretNumber){
			$(".feedback").addClass("alert-success");
			$(".feedback").text("You won! And it only took you "+oldGuesses.length+" tries!");
			$(".hint").hide();
			//shows play again button
			$(".playAgain").show();
		}
		//if guessedNumber isn't a winner:
		else{
			//if this is the first guess, prompt to try again
			if(oldGuesses.length < 2){
				$(".feedback").addClass("alert-warning");
				$(".feedback").text("A good first guess, but try again");
			
			}
			//checks to see if hotter or colder
			else if(isHotter(oldGuesses[oldGuesses.length-2],oldGuesses[oldGuesses.length-1],secretNumber)){
				$(".feedback").addClass("alert-danger");
				$(".feedback").text("****Getting Warmer****");
			}
			else{
				resetAlerts();
				$(".feedback").addClass("alert-info");
				$(".feedback").text("Brrrr.... you're colder");
			}
		}
	});
});
