/**
 * Author: Yash Jain - 300245571
 * Author: Oliver Byl - 300168571
 * 
 * This main.js file contains the JavaScript functionality for the index.html page
 * It creates new elements, functions, checks the state of the game, and allows for overall wordle functionality
 */

let wordleLetters = 5; //wordle words contain only 5 letters
let numberOfGuesses = 6; //wordle word must be guessed in 6 or less attempts
const allPossibleLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //all possible letter inputs
const allOtherPossibleInputs = ["Enter", "Backspace"]; //all other possible inputs (Enter or Backspace)

let stateOfGame = true; //tracks the state of the game, true for ongoing, false for ended
let usersCurrentRow = 1; //tracks the row the user is currently on
let usersCurrentColumn = 1; //tracks the column the user is currently on
let currentLetter; //tracks the current letter the user is on
let counter = 1; //a counter for the specific letter (used in grabbing ID's)
let attemptsAtEnter = [] //counter to ensure correct enter functionality

const squareParent = document.getElementById("game-board"); //constant used to nest all square letters inside the parent element (comes from HTML page)
const squareClass = "squares-for-letters"; //constant variable used for the class name for each letter square (comes from CSS styling)

const letterClass = "letter" //constant variable used for the letter class (comes from CSS styling)
var letterIdentity = "letter" //variable used to track the unique letter in the game (from 1-30)

let answer = document.getElementById("reveal-answer");
let word = "AUDIO";

//on window load event call the function to create the squares for the letters and track key inputs from user
window.onload = function() {
    createSquaresForLetters();
    document.addEventListener("keyup", userFunctionality);
}

//function to create squares for the letters
function createSquaresForLetters() {
    /**
     * No parameters
     * Calls the createLetters(squareID, uniqueLetterNumber)
     * 
     * Loops through 30 times (because 30 letters) creating 30 divs which represent the squares
     * Assigns the class name of "squares-for-letters" to each div for styling
     * Associates each square with an ID of "square" + position.toString() which represents the square number
     * Appends created div to the parent which is the div with an id of "game-board"
     * 
     * Calls createLetters(squareID, uniqueLetterNumber) and passes the parentElementID name (which is the square) + currentSquare
     */
    
    for (let position = 1; position < (wordleLetters * numberOfGuesses) + 1; position++) {
        let square = document.createElement("div");
        square.className = squareClass;
        square.id = "square" + position.toString();
        squareParent.appendChild(square);
        createLetters(square.id, position.toString())
    }
}

//function to create the letters
function createLetters(squareID, uniqueLetterNumber) {
    /**
     * String : squareID = Holds the ID of the parent element in which the letter will be (the associated square)
     * int : uniqueLetterNumber = Holds the NUMBER of the letters in the board to associate the ID's with (1-30 letters)
     * 
     * All of this is done 30 times because of the loop:
     * Creates the paragraph to allow for regular text
     * Associates the class name of letter to each <p> tag for styling
     * Associates each letter with an ID of "letter" + uniqueLetterNumber which represents the unique letters from 1-30
     * Appends each created letter to the parent which is the square (div element) with an id of squareID ["square" + position.toString()]
     */

    let letter = document.createElement("p");
    letter.className = letterClass;
    letter.id = letterIdentity + uniqueLetterNumber;

    letter.innerHTML = "";

    letterParent = document.getElementById(squareID);
    letterParent.appendChild(letter);
}

//function to check for user inputs such as letter clicked, enter or backspace
function userFunctionality(keyPressed) {
    /**
     * Uses the code of the key buttons pressed to track users actions and provide functionality based off of it
     */

    //if game is ongoing
    if (stateOfGame) {
        if (allPossibleLetters.includes(keyPressed.key.toLowerCase())) {
            if (usersCurrentColumn < wordleLetters + 1) {
                currentLetter = document.getElementById(letterIdentity + counter.toString());
                if (currentLetter.innerHTML == "") {
                    currentLetter.innerHTML = keyPressed.key.toUpperCase();
                    counter = counter + 1;
                    usersCurrentColumn = usersCurrentColumn + 1;
                }
            }
        }

        if (allOtherPossibleInputs.includes(keyPressed.key)) {
            if (keyPressed.key == "Enter" && (counter - 1) % 5 == 0 && !attemptsAtEnter.includes(counter - 1)) {
                validate();
                usersCurrentRow = usersCurrentRow + 1;
                usersCurrentColumn = 1;
                attemptsAtEnter.push(counter - 1);
            }

            if (keyPressed.key == "Backspace") {
                if (1 < usersCurrentColumn && usersCurrentColumn <= wordleLetters + 1) {
                    counter = counter - 1;
                    usersCurrentColumn = usersCurrentColumn - 1;
                }
                currentLetter = document.getElementById(letterIdentity + counter.toString());
                currentLetter.innerHTML = "";

            }
        }

        if (usersCurrentRow == numberOfGuesses + 1) {
            stateOfGame = false;
            answer.innerHTML = "ANSWER: " + word;
        }
    }

    //if the game ended
    else if (!stateOfGame) {
        return;
    }
}

//check for correct and wrong letters as well letters that are in the word but not in the correct spot
function validate() {
    let correctOccurences = 0;
    
    for (let index = 0; index < wordleLetters; index++) {
        let currentBox = document.getElementById("square" + (counter - 5 + index).toString());
        currentLetter = document.getElementById(letterIdentity + (counter - 5 + index).toString());
        let checkLetterText = currentLetter.innerHTML;

        if (word[index] == checkLetterText) {
            correctOccurences = correctOccurences + 1;
            currentBox.classList.add("correct");
        }

        else if(word.includes(checkLetterText)) {
            currentBox.classList.add("incorrectSpot");
        }

        else {
            currentBox.classList.add("incorrect");
        }

        if (correctOccurences == wordleLetters) {
            stateOfGame = false;
            answer.innerHTML = "ANSWER: " + word;
        }
    }
}