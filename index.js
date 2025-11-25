// Get DOM elements for the game board, feedback display, and restart button
const gameBoard = document.getElementById("game-board");
    const feedback = document.getElementById("feedback");
    const restartBtn = document.getElementById("btn");

    // Array of emoji symbols representing different card values
    let cardValues = ["💻", "🖥️", "👩‍💻", "📱", "🖱️", "⌨️", "🧠", "🛠️"];
    
    // Array to store all cards on the board
    let cards = [];
    
    // Array to track currently flipped cards (max 2 for comparison)
    let flippedCards = [];
    
    // Array to track successfully matched card pairs
    let matchedCards = [];

    // Fisher-Yates shuffle algorithm to randomize card order
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at positions i and j
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Initialize the game board with shuffled cards
    function createBoard() {
      gameBoard.innerHTML = "";
      flippedCards = [];
      matchedCards = [];
     
      // Create shuffled deck with duplicate values (pairs of cards)
      cards = shuffle([...cardValues, ...cardValues]);

      // Create and add card elements to the board
      cards.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerText = "❓"; // Show question mark on card back
        card.dataset.value = value; // Store actual emoji value in data attribute
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
      });

      // Display initial instruction message
      feedback.textContent = "Click two cards to find a match!";
    }

    // Handle card flip action when clicked
    function flipCard(card) {
      // Prevent flipping if: 2 cards already flipped, card already matched, or card already flipped
      if (
        flippedCards.length === 2 ||
        card.classList.contains("matched") ||
        flippedCards.includes(card)
      ) return;

      card.innerText = card.dataset.value;
      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) checkMatch();
    }

    // Compare two flipped cards to check if they match
    function checkMatch() {
      const [card1, card2] = flippedCards;

      // If cards match, mark them as matched
      if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        feedback.textContent = "✅ Match found!";
      } else {
      // If no match, flip cards back after a delay
        feedback.textContent = "❌ Not a match!";
        setTimeout(() => {
          card1.innerText = "❓";
          card2.innerText = "❓";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
        }, 1000);
      }

      // Reset flipped cards array for next turn
       flippedCards = [];

       // Check if all pairs have been matched (game won)
      if (matchedCards.length === cards.length) {
  feedback.textContent = "🎉 You matched all the cards!";

  // Create confetti effect for celebration
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti");
  document.body.appendChild(confettiContainer);

  // Generate 100 falling confetti pieces with random positions and colors
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
    confettiContainer.appendChild(confetti);
  }

  // Remove confetti after animation completes (3 seconds)
  setTimeout(() => {
    confettiContainer.remove();
   }, 3000);
 }
}

// Add event listener to restart button
restartBtn.addEventListener("click", createBoard);
   // Start the game on page load
createBoard();
