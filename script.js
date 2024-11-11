const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
let cards = [];
let firstCard = null, secondCard = null;
let lockBoard = false;

function initGame() {
    cards = shuffleArray([...symbols, ...symbols]);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    cards.forEach(symbol => {
        const cardElement = createCard(symbol);
        gameBoard.appendChild(cardElement);
    });

    resetBoard();
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('restart-btn').addEventListener('click', initGame);

initGame();
