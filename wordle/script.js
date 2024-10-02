let eightLetterWords = ["absolute", "academic", "accepted", "accident", "according", "accurate", "achieved", "activate", "adventure",
    "afternoon", "algorithm", "allegation", "alongside", "alternate", "ambulance", "ambiguous", "anonymous", "appliance", "apparent",
    "appetite", "applying", "appointed", "appreciate", "architect", "arguments", "assignment", "associate", "assuming", "athletes",
    "attitudes", "authority", "automatic", "available", "awareness", "beautiful", "beginning", "behaviour", "background", "ballistic",
    "beautiful", "beginning", "boundary", "boyfriend", "breakdown", "breathing", "brightest", "broadway", "calculate", "candidate",
    "carefully", "cathedral", "celebrate", "champion", "character", "chemical", "childhood", "christian", "civilian", "classroom",
    "clearly", "clinical", "clothing", "colonial", "colorful", "commence", "commerce", "complain", "complete", "composed",
    "compound", "computer", "conflict", "congress", "constant", "consumer", "continue", "contract", "convinced", "corporate",
    "creative", "criminal", "critical", "crossing", "daughter", "database", "dedicated", "delivery",
    "democrat", "describe", "designer", "detailed", "diameter", "direction", "directly", "disabled", "disaster", "discount"
];

let sevenLetterWords = ["abandon", "ability", "account", "accurate", "achieve", "acquire", "address", "advance", "against", "airline",
    "airport", "alcohol", "already", "although", "amazing", "analyst", "ancient", "another", "anxiety", "anybody",
    "apology", "appeal", "applied", "arrival", "article", "athlete", "attempt", "average", "balance", "battery",
    "bearing", "believe", "benefit", "billion", "blanket", "breathe", "briefly", "brother", "brought", "builder",
    "capture", "careful", "carrier", "central", "century", "certain", "chamber", "channel", "chapter", "charity",
    "clothes", "college", "combine", "command", "comment", "company", "compare", "complex", "compose", "concept",
    "conduct", "confirm", "confuse", "connect", "consider", "contact", "contain", "content", "contest", "control",
    "convince", "courage", "creation", "creative", "creature", "criminal", "critical", "deliver", "demand",
    "deposit", "desktop", "despite", "destroy", "develop", "diamond", "distant", "diverse", "divorce", "document",
    "domestic", "dramatic", "duration", "dynamic", "eastern", "economy", "educate", "effect", "effort", "eighteen"
];

let sixLetterWords = ["accept", "across", "acting", "action", "active", "advice", "advise", "affair", "affect", "afford",
    "agency", "agenda", "amount", "animal", "annual", "answer", "appeal", "appear", "artist", "aspect",
    "assess", "assign", "assist", "assume", "attack", "attend", "author", "backup", "barrel", "battle",
    "beauty", "become", "before", "behind", "belief", "beyond", "bishop", "border", "bottom", "branch",
    "breath", "bridge", "bright", "broken", "budget", "burden", "butter", "button", "camera", "carbon",
    "career", "castle", "casual", "center", "centre", "chance", "change", "charge", "choice", "choose",
    "church", "cinema", "circle", "client", "closer", "coffee", "combat", "coming", "common", "cookie",
    "copper", "corner", "county", "couple", "course", "create", "credit", "crisis", "custom", "damage",
    "danger", "dealer", "debate", "decade", "decide", "demand", "denial", "design", "desire", "detail",
    "detect", "device", "divide", "doctor", "dollar", "domain", "double", "dreams", "driver", "duty"];

let fiveLetterWords = ["about", "above", "abuse", "actor", "admit", "adult", "after", "again", "agent", "agree",
    "ahead", "alarm", "album", "alert", "alien", "allow", "alone", "along", "alter", "among",
    "anger", "angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise", "array",
    "aside", "asset", "audio", "audit", "avoid", "award", "aware", "badly", "baker", "bases",
    "basic", "basis", "beach", "began", "begin", "begun", "being", "below", "bench", "billy",
    "birth", "black", "blame", "blind", "block", "blood", "board", "boost", "bound", "brain",
    "brand", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown", "build",
    "built", "buyer", "cable", "calm", "camera", "candy", "carol", "carry", "catch", "cause",
    "chain", "chair", "chalk", "champ", "chant", "charm", "chart", "chase", "cheap", "check",
    "cheer", "chest", "chief", "child", "china", "choice", "choose", "chose", "civil", "claim"];
    var correctWord;
var correctChars = [];
var userGuess;
var guessChars = [];
var tries = 0;
var level = 1;  // Start from level 1 (5-letter word)
var yellowChars = [];
var redChars = [];
var greenChars = [];
var tryHistory = [];

