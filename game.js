// ===== GAME CONSTANTS AND VARIABLES =====
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let money = 1000;
let bet = 0;
let playerHand = [];
let dealerHand = [];
let result = '';

// ===== DECK MANAGEMENT FUNCTIONS =====

// Create a standard deck of 52 cards
function createDeck() {
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

// Shuffle the deck using Fisher-Yates algorithm
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

// ===== CARD DEALING AND HAND MANAGEMENT =====

// Deal a card from the deck to a hand
function dealCards(hand, deck, containerSelector) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    deck.splice(randomIndex, 1);
    hand.push(card);

    const cardElement = createCardElement(card);
    const container = document.querySelector(containerSelector);
    
    if (container) {
        container.appendChild(cardElement);
    } else {
        console.error('Container not found for selector:', containerSelector);
    }

    // Check if player busts after hitting
    if (containerSelector === '.player-cards' && calculateHandValue(playerHand) > 21) {
        result = "You Busted, Dealer Wins!";
        showMsgDialog();
    }

    return card;
}

// Calculate the card's value
function calculateCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else if (card.value === 'A') {
        return 11;
    } else {
        return parseInt(card.value);
    }
}

// Calculate the hand's total value
function calculateHandValue(hand, isPlayer = true) {
    let sum = 0;
    let aces = 0;
    
    for (let card of hand) {
        let value = calculateCardValue(card);
        sum += value;
        if (card.value === 'A') {
            aces++;
        }
    }
    
    // Adjust for aces if bust
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }

    if (isPlayer) {
        document.getElementById("player-counter").innerHTML = `Value: ${(sum)}`
    } else {
        document.getElementById("dealer-counter").innerHTML = `Value: ${(sum)}`
    }

    return sum;
}

// ===== GAME FLOW FUNCTIONS =====

// Start a new game
function startGame() {
    document.getElementById('msg-dialog').style.display = "none";
    document.getElementById('players').style.display = 'block';
    document.getElementById('game').style.height = '100vh';
    document.querySelector("footer").style.position = "relative";

    document.location = "#game"
    
    deck = [];
    createDeck();
    deck = shuffleDeck(deck);

    playerHand = [];
    dealerHand = [];

    // Clear and deal initial cards
    document.querySelector('.player-cards').innerHTML = '';
    dealCards(playerHand, deck, '.player-cards');
    dealCards(playerHand, deck, '.player-cards');
    calculateHandValue(playerHand, true);

    document.querySelector('.dealer-cards').innerHTML = '';
    dealCards(dealerHand, deck, '.dealer-cards');
    dealCards(dealerHand, deck, '.dealer-cards');
    calculateHandValue(dealerHand, false);
}

// Player stands, dealer plays
function stand() {
    // Dealer draws until 17 or higher
    while (calculateHandValue(dealerHand, false) < 17) {
        dealCards(dealerHand, deck, '.dealer-cards');
    }

    const playerValue = calculateHandValue(playerHand, true);
    const dealerValue = calculateHandValue(dealerHand, false);

    // Determine game result
    if (dealerValue > 21) {
        result = "Dealer busts! Player wins!";
    } else if (playerValue > dealerValue) {
        result = "Player wins!";
    } else if (playerValue < dealerValue) {
        result = "Dealer wins!";
    } else {
        result = "It's a tie!";
    }
   
    showMsgDialog();
}

// Show message dialog with current result
function showMsgDialog() {
    document.querySelector(".msg-dialog h2").textContent = result;
    document.getElementById('msg-dialog').style.display = "flex";
}

// Reset game state
function endGame() {
    deck = [];
    money = 1000;
    bet = 0;
    playerHand = [];
    dealerHand = [];

    document.getElementById('players').style.display = 'none';
    document.getElementById('game').style.height = 'auto';
    document.querySelector('.player-cards').innerHTML = '';
    document.querySelector('.dealer-cards').innerHTML = '';
    document.getElementById('msg-dialog').style.display = "none";
    document.querySelector("footer").style.position = 'absolute'
}

// ===== UI RENDERING FUNCTIONS =====

// Create card visual element
function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const isRed = (card.suit === 'Hearts' || card.suit === 'Diamonds');
    const colorClass = isRed ? 'red' : 'black';

    const top = document.createElement("div");
    top.classList.add("card-top", colorClass);
    top.textContent = card.value;

    const middle = document.createElement("div");
    middle.classList.add("card-suit", colorClass);
    middle.textContent = getSuitSymbol(card.suit);

    const bottom = document.createElement("div");
    bottom.classList.add("card-bottom", colorClass);
    bottom.textContent = card.value;

    cardElement.appendChild(top);
    cardElement.appendChild(middle);
    cardElement.appendChild(bottom);

    return cardElement;
}

// Get suit symbol for display
function getSuitSymbol(suit) {
    switch (suit) {
        case 'Hearts': return '♥';
        case 'Diamonds': return '♦';
        case 'Clubs': return '♣';
        case 'Spades': return '♠';
    }
}

// ===== BETTING FUNCTIONS =====

// Place a bet
function makeBet(amount) {
    if (amount > money) {
        result = "Not enough money"
        showMsgDialog()
    }
}