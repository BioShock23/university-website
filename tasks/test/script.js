const questions = [
    {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: [
            {
                text: "Пол деревни, за раз",
                correct: false,
            },
            {
                text: "Полдеревни, зараз",
                correct: true,
                explanation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
            },
            {
                text: "Пол-деревни, за раз",
                correct: false
            }
        ]
    },
    {
        question: "А эти слова как пишутся",
        answers: [
            {
                text: "Капуччино и эспрессо",
                correct: false,
            },
            {
                text: "Каппуччино и экспресо",
                correct: false
            },
            {
                text: "Капучино и эспрессо",
                correct: true,
                explanation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
            }
        ]
    },
    {
        question: "Где допущена ошибка?",
        answers: [
            {
                text: "Аккордеон",
                correct: false,
            },
            {
                text: "Белиберда",
                correct: false
            },
            {
                text: "Эпелепсия",
                correct: true,
                explanation: "Верно! Это слово пишется так: «эпИлепсия»."
            }
        ]
    },
    {
        question: "Как нужно писать?",
        answers: [
            {
                text: "Черезчур",
                correct: false
            },
            {
                text: "Черес-чур",
                correct: false
            },
            {
                text: "Чересчур",
                correct: true,
                explanation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
            }
        ]
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let selectedAnswers = [];

const startButton = document.getElementById('start-btn');
const mainContainer = document.getElementById('main');
const resultArea = document.getElementById('results');
const header = document.getElementById('header');

startButton
    .addEventListener('click', () => {
        shuffledQuestions = shuffle([...questions]);
        showNextQuestion();
    });

const showNextQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    header.innerHTML = 'Вопросы';

    startButton.style.display = 'none';
    const questionData = shuffledQuestions[currentQuestionIndex];

    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.innerText = `${currentQuestionIndex + 1}. ${questionData.question}`;

    const questionColumn = document.createElement('div');
    questionColumn.className = 'question-column';
    questionColumn.appendChild(questionText);

    const answers = shuffle(questionData.answers)

    for (const answer of answers) {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.innerText = answer.text;

        answerDiv.addEventListener('click', () =>
            selectAnswer(answer, questionColumn, answerDiv));

        questionColumn.appendChild(answerDiv);
    }

    questionText.onclick = () => {
        showLocalResults(questionColumn, answers)
    };

    mainContainer.appendChild(questionColumn);
};

const selectAnswer = (answer, questionElement, selectedAnswerElement) => {
    const questionText = questionElement.querySelector('.question-text');

    const allAnswers = questionElement.querySelectorAll('.answer');

    allAnswers.forEach(x => x.style.pointerEvents = 'none');

    selectedAnswers.push({
        question: shuffledQuestions[currentQuestionIndex],
        selectedAnswer: answer
    });

    if (answer.correct) {
        selectedAnswerElement.classList.add('correct');
        questionText.classList.add('correct');
        showExplanation(answer.explanation, selectedAnswerElement);
        correctAnswers++;
    } else {
        selectedAnswerElement.classList.add('wrong');
        questionText.classList.add('wrong');
    }

    selectedAnswerElement.classList.add('bordered');

    setTimeout(() => {
        allAnswers
            .forEach((x, i) => {
                setTimeout(() => {
                    x.classList.add('fall-down');
                }, 1000 - i * 500)
            })

        setTimeout(() => {
            allAnswers
                .forEach(x => {
                    x.style.display = 'none';
                });
        }, 2000);
    }, 1000);

    setTimeout(() => {
        currentQuestionIndex++;
        showNextQuestion();
    }, 2000);
};

const showLocalResults = (questionColumn, answers) => {
    if (currentQuestionIndex < shuffledQuestions.length) {
        return;
    }

    questionColumn
        .querySelectorAll('.answer')
        .forEach((answer, index) => {
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                answer.className = 'answer';
                showExplanation(answers[index].explanation, answer);
                if (answers[index].correct) {
                    answer.classList.add('correct');
                } else {
                    answer.style.display = 'none'
                    answer.classList.add('wrong');
                }
            } else {
                answer.style.display = 'none';
            }
        });
};

const showExplanation = (explanationText, answerElement) => {
    const isExplanationShowed = answerElement
        .querySelectorAll('p')
        .length === 0

    if (explanationText && isExplanationShowed) {
        const explanationElement = document.createElement('p');
        explanationElement.innerText = explanationText;
        answerElement.appendChild(explanationElement);
    }
};

function showResults() {
    header.innerHTML = 'Статистика';
    resultArea.innerHTML = `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов.`;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
