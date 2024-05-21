const question = document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("choice-text"));
const progressBarFull = document.getElementById('progressBarFull');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let  score = 0;
let availableQuestions = [];


let questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
 ];

 
 /*CONSTANTS*/
 const Correct_Score = 5;
 const Max_Questions = 3;

 startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= Max_Questions){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html");
    }



    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${Max_Questions}`;
    
    progressBarFull.style.width = `${(questionCounter / Max_Questions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;

};

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // const classToApply = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer){
        //     classToApply = 'correct';
        // }

    const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    
    if(classToApply === 'correct'){
        incrementScore(Correct_Score)
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    },1000);
    });
});

incrementScore = num => {
    score+=num;
    scoreText.innerText = score;
};

startGame();
