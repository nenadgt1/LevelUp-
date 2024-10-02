document.addEventListener("DOMContentLoaded", function () {
    const availableShapes = ['♣', '♦', '♥', '♠', '★', '■'];
    let currentGuess = '';
    const maxGuesses = 6;
    let numberOfGuesses = 0;
    let currentCodeLength = 4; // Start with a 4-shape code

    let randomShapeCode = generateRandomCode(currentCodeLength);
    console.log("Random Shape Code: ", randomShapeCode);

    document.getElementById('wordLengthDisplay').textContent = `The code has ${randomShapeCode.length} shapes.`;

    document.querySelectorAll('.shape-key').forEach(key => {
        key.addEventListener('click', function () {
            if (currentGuess.length < currentCodeLength) {
                currentGuess += key.textContent.trim();
                document.getElementById('userGuessDisplay').textContent = currentGuess;
            }
        });
    });

    document.querySelector('.submitBtn').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentGuess.length === currentCodeLength) {
            numberOfGuesses++;
            const result = evaluateGuess(currentGuess, randomShapeCode);
            updateGuessHistory(currentGuess, numberOfGuesses);
            displayDots(result, numberOfGuesses);

            if (result.correctPositions === currentCodeLength) {
                alert("Congratulations! You guessed the code! Moving to next level...");
                currentCodeLength++; // Increase the code length for the next level
                resetGame();
            } else if (numberOfGuesses >= maxGuesses) {
                alert("Game over! You've used all your tries.");
                resetGame(true); // Reset everything when the game is over
            } else {
                currentGuess = '';
                document.getElementById('userGuessDisplay').textContent = currentGuess;
            }
        }
    });

    function generateRandomCode(length) {
        return Array.from({ length }, () => availableShapes[Math.floor(Math.random() * availableShapes.length)]);
    }

    function evaluateGuess(guess, code) {
        let correctPositions = 0;
        let correctShapes = 0;
        const guessArr = guess.split('');
        const codeArr = [...code];

        guessArr.forEach((shape, index) => {
            if (shape === codeArr[index]) {
                correctPositions++;
                codeArr[index] = null; // Null out correct matches
            }
        });

        guessArr.forEach((shape, index) => {
            if (codeArr.includes(shape) && codeArr[index] !== null) {
                correctShapes++;
                codeArr[codeArr.indexOf(shape)] = null;
            }
        });

        return { correctPositions, correctShapes };
    }

    function updateGuessHistory(guess, guessNumber) {
        const tryClass = `.try${guessNumber}`;
        document.querySelector(tryClass).textContent = guess;
    }

    function displayDots(result, guessNumber) {
        const { correctPositions, correctShapes } = result;
        const dotsRow = document.createElement('div');
        dotsRow.classList.add('dotsRow');
        for (let i = 0; i < correctPositions; i++) {
            const redDot = document.createElement('span');
            redDot.classList.add('red-dot');
            dotsRow.appendChild(redDot);
        }
        for (let i = 0; i < correctShapes; i++) {
            const yellowDot = document.createElement('span');
            yellowDot.classList.add('yellow-dot');
            dotsRow.appendChild(yellowDot);
        }
        document.getElementById('dotsDisplay').appendChild(dotsRow);
    }

    function resetGame(gameOver = false) {
        currentGuess = '';
        numberOfGuesses = 0;
        document.querySelectorAll('.listofwords li').forEach(li => li.textContent = '');
        document.getElementById('dotsDisplay').innerHTML = '';
        document.getElementById('userGuessDisplay').textContent = '';

        if (!gameOver) {
            // If the game is not over, generate a new code with an increased length
            randomShapeCode = generateRandomCode(currentCodeLength);
            console.log("New Random Shape Code: ", randomShapeCode);
            document.getElementById('wordLengthDisplay').textContent = `The code has ${randomShapeCode.length} shapes.`;
        } else {
            // If the game is over, reset the code length to 4
            currentCodeLength = 4;
            randomShapeCode = generateRandomCode(currentCodeLength);
            document.getElementById('wordLengthDisplay').textContent = `The code has ${randomShapeCode.length} shapes.`;
        }
    }
});
