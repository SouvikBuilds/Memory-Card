document.addEventListener("DOMContentLoaded", function () {
    const emojis = ['🐱', '🐶', '🐰', '🦊', '🐼', '🦁', '🐸', '🐵'];
    let cardEmojis = [...emojis, ...emojis]; // make pairs
    cardEmojis = cardEmojis.sort(() => Math.random() - 0.5); // shuffle

    const cards = document.querySelectorAll('.card');
    let flipped = [];
    let score = 0;
    const scoreDiv = document.querySelector(".score")

    const startButton = document.getElementById("start")
    const stopButton = document.getElementById("stop")
    const flipSound = new Audio('flipCard.mp3')
    const bgMusic = new Audio('bgmusic.mp3')
    const gameOverSound = new Audio('gameOver.mp3')
    const matchingSound = new Audio('matching.mp3')
    const victorySound = new Audio('victory.mp3')

    // Assign emojis to cards
    function startGame() {
        bgMusic.play()
        bgMusic.loop = true

        cards.forEach((card, index) => {
            card.dataset.emoji = cardEmojis[index];
            card.innerText = '❓';

            card.addEventListener('click', () => {
                flipSound.currentTime = 0
                flipSound.play()
                if (card.innerText !== '❓' || flipped.length === 2) return;

                card.innerText = card.dataset.emoji;
                flipped.push(card);

                if (flipped.length === 2) {
                    const [card1, card2] = flipped;

                    if (card1.dataset.emoji === card2.dataset.emoji) {
                        matchingSound.play()
                        card1.style.borderColor = "green"
                        card2.style.borderColor = "green"
                        score += 1;
                        flipped = [];
                        scoreDiv.innerHTML = `<h3>Score: ${score}</h3>`

                        if (score === emojis.length) {
                            setTimeout(() => alert("🎉 You won!"), 500);
                            victorySound.play()
                            bgMusic.pause()
                        }
                    } else {
                        setTimeout(() => {
                            card1.innerText = '❓';
                            card2.innerText = '❓';
                            flipped = [];
                        }, 1000);
                    }
                }
            });
        });
    }

    function stopGame() {
        gameOverSound.play()
        bgMusic.pause()
        scoreDiv.innerHTML = `<h3>Score: ${score}</h3>`
        alert("Game Over")

    }

    startButton.addEventListener("click", startGame)
    stopButton.addEventListener("click", stopGame)
})
