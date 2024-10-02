var correctCode;
var userGuess;
var tries = 0;
var level = 1;
var tryHistory = [];
var maxTries = 10;

function resetGameState() {
    tries = 0;
    userGuess = '';
    tryHistory = [];
    clearTryHistoryFunc();
    // No need to clear keyboard colors anymore
}

function selectCodeForLevel(level) {
    let codeLength;
    switch (level) {
        case 1:
            codeLength = 3;
            break;
        case 2:
            codeLength = 4;
            break;
        case 3:
            codeLength = 5;
            break;
        case 4:
            codeLength = 6;
            break;
        case 5:
            codeLength = 7;
            break;
        case 6:
            codeLength = 8;
            break;
        default:
            console.log("All levels completed!");
            return;
    }
    selectCode(codeLength);
}

function selectCode(codeLength) {
    correctCode = '';
    for (let i = 0; i < codeLength; i++) {
        correctCode += Math.floor(Math.random() * 10);
    }
    console.log("Correct code:", correctCode);
    
    document.getElementById("codeLengthDisplay").textContent = `The combination has ${correctCode.length} digits.`;
    
    return correctCode;
}

document.getElementById("wordleForm").addEventListener('submit', function(event) {
    event.preventDefault();
    let userInputValue = document.getElementById("wordleEnter").value;
    userGuess = userInputValue;
    document.getElementById("wordleEnter").value = '';
    check();
});
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', function() {
        let keyDigit = key.textContent;
        let wordleInput = document.getElementById("wordleEnter");
        if (wordleInput.value.length < correctCode.length) {
            wordleInput.value += keyDigit;
        }
    });
});

function check() {
    console.log("check is running");

    if (userGuess === correctCode) {
        console.log("Good job! You've guessed the code!");
        level++;
        resetGameState();
        selectCodeForLevel(level);

        if (level > 6) {
            console.log("You've completed all levels!");
            return true;
        }
    } else {
        tries++;
        let correctPlaces = 0;
        let guessedDigitsStatus = Array(correctCode.length).fill('incorrect');

        for (let i = 0; i < correctCode.length; i++) {
            if (correctCode[i] === userGuess[i]) {
                correctPlaces++;
                guessedDigitsStatus[i] = 'correct';
            } else if (correctCode.includes(userGuess[i])) {
                guessedDigitsStatus[i] = 'misplaced';
            }
        }

        // Update the display for correct digits
        document.getElementById("correctDigitsDisplay").textContent = `Correct digits: ${correctPlaces}`;

        if (correctPlaces > 0) {
            console.log(`${correctPlaces} number(s) at the correct place.`);
        } else {
            console.log("No numbers are at the correct place.");
        }
    }

    // Add userGuess to history only if it's not already in the history.
    if (!tryHistory.includes(userGuess)) {
        tryHistory.push(userGuess);
        tryHistoryFunc();
    }

    if (tries >= maxTries) {
        console.log("Sorry, you've used all your tries! The correct code was:", correctCode);
        resetGameState();
        selectCodeForLevel(level);
    }
}

// Remove the updateKeyboardColors function
// Remove the clearKeyboardColors function

function tryHistoryFunc() {
    console.log("try history counter start");
    tryHistory.forEach((history, index) => {
        var wordHistory = document.querySelector(`.try${index + 1}`);
        if (wordHistory && wordHistory.textContent !== history) {
            wordHistory.textContent = history;
        }
    });
}

function clearTryHistoryFunc() {
    for (let i = 1; i <= maxTries; i++) {
        let wordHistory = document.querySelector(`.try${i}`);
        if (wordHistory) {
            wordHistory.textContent = '';
        }
    }
}

selectCodeForLevel(level);

async function gameLoop() {
    while (tries < maxTries) {
        await new Promise((resolve) => {
            const checkInput = () => {
                if (userGuess) {
                    resolve();
                }
            };
            document.getElementById("wordleForm").addEventListener('submit', function(event) {
                event.preventDefault();
                checkInput();
            });
        });

        console.log("in the loop", userGuess);
        if (check()) {
            break;
        }

        userGuess = '';
    }
}

gameLoop();
