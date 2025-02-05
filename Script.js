const CounterElement = document.getElementById("Counter");
const ScoreElement = document.getElementById("Score");
const WinPercentageElement = document.getElementById("WinPercentage");
const MessageElement = document.getElementById("Message");
let Countdown = 3;
let StartTime;
let GameStarted = false;
let SuccessfulAttempts = 0;
let TotalAttempts = 0;

document.body.addEventListener("click", () => {
  if (GameStarted) {
    const CurrentTime = new Date().getTime();
    const ElapsedTime = CurrentTime - StartTime;

    if (ElapsedTime <= 150) {
      ShowMessage(`Success! You clicked in ${ElapsedTime} milliseconds.`);
      SuccessfulAttempts++;
    } else {
      ShowMessage(`You failed. You clicked after ${ElapsedTime} milliseconds.`);
    }

    TotalAttempts++;
    UpdateScore();
    UpdateWinPercentage();
    ResetGame();
  } else if (document.body.style.backgroundColor === "white") {
    ShowMessage(`You failed. You clicked while background was white.`);
    TotalAttempts++;
    UpdateScore();
    UpdateWinPercentage();
    ResetGame();
  }
});

function ShowMessage(Message) {
  MessageElement.textContent = Message;
  MessageElement.style.display = "block";
  setTimeout(() => {
    MessageElement.style.display = "none";
  }, 3000);
}

function UpdateScore() {
  ScoreElement.textContent = `Successful: ${SuccessfulAttempts} / Total: ${TotalAttempts}`;
}

function UpdateWinPercentage() {
  const WinPercentage = (SuccessfulAttempts / TotalAttempts) * 100;
  WinPercentageElement.textContent = `Win Percentage: ${WinPercentage.toFixed(
    2
  )}%`;
}

function StartCountdown() {
  CounterElement.textContent = Countdown;
  if (Countdown > 0) {
    Countdown--;
    CounterElement.style.color = "black"; // Set countdown color to green
    setTimeout(() => {
      StartCountdown();
    }, 1000);
  } else {
    CounterElement.textContent = "Click";
    CounterElement.style.color = "black"; // Reset countdown color
    GameStarted = true;

    // Capture the start time after countdown ends
    StartTime = new Date().getTime();

    // Change background color to red immediately upon clicking
    document.body.style.backgroundColor = "red";
    document.body.style.cursor = "pointer";
  }
}

function ResetGame() {
  Countdown = 3; // Reset countdown time to fixed 3 seconds
  GameStarted = false;
  CounterElement.textContent = "3";
  document.body.style.backgroundColor = "#00ff00"; // Reset background color
  document.body.style.cursor = "default";
  setTimeout(StartCountdown, 1000); // Start a new countdown after reset
}

StartCountdown();
