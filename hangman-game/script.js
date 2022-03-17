const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// Figure parts
const figureParts = document.querySelectorAll('.figure-part');

// Available words
const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetter = ['r'];
const wrongLetters = [];

// Show a random hidden word
function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetter.includes(letter) ? letter : ''}
                </span>
            `).join('')
        }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = `Congratulations! You won!`;
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl(){
    console.log('Update wrong');
}

// Keydown letter press
window.addEventListener('keydown', e => {
    // Each key has a keycode. Letters a-z is 65 - 90.
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        // Check if letter is in the selected word
        if (selectedWord.includes(letter)) {
            // Check if letter already exist in the correctLetters array
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else { // if letter is not in selected word, if not in wrongletters arr
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else { // if wrong letter has already been pressed (exist in wrongLetters arr)
                showNotification();
            }
        }
    }
});

displayWord();
