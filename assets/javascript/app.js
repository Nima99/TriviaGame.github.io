const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is the meaning of life?",
        imgSrc : "https://compote.slate.com/images/4efe11e6-5185-4c92-bf6b-bcd3594f352c.jpg",
        choiceA : "lemons",
        choiceB : "limes",
        choiceC : "limes",
        correct : "A"
    },{
        question : "What does Barney say?",
        imgSrc : "http://cdn.oboxeditions.com/sites/prod/files/styles/largehd/public/uploads/barbarap/TV/barney_stinson.jpg",
        choiceA : "TTTTTOOOP OF THE MONRING JACK HERE",
        choiceB : "Legend....wait for it....DARY!",
        choiceC : "pika choo",
        correct : "B"
    },{
        question : "What is the special weapon hidden in area 51?",
        imgSrc : "https://i.dailymail.co.uk/i/pix/2012/11/07/article-2229194-15E48651000005DC-126_634x397.jpg",
        choiceA : "running crocadiles(WITH ONLY 2 LEGS)",
        choiceB : "turtles with heatseeking grenade launchers",
        choiceC : "Super Saiyan God Super Saiyan Kio-Ken X20!",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "https://i.imgflip.com/2df2xp.jpg" :
              (scorePerCent >= 60) ? "https://pbs.twimg.com/media/DY14cT6VMAAdXZf.jpg" :
              (scorePerCent >= 40) ? "https://pbs.twimg.com/media/DY14cT6VMAAdXZf.jpg" :
              (scorePerCent >= 20) ? "https://fbcommentpictures.com/media/images/2014/10/16/tmpvlxobL.jpg" :
              "https://fbcommentpictures.com/media/images/2014/10/16/tmpvlxobL.jpg";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}