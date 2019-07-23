let score = 0;
let questionNumber = 0;

function beginTheQuiz() {
    $(`.quizStarter`).on('click', '.startButton', function(event) {
        $(`.quizStarter`).remove();
        $('.questionNumber').text(1);
        renderNextQuestion();
    });
}

function incrementQuestionNumber() {
    questionNumber ++;
}

function incrementScore() {
    score++;
    $('.quizScore').text(score);
}

function renderNextQuestion() {
    $(`.contentGoesHere`).html(generateQuestion());
    $('.questionNumber').text(questionNumber + 1);
    validateAnswer();    
}

function generateQuestion() {
    if (questionNumber < questionsData.length) {
    return `<div class="question"><h2>"${questionsData[questionNumber].question}"</h2></div>
    <div class="answerList">
    <form class="answers">
        <fieldset>
            <label class="answerOption" id="answerA">
                <input type="radio" value="${questionsData[questionNumber].a}" name="answer" required><span>${questionsData[questionNumber].a}</span>
            </label>
            <label class="answerOption" id="answerB">
                <input type="radio" value="${questionsData[questionNumber].b}" name="answer" required><span>${questionsData[questionNumber].b}</span>
            </label>
            <label class="answerOption" id="answerC">
                <input type="radio" value="${questionsData[questionNumber].c}" name="answer" required><span>${questionsData[questionNumber].c}</span>
            </label>
            <label class="answerOption" id="answerD">
                <input type="radio" value="${questionsData[questionNumber].d}" name="answer" required><span>${questionsData[questionNumber].d}</span>
            </label>
            <button type="submit" class="submitAnswer">Submit</button>
        </fieldset>
    </form>
</div>`;
}
else {
  renderResults();
  $(`header`).hide();
}} 

function validateAnswer() {
    $('.answers').on('submit', function(event) {
        event.preventDefault();
        let selected = $('input:checked');
        let userAnswer = selected.val();
        let rightAnswer = `${questionsData[questionNumber].answer}`;
        if (userAnswer === rightAnswer) {
           youGotItRight();
        }
        else {
            youGotItWrong();
        }
    });
}

function youGotItRight() {
    let iconNum = Math.floor((Math.random() * 4) + 1);
    $(`.contentGoesHere`).html(`<div class="feedbackMessage">
    <img class="feedbackIcon" src="${iconData[iconNum].imgURL}" alt="${iconData[iconNum].alt}">
    <h3>You got it right!</h3>
</div>
<button class="nextQuestionButton">Next Question</button>`);
incrementScore();
incrementQuestionNumber();
nextQuestion();
}

function youGotItWrong() {
    $(`.contentGoesHere`).html(`<div class="feedbackMessage">
    <img class="feedbackIcon" src="${iconData[0].imgURL}" alt="${iconData[0].alt}">
    <h3>You got it wrong!</h3>
    <p>The correct answer is <span class="correctFeedbackAnswer"><strong>${questionsData[questionNumber].answer}</strong></span></p>
</div>
<button class="nextQuestionButton">Next Question</button>`);
incrementQuestionNumber();
nextQuestion();
}

function nextQuestion() {
    $('main').on('click', '.nextQuestionButton', function(event) {
        renderNextQuestion();
    });
}

function renderResults() {
    if (score >= 7) {
   $(`.contentGoesHere`).html(`<div class="resultsMessage">
   <h2>Congratulations!</h2>
   <img class="resultsImage" src="https://user-images.githubusercontent.com/51541006/61474003-33657400-a977-11e9-8876-bb09b1230853.jpg" alt="beatles party">
   <h3>You got ${score}/10 questions correct</h3>
   <p>You are a true Beatles Superfan!</p>
</div>
<button class="restartQuiz" onclick="window.location.href = 'index.html';">Restart Quiz</button>`);
} else {
    $(`.contentGoesHere`).html(`<div class="resultsMessage">
   <h2>Pretty good job!</h2>
   <img class="resultsImage" src="https://user-images.githubusercontent.com/51541006/61474010-35c7ce00-a977-11e9-8876-dcfdfc05c5e2.jpg" alt="pointing beatles">
   <h3>You got ${score}/10 questions correct</h3>
   <p>Try again to see if you can do even better!</p>
</div>
<button class="restartQuiz" onclick="window.location.href = 'index.html';">Restart Quiz</button>`);
}}

$(beginTheQuiz);
