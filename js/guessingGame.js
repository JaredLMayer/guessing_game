//* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
/* **** Guessing Game Functions **** */
var previousGuesses = [];
// Generate the Winning Number
var winningNumber = generateWinningNumber();

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
};

var playersGuess = 0;
// Fetch the Players Guess
function playersGuessSubmission() {
    playersGuess = parseInt(document.getElementById('guess').value);
    $('#message').text("");
    checkGuess();
    $('#guessInfoMessage').text("");
    lowerOrHigher();
};
// Determine if the next guess should be a lower or higher number



function lowerOrHigher() {
    // add code here
    var diff = Math.abs(winningNumber - playersGuess)
    if (diff <= 5 && playersGuess !== winningNumber) {
        $('#guessInfoMessage').text("You are within 5 digits! HOT!")
    } else if (playersGuess > winningNumber && diff < 20) {
        $('#guessInfoMessage').text("You're warm! Your guess is higher than the answer, but less than 20 digits away. Getting warmer!");
    } else if (playersGuess < winningNumber && diff < 20) {
        $('#guessInfoMessage').text("You're warm! Your guess is lower than the answer, but less than 20 digits away. Getting warmer!");
    }
};

function hintMessage() {
    var dud1 = Math.ceil(Math.random() * 100);
    var dud2 = Math.ceil(Math.random() * 100);
    var message = "The winning number is one of the following:   " + dud1 + " " + winningNumber + " " + dud2;
    return message;
};

//Add Congratulations Animation

function runIt() {
    $('#message').animate({
        opacity: '1'
    }, 1000);
    $('#message').animate({
        opacity: '0.5'
    }, 1000, runIt);
};
// Check if the Player's Guess is the winning number 
function checkGuess() {
    //check if duplicate
    var duplicate = false;

    if (playersGuess == winningNumber) {
        $('#message').text("Congratulations! You Won!");
        $('#message').css("color", "green");
        $('#message').css("font-size", "60pt");
        runIt();
        $('#winner-loser').text("WINNER!");
        $('#confetti').show();
        //        $('#guess').prop("disabled", true);
        //        $('#submit-btn').prop("disabled", true);
    } else if (playersGuess < 1 || playersGuess > 100 || isNaN(playersGuess)) {
        $('#message').text("That is not a valid entry. Please provide a number between 1-100");
    } else if (playersGuess !== winningNumber && previousGuesses.length < 10) {
        for (var i = 0; i < previousGuesses.length; i++) {
            if (playersGuess == previousGuesses[i]) {
                $('#message').text("Insanity: doing the same thing over and over again and expecting different results. -Albert Einstein.\n Please enter a unique guess :)");
                duplicate = true
            }
        };
        if (duplicate == false) {
            previousGuesses.push(playersGuess);
            guessCounter();
            if (playersGuess !== winningNumber && previousGuesses.length == 10) {
                $('#message').text("Sorry, you ran out of turns. Play Again!");
                $('#winner-loser').text("Sorry. You Lost.");
                //                $('#guess').prop("disabled", true);
                //                $('#submit-btn').prop("disabled", true);

            } else {
                $('#message').text("Try Again.");
            }

        }

    }
};

function guessCounter() {
    var number = previousGuesses.length;
    return number + "/10" + "\n Attempted Guesses: " + previousGuesses;

};


//// Create a provide hint button that provides additional clues to the "Player"
//
//function provideHint() {
//    // add code here
//}
//
//// Allow the "Player" to Play Again
//
//function playAgain() {
//    // add code here
//}