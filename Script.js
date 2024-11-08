const counterElement = document.getElementById("counter");
const scoreElement = document.getElementById("score");
const winPercentageElement = document.getElementById("win-percentage");
const messageElement = document.getElementById("message");
let countdown = 3;
let startTime;
let gameStarted = false;
let successfulAttempts = 0;
let totalAttempts = 0;

document.body.addEventListener("click", () => {
  if (gameStarted) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime <= 150) {
      showMessage(`Success! You clicked in ${elapsedTime} milliseconds.`);
      successfulAttempts++;
    } else {
      showMessage(`You failed. You clicked after ${elapsedTime} milliseconds.`);
    }

    totalAttempts++;
    updateScore();
    updateWinPercentage();
    resetGame();
  } else if (document.body.style.backgroundColor === "white") {
    showMessage(`You failed. You clicked while background was white.`);
    totalAttempts++;
    updateScore();
    updateWinPercentage();
    resetGame();
  }
});

function showMessage(message) {
  messageElement.textContent = message;
  messageElement.style.display = "block";
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 3000);
}

function updateScore() {
  scoreElement.textContent = `Successful: ${successfulAttempts} / Total: ${totalAttempts}`;
}

function updateWinPercentage() {
  const winPercentage = (successfulAttempts / totalAttempts) * 100;
  winPercentageElement.textContent = `Win Percentage: ${winPercentage.toFixed(
    2
  )}%`;
}

function startCountdown() {
  counterElement.textContent = countdown;
  if (countdown > 0) {
    countdown--;
    counterElement.style.color = "black"; // Set countdown color to green
    setTimeout(() => {
      startCountdown();
    }, 1000);
  } else {
    counterElement.textContent = "Click";
    counterElement.style.color = "black"; // Reset countdown color
    gameStarted = true;

    // Capture the start time after countdown ends
    startTime = new Date().getTime();

    // Change background color to red immediately upon clicking
    document.body.style.backgroundColor = "red";
    document.body.style.cursor = "pointer";
  }
}

function resetGame() {
  countdown = 3; // Reset countdown time to fixed 3 seconds
  gameStarted = false;
  counterElement.textContent = "3";
  document.body.style.backgroundColor = "#00ff00"; // Reset background color
  document.body.style.cursor = "default";
  setTimeout(startCountdown, 1000); // Start a new countdown after reset
}

startCountdown();
