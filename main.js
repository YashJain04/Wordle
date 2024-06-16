/**
 * Author: Yash Jain - 300245571
 * Author: Oliver Byl - 300168571
 * 
 * This main.js file contains the JavaScript functionality for the index.html page
 * It creates new elements, functions, checks the state of the game, and allows for overall wordle functionality
 */

let wordleLetters = 5; //wordle words contain only 5 letters
let numberOfGuesses = 6; //wordle word must be guessed in 6 or less attempts

let stateOfGame = false; //tracks the state of the game

const squareParent = document.getElementById("game-board"); //constant used to nest all square letters inside the parent element (comes from HTML page)
const squareClass = "squares-for-letters"; //constant variable used for the class name for each letter square (comes from CSS styling)

const letterClass = "letter" //constant variable used for the letter class (comes from CSS styling)
var letterIdentity = "letter" //variable used to track the unique letter in the game (from 1-30)

//on window load event call the function to create the squares for the letters
window.onload = function() {
    createSquaresForLetters();
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

    letter.innerHTML = "F";

    letterParent = document.getElementById(squareID);
    letterParent.appendChild(letter);
}