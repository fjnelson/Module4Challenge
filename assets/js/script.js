//contribution: https://github.com/mmeii/code-quiz

// elements from HTML
let highScore = document.getElementById("viewHighScoreDisplay");
let timeLeft = document.getElementById("timeLeftDisplay");
let timesUp = document.getElementById("timesUpDisplay");
let timer = document.getElementById("timerDisplay");
let quizChallenge = document.getElementById("quizChallenge");
let startLet = document.getElementById("startHomePage");
let startBtn = document.getElementById("startBtn");
let questionLet = document.getElementById("questionBox");
let questionBtns = document.getElementById("questionBtns");
let choice1 = document.getElementById("btn1");
let choice2 = document.getElementById("btn2");
let choice3 = document.getElementById("btn3");
let choice4 = document.getElementById("btn4");
let answerCheck = document.getElementById("questionAnswerCheck");
let summaryScores = document.getElementById("summaryScores");
let finalTotal = document.getElementById("finalScoreTotal");
let initialEntry = document.getElementById("initialUserEntry");
let initialsBtn = document.getElementById("submitInitialBtn");
let highScoreBox = document.getElementById("highScoreBox");
let highScoresList = document.getElementById("highScoresList");
let goBackBtn = document.getElementById("goBackBtn");
let clearHighScoreBtn = document.getElementById("clearHighScoreBtn");

// variables
let correct = 0;
let i = 0;

// Timer
let totalTimer = 60;
function startQuiz() {
  i = 0;
  totalTimer = 60;
  timeLeft.textContent = totalTimer;
  initialEntry.textContent = "";

  choice1.style.display = "unset";
  choice2.style.display = "unset";
  choice3.style.display = "unset";
  choice4.style.display = "unset";

  startLet.style.display = "none";
  questionLet.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  let startTimerCountdown = setInterval(function () {
    totalTimer--;
    timeLeft.textContent = totalTimer;
    if (totalTimer <= 0) {
      clearInterval(startTimerCountdown);
      if (i < quizQuestions.length - 1) {
        gameOver();
      }
    }
  }, 1000);

  showQuiz();
}

// quiz
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionBtns.textContent = quizQuestions[i].question;
  choice1.textContent = quizQuestions[i].choices[0];
  choice2.textContent = quizQuestions[i].choices[1];
  choice3.textContent = quizQuestions[i].choices[2];
  choice4.textContent = quizQuestions[i].choices[3];
}

// logic, -10 seconds for wrong answer
function checkAnswer(answer) {
  if (quizQuestions[i].answer === quizQuestions[i].choices[answer]) {
    correct++;
    answerCheck.textContent = "Yay! :)";
  } else {
    totalTimer -= 10;
    timeLeft.textContent = totalTimer;
    answerCheck.textContent =
      "Incorrect!!! :( The answer is: " + quizQuestions[i].answer;
  }

  i++;
  if (i < quizQuestions.length) {
    nextQuestion();
  } else {
    gameOver();
  }
}

function chooseA() {
  checkAnswer(0);
}
function chooseB() {
  checkAnswer(1);
}
function chooseC() {
  checkAnswer(2);
}
function chooseD() {
  checkAnswer(3);
}

// game ending
function gameOver() {
  summaryScores.style.display = "block";
  questionLet.style.display = "none";
  startLet.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  finalTotal.textContent = correct;
}

// high score in local storage
function storeHighScores(event) {
  event.preventDefault();

  if (initialEntry.value === "") {
    alert("Initials Please!");
    return;
  }

  startLet.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summaryScores.style.display = "none";
  highScoreBox.style.display = "block";

  // store scores
  let savedHighScores = localStorage.getItem("high scores");
  let scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  let userScore = {
    initials: initialEntry.value,
    score: finalTotal.textContent,
  };

  scoresArray.push(userScore);

  let scoresArrayString = JSON.stringify(scoresArray);
  localStorage.setItem("high scores", scoresArrayString);

  showHighScores();
}

// show high scores
function showHighScores() {
  i = 0;
  highScoresList.style.display = "unset";
  startLet.style.display = "none";
  timer.style.display = "none";
  questionLet.style.display = "none";
  timesUp.style.display = "none";
  summaryScores.style.display = "none";
  highScoreBox.style.display = "block";

  let savedHighScores = localStorage.getItem("high scores");

  // check local storage
  if (savedHighScores === null) {
    return;
  }

  let storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
    let eachNewHighScore = document.createElement("p");
    eachNewHighScore.innerHTML =
      storedHighScores[i].initials + ": " + storedHighScores[i].score;
      highScoresList.appendChild(eachNewHighScore);
  }
}

startBtn.addEventListener("click", startQuiz);
choice1.addEventListener("click", chooseA);
choice2.addEventListener("click", chooseB);
choice3.addEventListener("click", chooseC);
choice4.addEventListener("click", chooseD);

initialsBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

highScore.addEventListener("click", function (event) {
  if (!startLet.style.display) {
    showHighScores(event);
  }
  else
  return;
});

goBackBtn.addEventListener("click", function () {
  startLet.style.display = "block";
  highScoreBox.style.display = "none";
  window.location.reload();
});

clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  highScoresList.innerHTML = "High Scores Cleared!";
  highScoresList.setAttribute(
    "style",
    "font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
  );
});
