
//Set initial variables, with random number generated
var $number = Math.floor((Math.random()*100) + 1);
var $guessCount = 0;
var $guess;
var $previousGuess = undefined;

//Create a new game
$newGame = function() {

		//Takes user input and evaluates the guess, keeping count of # of guesses
		$("#submit").click(function(){
			if($guessCount < 4){
				$guess = $("#userGuess").val();
				$evaluateGuess($guess);
				if($guessCount === 4 && $guess != $number){
					$outputMessage("You've reached the end of your guessing limit.");
					$outputMessage2("...that's the end of the game...")
				}
			}
			$("#userGuess").val('');
		});

		//Activates the click function when enter is pressed
		$("#userGuess").keypress(function(e){
			if(e.which === 13){
				$("#submit").click();
			}
		});

		//Button to reveal answer
		$("#hint").click(function(){
			$outputMessage("The number is " + $number);
			$outputMessage2("...try guessing next time!");
		});

		//Button to reset the game
		$("#again").click(function(){
			$resetGame();
		});

		//Evaluates guess by checking if it's a number, repeat, or valid guess
		//and giving input to the user accordingly.
		$evaluateGuess = function(guess){
			if($.isNumeric(guess) && guess <= 100 & guess > 0){
				if($checkRepeat(guess)){
					$outputMessage("You already guessed that number!");
					$outputMessage2("...Try again?");
				}
				else{
					$hotOrCold(guess);
					$guessCount++;
				}
			}
			else{
				$outputMessage("Please enter a number between 1 and 100!")
				$outputMessage2("You won't win by being cheeky!");
			}
		};

		//Checks whether user guess is correct or,
		//if its hot or cold,
		//or hotter or colder based on previous input.
		$hotOrCold = function(guess){
			if(guess == $number){
				$success();
			}
			else if($previousGuess == undefined){
				$compareToNumber(guess);
			}
			else{
				$compareToGuesses(guess);
				$compareToNumber(guess);	
			}	
		};

		//Compares whether guess is hot or cold and generates visual output for user.
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

			//Stores the guessed number for comparison with future guesses.
			$previousGuess = $("table tr").children().last().html()
		};

		//Compares whether guess is hotter or colder based on
		//a previous guess.
		$compareToGuesses = function(guess){

			var diffA = Math.abs($number - $previousGuess);
			var diffB = Math.abs($number - guess);

			if(diffB > diffA){
				$outputMessage2("(...you're getting colder since your last guess...)");
			}
			else {
				$outputMessage2("(...you're getting warmer since your last guess...)");
			}
		};

		//Outputs message to first para of jumbotron
		$outputMessage = function(message){
				if($(".successMessage").is(':visible')){
					$(".successMessage").text(message);
				}
				else {
					$(".successMessage").show();
					$(".successMessage").text(message);
				}
		};	

		//Outputs message to second para of jumbotron
		$outputMessage2 = function(message){
			if($(".hotCold").is(':visible')){
				$(".hotCold").text(message);
			}
			else{
				$(".hotCold").show();
				$(".hotCold").text(message);
			}			
		};


		//Generates visual output for user on the jumbotron and a table.
		$outputGenerator = function(screenMessage, message, guess){
			$outputMessage(screenMessage);
			$createUserTable(guess, message);
		};


		//Adds latest user guess to a table and reveals to user
		$createUserTable = function(guess, result){
			if($(".guessTable").is(':visible')){
				$(".guessTable").append("<tr><td>" + result+ "</td><td>" + guess + "</td></tr>");
			}
			else{
				$(".guessTable").fadeIn();
				$(".guessTable").append("<tr><td>" + result+ "</td><td>" + guess + "</td></tr>");
			}			
		};

		//Checks for repeat guesses
		$checkRepeat = function(guess){
			var isTrue = false
			$("td").each(function(){
					if($(this).html() == guess){
						isTrue = true;
					}
			});
			return isTrue;
		};

		//Animation to be activated when guess is correct
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

		//Resets the game
		$resetGame = function(){
			$number = Math.floor((Math.random()*100) + 1);
			$guessCount = 0;
			$previousGuess = undefined;
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

