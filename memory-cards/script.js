const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const deleteBtn = document.getElementById('delete');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data (in local storage)
let cardsData = getCardsData(); // Returns an arr or empty arr 

// Store hard-coded card data - Will eventually be from local storage
/*
const cardsData = [
    {
        question: 'What must a variable begin with?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'What is a variable?',
        answer: 'A container for a piece of data'
    },
    {
        question: 'Example of Case Sensitive Variable?',
        answer: 'thisIsAVariable'
    }
];
*/

// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create 1 card in the DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Add the 'active' class to the 1st card
    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                    ${data.answer}
                </p>
            </div>
        </div>
    `;

    // Flip card effect
    card.addEventListener('click', () =>
        card.classList.toggle('show-answer')
    );

    // Add cards to DOM;
    cardsEl.push(card);
    cardsContainer.appendChild(card);

    // Update current card number
    updateCurrentText();
}

// Show card page number
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}


createCards();




// Event Listeners
// Next button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    // When the cards are flipped to the end
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    // Set the next card to active
    cardsEl[currentActiveCard].className = 'card active';

    // Update page counter
    updateCurrentText();
});

// Prev button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    // When the cards are flipped to the end
    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    // Set the next card to active
    cardsEl[currentActiveCard].className = 'card active';

    // Update page counter
    updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => {
    addContainer.classList.add('show');
});

// Hide add container
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show');
});

// Add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        // Create new card object
        const newCard = {
            question: question,
            answer: answer
        };
        // Same as: { question, answer }

        createCard(newCard);

        // Clear inputs
        questionEl.value = '';
        answerEl.value = '';

        // Remove add card container
        addContainer.classList.remove('show');


        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();

    // Tale cards out of the DOM
    cardsContainer.innerHTML = '';
    window.location.reload();
});

// Delete single card button
deleteBtn.addEventListener('click', () => {
    let cards;
    if (localStorage.getItem('cards') === null) {
        cards = [];
    } else {
        cards = JSON.parse(localStorage.getItem('cards'));
    }

    cards.forEach((card, index) => {
        if(index === currentActiveCard){
            cards.splice(index, 1);
        }
    });

    // Set cards arr to local storage
    setCardsData(cards);
});

