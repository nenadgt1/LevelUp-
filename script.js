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
    var level = 1;
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
        clearKeyColor();
        clearAllKeyColors();
        clearPreviousGuessColors();
    }

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
        return correctWord;
    }
    
    document.getElementById("wordleForm").addEventListener('submit', function(event) {
        event.preventDefault();
        let userInputValue = document.getElementById("wordleEnter").value.toLowerCase();
        userGuess = userInputValue;
        guessChars = userGuess.split('');
        document.getElementById("wordleEnter").value = ''; // Clear the input
    });

    function clearUserGuess() {
        userGuess = '';
    }
    
    function clearPreviousGuessColors() {
        greenChars.forEach(clearKeyColor);
        yellowChars.forEach(clearKeyColor);
        redChars.forEach(clearKeyColor);
    }

    function clearAllKeyColors() {
        const keyElements = document.querySelectorAll("[class^='key']");
        keyElements.forEach(keyElement => {
            keyElement.style.backgroundColor = '';
        });
    }

    function typewriterEffect(element, text, speed) {
        let index = 0;
        element.textContent = '';
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typewriter');
            }
        };
        type();
    }
    
    function animateTryHistory() {
        const tries = document.querySelectorAll('.listofwords li');
        tries.forEach((tryElement, index) => {
            const text = tryElement.textContent;
            tryElement.classList.add('typewriter');
            typewriterEffect(tryElement, text, 100);
        });
    }
    
    function check() {
        console.log("check is running");


        if (userGuess === correctWord) {
            console.log("Good job! You've guessed the word!");
            level++;
            resetGameState();
            selectWordForLevel(level);
            
            if (level > 4) {
                console.log("You've completed all levels!");
                return true;
            }
            } else {
                greenChars = [];
                yellowChars = [];
                redChars = [];
                tries++;
                
                for (let i = 0; i < correctChars.length; i++) {
                    if (correctChars[i] === guessChars[i]) {
                        greenChars.push(guessChars[i]);
                    } else if (correctChars.includes(guessChars[i])) {
                        yellowChars.push(guessChars[i]);
                    } else {
                        redChars.push(guessChars[i]);
                    }
                }
            }
            tryHistory.push(userGuess);
            tryHistoryFunc();
            clearPreviousGuessColors();
            colorGreen();
            colorRed();
            colorYellow();

        
        
    
       
    }
    
    function colorGreen() {
        greenChars.forEach((char) => {
            const keyElement = document.querySelector(`.key${char}`);
            if (keyElement) {
                keyElement.style.backgroundColor = 'green';
            }
        });
    }
    
    function colorRed() {
        redChars.forEach((char) => {
            const keyElement = document.querySelector(`#key${char}`);
            if (keyElement && keyElement.style.backgroundColor !== 'green' && keyElement.style.backgroundColor !== 'yellow') {
                keyElement.style.backgroundColor = 'red';
            }
        });
    }
    
    function colorYellow() {
        yellowChars.forEach((char) => {
            const keyElement = document.querySelector(`#key${char}`);
            if (keyElement && keyElement.style.backgroundColor !== 'green') {
                keyElement.style.backgroundColor = 'yellow';
            }
        });
    }
    
    function clearKeyColor(char) {
        const keyElement = document.querySelector(`#key${char}`);
        if (keyElement) {
            keyElement.style.backgroundColor = '';
        }
    }

    function tryHistoryFunc() {
        console.log("try history counter start")
        tryHistory.forEach(tryHistory => {
            console.log("try history counter", tries)
           var wordHistory = document.querySelector(`.try${tries}`)
           if (tryHistory) {
            wordHistory.textContent = userGuess;
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
    selectWord(fiveLetterWords);
    console.log("new word selected, ", correctWord);
    
    async function gameLoop() {
        while (tries < 5) {
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
    
        if (userGuess !== correctWord) {
            console.log("Sorry, you've used all your tries! The correct word was:", correctWord);
        }
    }
    
    gameLoop();