function resetGameState() {
    tries = 0;
    userGuess = '';
    greenChars = [];
    yellowChars = [];
    redChars = [];
    tryHistory = [];
    clearTryHistoryFunc();
    clearAllKeyColors();
    clearPreviousGuessColors();
}

function selectWordForLevel(level) {
    let wordList;
    switch (level) {
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
            console.log("All levels completed!");
            return;
    }
    selectWord(wordList);
}

function selectWord(wordsArray) {
    let randomIndex = Math.floor(Math.random() * wordsArray.length);
    let randomWord = wordsArray[randomIndex];
    correctWord = randomWord;
    correctChars = correctWord.split(''); 
    console.log("Correct word:", correctWord); 
    document.getElementById("wordLengthDisplay").textContent = `The word has ${correctWord.length} letters.`;
}

document.getElementById("wordleForm").addEventListener('submit', function (event) {
    event.preventDefault();
    let userInputValue = document.getElementById("wordleEnter").value.toLowerCase();
    userGuess = userInputValue;
    guessChars = userGuess.split('');
    document.getElementById("wordleEnter").value = '';
    check();
});

function clearKeyColor(char) {
    const keyElement = document.querySelector(`#key${char}`);
    if (keyElement) {
        keyElement.style.backgroundColor = '';  // Reset the background color
    }
}

function check() {
    if (userGuess === correctWord) {
        console.log("Good job! You've guessed the word!");
        level++; // Advance to the next level
        if (level <= 4) {
            resetGameState();
            selectWordForLevel(level); // Select a word for the next level
        } else {
            console.log("Congratulations! You've completed all levels!");
        }
    } else {
        tries++;
        greenChars = [];
        yellowChars = [];
        redChars = [];

        // Check the user guess
        for (let i = 0; i < correctChars.length; i++) {
            if (correctChars[i] === guessChars[i]) {
                greenChars.push(guessChars[i]);
            } else if (correctChars.includes(guessChars[i])) {
                yellowChars.push(guessChars[i]);
            } else {
                redChars.push(guessChars[i]);
            }
        }
        
        tryHistory.push(userGuess);
        tryHistoryFunc();
        clearPreviousGuessColors();
        colorGreen();
        colorRed();
        colorYellow();
    }

    if (tries >= 5 && userGuess !== correctWord) {
        console.log("Sorry, you've used all your tries! The correct word was:", correctWord);
        resetGameState();
        selectWordForLevel(level);
    }
}


// Color the keys on the keyboard
function colorGreen() {
    greenChars.forEach((char) => {
        const keyElement = document.querySelector(`#key${char}`);
        if (keyElement) {
            keyElement.style.backgroundColor = 'green';
        }
    });
}

function colorRed() {
    redChars.forEach((char) => {
        const keyElement = document.querySelector(`#key${char}`);
        // Only color red if it's not green or yellow
        if (keyElement && keyElement.style.backgroundColor !== 'green' && keyElement.style.backgroundColor !== 'yellow') {
            keyElement.style.backgroundColor = 'red';
        }
    });
}

function colorYellow() {
    yellowChars.forEach((char) => {
        const keyElement = document.querySelector(`#key${char}`);
        // Only color yellow if it's not already green
        if (keyElement && keyElement.style.backgroundColor !== 'green') {
            keyElement.style.backgroundColor = 'yellow';
        }
    });
}


function clearPreviousGuessColors() {
    greenChars.forEach(clearKeyColor);
    yellowChars.forEach(clearKeyColor);
    redChars.forEach(clearKeyColor);
}

function clearAllKeyColors() {
    const keyElements = document.querySelectorAll(".key");
    keyElements.forEach(keyElement => {
        keyElement.style.backgroundColor = '';
    });
}

function tryHistoryFunc() {
    const tries = document.querySelectorAll('.listofwords li');
    tries.forEach((tryElement, index) => {
        const historyGuess = tryHistory[index];
        if (historyGuess) {
            tryElement.textContent = historyGuess;
        }
    });
}

function clearTryHistoryFunc() {
    for (let i = 1; i <= 5; i++) {
        let wordHistory = document.querySelector(`.try${i}`);
        if (wordHistory) {
            wordHistory.textContent = '';
        }
    }
}

selectWordForLevel(level);  // Start the game with level 1 (5-letter word)

// Click event for the on-screen keyboard
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;
        handleKeyPress(keyValue);
    });
});

function handleKeyPress(keyValue) {
    const inputField = document.getElementById('wordleEnter');
    if (keyValue === "Enter") {
        document.getElementById("wordleForm").submit();
    } else if (keyValue === "Backspace") {
        inputField.value = inputField.value.slice(0, -1);
    } else if (inputField.value.length < correctWord.length) {
        inputField.value += keyValue;
    }
}
