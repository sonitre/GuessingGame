// Project Requirements:

// When a game begins, there should be a random number generated between 1-100.
// The user should have an input field where they can submit a guess.
// After the user submits a guess, indicate whether their guess is 'hot' or 'cold'. Let the user know if they need to guess higher or lower.
// Allow the user to guess only a certain amount of times. When they run out of guesses let them know the game is over.
// Feel free to use prompts to get user input on your first version.
// For the final version of your project, you'll need to create an HTML-based interface for getting user inputs and giving feedback on guesses.
// Validate inputs that they are real numbers between 1-100.
// Create a new game button that resets the game.
// Store all of the guesses and create a way to check if the guess is a repeat.
// Track the user's previous guess. Let them know if they are getting “hotter” or “colder” based on their previous guess.
// Create a button that provides the answer (Give me a Hint).
// Submit the guess by pressing enter or clicking the submit button.
// After a user guesses a number keep a visual list of Hot and Cold answers that the user can see.
// Change the background color, add an image, or do something creative when the user guesses the correct answer.

//Objectives

//1. Generate a random number between 1-100 and store in a variable
//2. Allow the user to submit a guess
	//2.1 Allow them to submit via pressing enter or clicking submit
//3. Evaluate the guess
	//3.1 Validate inputs to make sure they are real numbers between 1-100
	//3.2 Store input and check whether user has already made that guess
		//3.2.1 Keep a visual table/image of previous guesses
	//3.3 Project information (hot/cold or higher/lower or "hotter/colder" based on previous guesses) to the screen using a modal?
	//3.4 Evaluate whether user has reached guessing limit
//4. Game
	//4.1 Be able to tell user that the game is over
	//4.2 Greate a new game button that resets the game
	//4.3 Create a button that provides the answer (give me a hint)
	//4.3 Create a success HTML event

	//Notes:
	// Fix issue where you need to submit an extra time before end message

var $number = Math.floor((Math.random()*100) + 1);
var $guessCount = 0;
var $guess;
var $lastGuess = undefined;


$newGame = function() {

		$("#submit").click(function(){
			//while loop here??
			if($guessCount < 4){
				$guess = $("#userGuess").val();
				$evaluateGuess($guess);
				$guessCount++;
				if($guessCount === 4 && $guess != $number){
					$outputMessage("You've reached the end of your guessing limit.");
					$outputMessage2("...that's the end of the game...")
				}
			}
			$("#userGuess").val('');
		});

		$("#hint").click(function(){
			$outputMessage("The number is " + $number);
			$outputMessage2("...try guessing next time!");
		});

		$("#again").click(function(){
			$resetGame();
		});

		$("#userGuess").keypress(function(e){
			if(e.which === 13){
				$("#submit").click();
			}
		});


		$evaluateGuess = function(guess){
			//shouldn't increment guess when guess isNaN/ shouldn't show previous logged messages
			if($.isNumeric(guess) && guess <= 100 & guess > 0){
				if($checkRepeat(guess)){
					$outputMessage("You already guessed that number! Try again.");
					$outputMessage2("...you just lost a guess for that!");
				}
				else{
					$hotOrCold(guess);
				}
			}
			else{
				$outputMessage("Please enter a number between 1 and 100!")
			}
		};

		$outputMessage = function(message){
				$(".successMessage").show();
				$(".successMessage").text(message);
		};	

		$outputMessage2 = function(message){
			$(".hotCold").show();
			$(".hotCold").text(message);
		}

		$hotOrCold = function(guess){
			if(guess == $number){
				$success();
			}
			else if($lastGuess == undefined){
				$compareToNumber(guess);
			}
			else{
				$compareToGuesses(guess);
				$compareToNumber(guess);	
			}	
		};

		$compareToNumber = function(guess){
			if(guess > $number && guess < $number + 25){
				$outputGenerator("You're hot! Guess lower.", "Hot. Go lower.", guess);
			}
			else if (guess < $number && guess > $number - 25){
				$outputGenerator("You're hot! Guess higher.","Hot. Go higher.", guess);
			}
			else if(guess > $number + 25){
				$outputGenerator("You're ice cold! Guess lower","Ice cold. Go lower.", guess);
			}
			else if(guess < $number - 25){
				$outputGenerator("You're ice cold! Guess higher", "Ice cold. Go higher.", guess);
			}
			$lastGuess = $("table tr").children().last().html()
		}

		$compareToGuesses = function(guess){

			var diffA = Math.abs($number - $lastGuess);
			var diffB = Math.abs($number - guess);

			if(diffB > diffA){
				$outputMessage2("(...you're getting colder since your last guess...)");
			}
			else {
				$outputMessage2("(...you're getting warmer since your last guess...)");
			}
		};

		//don't need to fade-in the table everytime??
		$createUserTable = function(guess, result){
			$(".guessTable").fadeIn();
			$(".guessTable").append("<tr><td>" + result+ "</td><td>" + guess + "</td></tr>");
		};


		$outputGenerator = function(screenMessage, message, guess){
			$outputMessage(screenMessage);
			$createUserTable(guess, message);
		};


		$checkRepeat = function(guess){
			var isTrue = false
			$("td").each(function(){
					if($(this).html() == guess){
						isTrue = true;
					}
			});
			return isTrue;
		};

		//use fadein method here
		$success = function(){
			$(".jumbotron").addClass("success");

			$(".jumbotron").animate({opacity: 0.4}, 500);
			$("body").animate({opacity: 0.4}, 500, function(){
				$(".jumbotron").animate({opacity: 1.0}, 500);
				$("body").animate({opacity: 1.0}, 500);
			});

			$outputMessage("YOU GUESSED IT!");
			$outputMessage2("click to play again, you winner!");
			$(".guessTable").hide();
			$("#userGuess").val('');
		};

		$resetGame = function(){
			$number = Math.floor((Math.random()*100) + 1);
			$guessCount = 0;
			$lastGuess = undefined;
			$(".successMessage").hide();
			$(".hotCold").hide();
			$("#userGuess").val('');
			$(".guessTable").find('td').remove();
			$(".guessTable").hide();
			if($(".jumbotron").hasClass("success")){
				$(".jumbotron").removeClass("success");
			}
	};
}

$newGame();

