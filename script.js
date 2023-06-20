const emojis = ["\uD83C\uDF4E", "\uD83C\uDF4A", "\uD83C\uDF4B", "\uD83C\uDF49", "\uD83C\uDF48", "\uD83C\uDF53", "\uD83C\uDF52", "\uD83C\uDF50"];
let cards = [];
let clickedCards = [];
let matchedCards = [];
let clicks = 0;
let timer;
let seconds = 120;

// Function to initialize the game
function initGame() {
    // Create an array with 2 copies of each emoji
    const emojiPairs = emojis.concat(emojis);

    // Shuffle the array
    shuffleArray(emojiPairs);

    // Create the card elements and add them to the game board
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < 16; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", () => flipCard(card, i));
        const emoji = document.createElement("span");
        emoji.className = "emoji hidden";
        emoji.innerText = emojiPairs[i];
        card.appendChild(emoji);
        gameBoard.appendChild(card);
        cards.push(card);
    }

    // Start the timer
    startTimer();
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to flip a card
function flipCard(card, index) {
    if (clickedCards.length < 2 && !clickedCards.includes(card) && !matchedCards.includes(card)) {
        const emoji = card.querySelector(".emoji");
        card.classList.add("flipped");
        emoji.classList.remove("hidden");
        clickedCards.push(card);
        clicks++;

        document.getElementById("clicks").innerText = clicks;

        if (clickedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Function to check if the clicked cards match
function checkMatch() {
    const card1 = clickedCards[0];
    const card2 = clickedCards[1];

    if (card1.querySelector(".emoji").innerText === card2.querySelector(".emoji").innerText) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);

        if (matchedCards.length === 16) {
            endGame();
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.querySelector(".emoji").classList.add("hidden");
        card2.querySelector(".emoji").classList.add("hidden");
    }

    clickedCards = [];
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        seconds--;

        if (seconds < 0) {
            endGame();
        } else {
            document.getElementById("timer").innerText = formatTime(seconds);
        }
    }, 1000);
}

// Function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Function to end the game
function endGame() {
    clearInterval(timer);

    // Disable clicking on cards
    cards.forEach(card => card.removeEventListener("click", flipCard));

    // Display game over message
    alert("Game Over!");

    // Add the game results to the scoreboard table
    const scoreTable = document.getElementById("scoreboard");
    const scoreRow = document.createElement("tr");
    const scoreSeconds = document.createElement("td");
    scoreSeconds.innerText = seconds;
    const scoreClicks = document.createElement("td");
    scoreClicks.innerText = clicks;
    const scoreTotal = document.createElement("td");
    scoreTotal.innerText = seconds - clicks;
    scoreRow.appendChild(scoreSeconds);
    scoreRow.appendChild(scoreClicks);
    scoreRow.appendChild(scoreTotal);
    scoreTable.appendChild(scoreRow);
}

// Function to restart the game
function restartGame() {
    // Clear the game board
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    // Reset variables
    cards = [];
    clickedCards = [];
    matchedCards = [];
    clicks = 0;
    seconds = 120;

    // Reset timer and score
    clearInterval(timer);
    document.getElementById("timer").innerText = "02:00";
    document.getElementById("clicks").innerText = "0";

    // Initialize the game again
    initGame();
}

// Initialize the game
initGame();
