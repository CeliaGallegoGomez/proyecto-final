// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
const words = ["javascript", "html", "css", "programacion", "desarrollo"];
let selectedWord;
let guessedLetters;
let incorrectLetters;
let attempts;

function startNewGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    incorrectLetters = [];
    attempts = 6;
    document.getElementById('message').textContent = '';
    document.getElementById('new-game-button').style.display = 'none';
    displayWord();
    updateAttemptsDisplay();
}

function displayWord() {
    let word = document.getElementById('word');
    const wordDisplay = selectedWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    word.textContent = wordDisplay;
    document.getElementById('incorrect-letters').textContent = incorrectLetters.join(', ');
    checkWin();
}

function checkWin() {
    if (!selectedWord.split('').some(letter => !guessedLetters.includes(letter))) {
        document.getElementById('message').textContent = "¡Ganaste! La palabra es: " + selectedWord;
        document.getElementById('new-game-button').style.display = 'block';
        word.textContent = selectedWord;
        disableInput();
    }
    if (attempts === 0) {
        document.getElementById('message').textContent = "¡Perdiste! La palabra era: " + selectedWord;
        document.getElementById('new-game-button').style.display = 'block';
        document.getElementById('attempts-left').textContent = '💀💀💀'
        word.textContent = selectedWord;

        disableInput();
    }
}

function updateAttemptsDisplay() {
    let stringAttemps;
    stringAttemps = '❤️'.repeat(attempts);
    for(var i = attempts; i < 6; i++){
        let cross = '❌';
        stringAttemps = stringAttemps.concat(cross);        
    }
    console.log(stringAttemps);
    document.getElementById('attempts-left').textContent = stringAttemps;
}

function disableInput() {
    document.getElementById('letter-input').hidden = true;
    document.getElementById('guess-button').hidden = true;
    document.getElementById('incorrect').hidden = true;
    
}

function guessLetter(){
    const letter = document.getElementById('letter-input').value.toLowerCase();
    document.getElementById('letter-input').value = '';

    if (guessedLetters.includes(letter) || incorrectLetters.includes(letter) || letter === '') {
        return;
    }

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
    } else {
        incorrectLetters.push(letter);
        attempts--;
    }
    updateAttemptsDisplay();
    displayWord();
}
document.getElementById('guess-button').addEventListener('click', () => guessLetter());

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    startNewGame();
});

document.getElementById('new-game-button').addEventListener('click', () => {
    startNewGame();
    document.getElementById('letter-input').hidden = false;
    document.getElementById('guess-button').hidden = false;
    document.getElementById('incorrect').hidden = false;
});
