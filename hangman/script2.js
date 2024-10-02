let fiveLetterWords = ["about", "above", "abuse", "actor", "admit"];
let sixLetterWords = ["accept", "across", "acting", "action", "active"];
let sevenLetterWords = ["abandon", "ability", "account", "advance", "against"];
let eightLetterWords = ["absolute", "academic", "accepted", "accident", "activate"];

let correctWord, correctChars = [], tries = 0, level = 1;

function selectWordForLevel(level) {
    let wordList;
    switch(level) {
        case 1:
            wordList = fiveLetterWords;
            break;
        case 2:
            wordList = sixLetterWords;
            break;
        case 3:
            wordList = sevenLetterWords;
            break;
        case 4:
            wordList = eightLetterWords;
            break;
        default:
            showPopup("You've completed all levels!");
            return;
    }
    
    let randomIndex = Math.floor(Math.random() * wordList.length);
    correctWord = wordList[randomIndex];
    correctChars = correctWord.split('');
    document.getElementById("wordLengthDisplay").textContent = `The word has ${correctWord.length} letters.`;
    displayUnderscores(correctWord.length);
}

function displayUnderscores(length) {
    const display = document.getElementById('letterDisplay');
    display.innerHTML = '';
    for (let i = 0; i < length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = '_'; // Underscore for hidden letters
        letterSpan.className = 'letter';
        display.appendChild(letterSpan);
    }
}

document.getElementById('wordleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const singleLetter = document.getElementById('singleLetterInput').value.toLowerCase();
    const fullWordGuess = document.getElementById('fullWordInput').value.toLowerCase();

    if (singleLetter && !fullWordGuess) {
        handleSingleLetterGuess(singleLetter);
    } else if (fullWordGuess && !singleLetter) {
        handleFullWordGuess(fullWordGuess);
    }
});

function handleSingleLetterGuess(letter) {
    let letterFound = false;
    const letters = document.querySelectorAll('.letter');
    
    correctChars.forEach((char, index) => {
        if (char === letter) {
            letters[index].textContent = letter; // Fill correct letters
            letters[index].classList.add('correct');
            letterFound = true;
        }
    });

    if (!letterFound) {
        tries++;
        addTryToHistory(letter, false);
    } else {
        addTryToHistory(letter, true);
    }

    document.getElementById('singleLetterInput').value = ''; // Clear input field
}

function handleFullWordGuess(guess) {
    if (guess === correctWord) {
        showPopup("Congratulations! You've guessed the word!");
        resetGameState();
        selectWordForLevel(++level);
    } else {
        tries++;
        addTryToHistory(guess, false);
        resetUnfilledLetters(); 
        shakeDisplay(); 
    }

    document.getElementById('fullWordInput').value = ''; // Clear input field
}

function resetUnfilledLetters() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        if (letter.textContent === '_') {
            letter.textContent = '_'; 
        }
    });
}

function addTryToHistory(guess, isCorrect) {
    const listOfWords = document.querySelector('.listofwords');
    const newTry = document.createElement('li');
    newTry.className = `try${tries}`;

    guess.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.color = isCorrect ? 'green' : 'red';
        newTry.appendChild(charSpan);
    });

    listOfWords.appendChild(newTry);
}

function shakeDisplay() {
    const display = document.getElementById('letterDisplay');
    display.classList.add('shake');
    setTimeout(() => display.classList.remove('shake'), 500); 
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.add('active');

    setTimeout(() => {
        popup.classList.remove('active');
    }, 3000); 
}

function resetGameState() {
    tries = 0;
    document.querySelector('.listofwords').innerHTML = ''; 
    resetUnfilledLetters(); 
}

selectWordForLevel(level);
