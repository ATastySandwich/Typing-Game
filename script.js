


const top1000Words = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me"];




// Getting the DOM elements to make accessing them easier
const quoteBox = document.getElementById("quoteBox");
const typingBox = document.getElementById("typingBox");
const timer = document.getElementById("timer");
const accuracyElement = document.getElementById("accuracy");


// Game state logic, like if the game is running or not
let totalCharsTyped = 0;
let incorrectChars = new Set();
let timerInterval;
let isGameActive = false;

// This starts the game apon initially loading it up
function initGame() {
    generateString(top1000Words); // Creates the string for the user to type
    typingBox.value = ''; // Clears the typing box value so that it is not obstructerd 
    typingBox.focus(); // Auto focuses the type box for the user 
    startTimer();
}

// Timer logic
function startTimer() {
    clearInterval(timerInterval);
    isGameActive = true; // Sets the running state of the game to true
    totalCharsTyped = 0; // Resets the typed chars to 0 for the new game 
    incorrectChars = new Set(); // Assigns the incorrectly typed number 0
    accuracyElement.innerText = "100%";
    
    let timeLeft = 60;
    updateTimerDisplay(timeLeft);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isGameActive = false;
            typingBox.blur();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    timer.innerText = `${seconds}s`;
}

// logic for the game
typingBox.addEventListener('input', (e) => { // adding an event listener to the typing box to detect imput
    if (!isGameActive) { // if the game is not active it will start the game
        initGame();
        return;
    }
    
    // takes all the chars in the sentence and adds it to a varialble for comparison
    const arraySentence = quoteBox.querySelectorAll('span');
    const value = typingBox.value.split(''); // takes the users sentence ands it to a variable for comparison
    let correct = true;

    // this checks to see if it was a backspace, if it wasnt it will add to the number of key strokes
    if (e.inputType !== "deleteContentBackward") {
        totalCharsTyped++;
    }

    // Logic for correctly or incorrectly typed letters
    arraySentence.forEach((characterSpan, index) => {
        const character = value[index];
        
        if (!character) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        } 
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } 
        else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
            incorrectChars.add(totalCharsTyped);
        }
    });

    checkAccuracy(totalCharsTyped, incorrectChars.size);
    
    if (correct) {
        // Reset for new sentence
        typingBox.value = '';
        generateString(top1000Words);
    }
});

// This checks for the accuracy of the user
function checkAccuracy(totalTyped, totalIncorrect) {

    // Takes in the total typed keystrokes(-backspaces) and the incorrect key strokes
    if (totalTyped === 0) {
        accuracyElement.innerText = "100%";
        return;
    }
    const accuracy = ((totalTyped - totalIncorrect) / totalTyped) * 100;
    accuracyElement.innerText = accuracy.toFixed(1) + "%";
}


// This function gets random words from the array and populates the text field
function generateString(words) {
    quoteBox.innerHTML = '';
    let result = [];

    // Chooses a number between 10 and 25 for the sentence length
    let j = Math.floor(Math.random() * 16) + 10; 

    for (let i = 0; i <= j; i++) {
        let x = Math.floor((Math.random() * words.length));
        result.push(words[x]);
    }

    // Splits the sentence into a string of words, each word is seperated by a space
    let string = result.join(" ");

    // This takes every char from the string and creates a span element for that char
    string.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteBox.appendChild(characterSpan);
    });
}


initGame();