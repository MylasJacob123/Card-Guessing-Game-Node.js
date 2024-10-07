let cardsArray = [];
let flippedCards = [];
let matchedCards = 0;

document.addEventListener('DOMContentLoaded', () => {
  generateCards();
  document.getElementById('resetButton').addEventListener('click', resetGame);
});

function generateCards() {
  // Array of letters from A to R (18 letters total)
  const cardValues = 'ABCDEFGHIJKLMNOPQR'.split('');
  cardsArray = shuffle([...cardValues, ...cardValues]);
  const gameBoard = document.querySelector('.game-board-grid');
  gameBoard.innerHTML = '';

  cardsArray.forEach((cardValue, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
      <div class="card-front"></div>
      <div class="card-back">${cardValue}</div>
    `;
    cardElement.dataset.cardValue = cardValue;
    cardElement.addEventListener('click', () => flipCard(cardElement, index));
    gameBoard.appendChild(cardElement);
  });
}

function flipCard(cardElement, index) {
  if (flippedCards.length < 2 && !flippedCards.includes(index)) {
    cardElement.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [index1, index2] = flippedCards;
  const card1 = document.querySelectorAll('.card')[index1];
  const card2 = document.querySelectorAll('.card')[index2];

  if (cardsArray[index1] === cardsArray[index2]) {
    card1.classList.add('match');
    card2.classList.add('match');
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === cardsArray.length) {
      document.getElementById('winMessage').style.display = 'block';
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function resetGame() {
  document.getElementById('winMessage').style.display = 'none';
  flippedCards = [];
  matchedCards = 0;
  generateCards();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
