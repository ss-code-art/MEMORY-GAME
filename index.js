const gameBoard = document.getElementById("game-board");
    const feedback = document.getElementById("feedback");
    const restartBtn = document.getElementById("btn");

    let cardValues = ["💻", "🖥️", "👩‍💻", "📱", "🖱️", "⌨️", "🧠", "🛠️"];
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function createBoard() {
      gameBoard.innerHTML = "";
      flippedCards = [];
      matchedCards = [];
      cards = shuffle([...cardValues, ...cardValues]);

      cards.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerText = "❓";
        card.dataset.value = value;
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
      });

      feedback.textContent = "Click two cards to find a match!";
    }

    function flipCard(card) {
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

    function checkMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        feedback.textContent = "✅ Match found!";
      } else {
        feedback.textContent = "❌ Not a match!";
        setTimeout(() => {
          card1.innerText = "❓";
          card2.innerText = "❓";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
        }, 1000);
      }
       flippedCards = [];

      if (matchedCards.length === cards.length) {
  feedback.textContent = "🎉 You matched all the cards!";

  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti");
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiContainer.remove();
   }, 3000);
 }
}
restartBtn.addEventListener("click", createBoard);
    createBoard();
