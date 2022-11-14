//contribution: https://github.com/mmeii/code-quiz

// elements from HTML
let highScore = document.getElementById("viewHighScore");
let timeLeft = document.getElementById("timeLeft");
let timesUp = document.getElementById("timesUp");
let timer = document.getElementById("timer");
let quizChallenge = document.getElementById("quizChallenge");
let startLet = document.getElementById("start");
let startBtn = document.getElementById("startBtn");
let questionLet = document.getElementById("questionDiv");
let questionTitle = document.getElementById("questionTitle");
let choice1 = document.getElementById("btn1");
let choice2 = document.getElementById("btn2");
let choice3 = document.getElementById("btn3");
let choice4 = document.getElementById("btn4");
let answerCheck = document.getElementById("answerCheck");
let summary = document.getElementById("summary");
let finalScore = document.getElementById("finalScore");
let initialInput = document.getElementById("initialInput");
let initialsBtn = document.getElementById("submitInitialBtn");
let highScoreSection = document.getElementById("highScoreSection");
let listHighScores = document.getElementById("listOfHighScores");
let goBackBtn = document.getElementById("goBackBtn");
let clearHighScoreBtn = document.getElementById("clearHighScoreBtn");

// variables
let correct = 0;
let questionNum = 0;
let scoreResult;
let i = 0;

// Timer
let totalTime = 60;
function newQuiz() {
  i = 0;
  totalTime = 60;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";

  choice1.style.display = "unset";
  choice2.style.display = "unset";
  choice3.style.display = "unset";
  choice4.style.display = "unset";

  startLet.style.display = "none";
  questionLet.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  let startTimer = setInterval(function () {
    totalTime--;
    timeLeft.textContent = totalTime;
    if (totalTime <= 0) {
      clearInterval(startTimer);
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
  questionTitle.textContent = quizQuestions[i].question;
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
    totalTime -= 10;
    timeLeft.textContent = totalTime;
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
  summary.style.display = "block";
  questionLet.style.display = "none";
  startLet.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  finalScore.textContent = correct;
}

// high score in local storage
function storeHighScores(event) {
  event.preventDefault();

  if (initialInput.value === "") {
    alert("Initials Please!");
    return;
  }

  startLet.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

  // store scores
  let savedHighScores = localStorage.getItem("high scores");
  let scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  let userScore = {
    initials: initialInput.value,
    score: finalScore.textContent,
  };

  scoresArray.push(userScore);

  let scoresArrayString = JSON.stringify(scoresArray);
  localStorage.setItem("high scores", scoresArrayString);

  showHighScores();
}

// show high scores
function showHighScores() {
  i = 0;
  listHighScores.style.display = "unset";
  startLet.style.display = "none";
  timer.style.display = "none";
  questionLet.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

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
    listHighScores.appendChild(eachNewHighScore);
  }
}

startBtn.addEventListener("click", newQuiz);
choice1.addEventListener("click", chooseA);
choice2.addEventListener("click", chooseB);
choice3.addEventListener("click", chooseC);
choice4.addEventListener("click", chooseD);

initialsBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

highScore.addEventListener("click", function (event) {
  showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
  startLet.style.display = "block";
  highScoreSection.style.display = "none";
  window.location.reload();
});

clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  listHighScores.innerHTML = "High Scores Cleared!";
  listHighScores.setAttribute(
    "style",
    "font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
  );
});
