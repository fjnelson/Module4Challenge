//https://github.com/mmeii/code-quiz

// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score


// elements from HTML
var viewHighScore = document.getElementById("viewHighScore");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
var timer = document.getElementById("timer");
var quizChallenge = document.getElementById("quizChallenge");
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("startBtn");
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn1");
var choiceB = document.getElementById("btn2");
var choiceC = document.getElementById("btn3");
var choiceD = document.getElementById("btn4");
var answerCheck = document.getElementById("answerCheck");
var summary = document.getElementById("summary");
var finalScore = document.getElementById("finalScore");
var initialInput = document.getElementById("initialInput");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var highScoreSection = document.getElementById("highScoreSection");
var listOfHighScores = document.getElementById("listOfHighScores");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 

// variables
var correct = 0;
var questionNum = 0;
var scoreResult;
var i = 0;

// Timer
var totalTime = 61;
function newQuiz() {
    i = 0;
    totalTime = 60;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (i < quizQuestions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

// quiz
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = quizQuestions[i].question;
    choiceA.textContent = quizQuestions[i].choices[0];
    choiceB.textContent = quizQuestions[i].choices[1];
    choiceC.textContent = quizQuestions[i].choices[2];
    choiceD.textContent = quizQuestions[i].choices[3];
}

// logic, -10 seconds for wrong answer
function checkAnswer(answer) {

    if (quizQuestions[i].answer === quizQuestions[i].choices[answer]) {
        correct++;
        answerCheck.textContent = "Correct!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + quizQuestions[i].answer;
    }

    i++;
    if (i < quizQuestions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

// game ending
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correct;
}

// high score in local storage
function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // store scores
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores();
}

// show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;")
});
