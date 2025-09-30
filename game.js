const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let money = 1000;
let bet = 0;
let playerHand = [];
let dealerHand = [];

function createDeck() {
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

function shuffleDeck(deck) {
    let shuffledDeck = [...deck];

    for (let x = shuffledDeck.length - 1; x > 0; x--) {
        const y = Math.floor(Math.random() * (x + 1));
        
        let temp = shuffledDeck[x];
        shuffledDeck[x] = shuffledDeck[y];
        shuffledDeck[y] = temp;
    }

    return shuffledDeck;
}

function dealCards(hand, deck) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    deck.splice(randomIndex, 1);
    hand.push(card);
    return card;
}

function startGame() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    createDeck();
    deck = shuffleDeck(deck);
    playerHand = [];
    dealerHand = [];
}

function calculateCardValue(card) {
    let playerSum = 0;
    if ((card.value).includes(['J', 'Q', 'K'])) {
        playerSum += 10;
    }
    
    if (card.value === 'A') {
        playerSum += 11;
        if (playerSum > 21) {
            playerSum -= 10;
        }
    }

    if (card.value >= '2' && card.value <= '10') {
        playerSum = parseInt(card.value);
    }

    return playerSum;

    let dealerSum = 0;
    if ((card.value).includes(['J', 'Q', 'K'])) {
        dealerSum += 10;
    }
    
    if (card.value === 'A') {
        dealerSum += 11;
        if (dealerSum > 21) {
            dealerSum -= 10;
        }
    }

    if (card.value >= '2' && card.value <= '10') {
        dealerSum = parseInt(card.value);
    }

    return dealerSum;
}
