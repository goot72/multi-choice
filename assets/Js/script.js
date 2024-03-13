var questions = [
    {
        questions: "What is the capital of France?",
        answers: [
            { text: "london", correct: false },
            { text: "paris", correct: true },
            { text: "rome", correct: false },
            { text: "berlin", correct: false }
        ]  
    }, 
    {
        questions: "What is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Blue Whale", correct: true }
        ]
    }
];
var questionElem = document.getElementById("question");
var answerButton = document.getElementById("answer-buttons");
var nextButton = document.getElementById("submit-btn");
var start = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var playerName = document.getElementById("first-name");
var saveBtn = document.getElementById("save");
var playerScore = document.getElementById("score");
var leader = JSON.parse(window.localStorage.getItem("user"));
var scoreBoard = document.getElementById("dataContainer");
console.log(leader)


document.addEventListener('DOMContentLoaded', function() {
    const dataContainer = document.getElementById('data-container');
  
    // Check if local storage has data
    if (localStorage.getItem('user')) {
      // Retrieve data from local storage
      const storedData = JSON.parse(localStorage.getItem('user'));
      
      // Display the data on the page
      dataContainer.textContent = leader;
    } 
  });
  


let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.questions;
    question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);    
    }
}
function selectAnswer(e) {
    var selectedButton = e.target;
    var isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElem.innerHTML = "You scored " + score + " out of " + questions.length;
}
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz
    }
});
start.addEventListener("click", startQuiz);
function countdown() {
    var timeLeft = 16;
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft === 0) {
            clearInterval(timeInterval);
            alert("Time is up!");
            showScore();
        }   
    }   
    , 1000);
    return timeInterval;
}
function startQuiz() {
    showQuestion();
    countdown();

}
save.addEventListener("click", function(event) {
    event.preventDefault();
    
    // create user object from submission
    var user = {
      playerName: playerName.value.trim(),
      playerScore: playerScore.value.trim()
    };
  
    // set new submission to local storage 
    localStorage.setItem("user", JSON.stringify(user));
    
  });
