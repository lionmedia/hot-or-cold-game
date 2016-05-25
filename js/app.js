
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;

	/*--- New Game ---*/
	newGame();

	/*--- On Submit ---*/
	$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemp(Math.abs(randomNumber - userChoice));
			};
		} else {
			setFeedback("Congratulations! You won on the first try.");
			//disableGuess();
		};
  	});

  	$("form").submit(function(){
		do {
			userChoice = getChoice();
			guessCount++;
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessFlag = checkTemp(Math.abs(randomNumber - userChoice));
			};
		} while(guessFlag);

  	});

  	/*--- Creat new game on click ---*/
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

	/*--- Create a New Game! ---*/
	function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}

	/*--- Generate Random Number ---*/
	var randomNumber = generateNumber();
	var guessFlag = true;
	var guessCount = 0;
	var userChoice;

	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
	}
	
	/*--- Set focus to the inputbox ---*/
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	/*--- Clear the text box ---*/
	function clearText() {
		$('#userGuess').val('');
	}

	/*--- Set the guess count ---*/
	function setCount(count) {
		$('#count').text(guessCount);
	}


	/*--- Check if the User's Guess meets the rules---*/
	function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("No luck! Only numbers are accepted.");
			return true;
		} else if (userChoice < 1 || userChoice > 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userChoice) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

	/*--- Check temp of Guess ---*/
	function checkTemp(guessDifference) {

		if (guessDifference == 0) {
			setFeedback("Good job! You guessed right!");
			found = true;
			return false;
		} else if (guessDifference <= 5) {
			setFeedback("Your guess is VERY hot!");
			return true;
		} else if (guessDifference <= 10){
			setFeedback("Your guess is getting hot!");
			return true;
		} else if (guessDifference>=10 && guessDifference <= 20) {
			setFeedback("Your guess is getting warm!");
			return true;
		} else if (guessDifference>=20 && guessDifference <= 30) {
			setFeedback("Your guess is getting cold!");
			return true;
		} else if (guessDifference>=30 && guessDifference <= 40) {
			setFeedback("Your guess is VERY cold!");
			return true;
		} else {
			setFeedback("Your guess is FREEZING cold!");
			return true;
		}

	}

	/*--- Set feedback ---*/
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

	function disableGuess() {
    	document.getElementById("guessButton").disabled = 'true';
    	setFeedback("Submit disabled");
	}

});

