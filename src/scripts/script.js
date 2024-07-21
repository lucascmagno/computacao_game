const questions = [
    {
        question: "O curso prepara o aluno para ensinar computação?",
        correctAnswer: true,
        explanation: "VERDADE: A licenciatura em computação é projetada para formar professores capazes de ensinar informática e computação nas escolas, tanto no ensino fundamental quanto no médio. Além das disciplinas técnicas, os alunos também estudam metodologias de ensino, didática e outras disciplinas pedagógicas para se tornarem educadores eficazes."
    },
    {
        question: "O curso de licenciatura em computação é apenas para quem quer ser professor?",
        correctAnswer: false,
        explanation: "FALSO: Apesar de a licenciatura preparar para a docência, os graduados também podem atuar em diversas áreas como desenvolvimento de software, análise de sistemas, gestão de projetos e tecnologia educacional."
    },
    {
        question: "O curso desenvolve habilidades em várias linguagens de programação?",
        correctAnswer: true,
        explanation: "VERDADE: Os alunos aprendem a programar em diversas linguagens, o que amplia suas oportunidades no mercado de trabalho tanto na área da educação quanto na indústria de tecnologia."
    },
    {
        question: "Apenas quem gosta de matemática pode fazer licenciatura em computação?",
        correctAnswer: false,
        explanation: "FALSO: Embora a matemática seja uma parte importante do curso, a licenciatura em computação abrange várias áreas, como ensino de tecnologias, programação, e pedagogia. Pessoas com diferentes interesses e habilidades podem se sair bem no curso. Como qualquer outro curso superior, a licenciatura em computação exige dedicação, estudo constante e atualização contínua devido às rápidas mudanças na tecnologia."
    },
    {
        question: "O mercado de trabalho de tecnologia está em expansão?",
        correctAnswer: true,
        explanation: "VERDADE: Com a crescente inclusão da tecnologia na educação e o avanço das TICs (Tecnologias da Informação e Comunicação), a demanda por profissionais qualificados em computação é alta e deve continuar crescendo em todas as áreas."
    },
    {
        question: "A licenciatura em computação pode levar a uma carreira acadêmica?",
        correctAnswer: true,
        explanation: "VERDADE: Após a graduação, muitos licenciados optam por seguir estudos de pós-graduação, como mestrado e doutorado, e se tornam pesquisadores ou professores universitários."
    },
    {
        question: "Fazendo licenciatura em computação eu só vou fazer estágio na docência?",
        correctAnswer: false,
        explanation: "FALSO: Licenciatura em Computação tem 4 estágios obrigatórios, podendo ser os 4 na docência ou no mínimo 2 na docência, ou seja, você poderá fazer 2 estágios na docência e 2 estágios técnicos em empresas. Sendo assim, você poderá ter experiência em ambas as áreas e escolher qual seguir após a graduação"
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const answerRevealElement = document.getElementById('answer-reveal');
const trueButton = document.getElementById('true-btn');
const falseButton = document.getElementById('false-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function startGame() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    answerRevealElement.classList.add('hide');
    questionContainer.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.classList.remove('fade-in');
    questionElement.classList.add('fade-out');
    setTimeout(() => {
        questionElement.innerText = question.question;
        questionElement.classList.remove('fade-out');
        questionElement.classList.add('fade-in');
    }, 500);
    answerRevealElement.innerText = '';
    trueButton.dataset.correct = question.correctAnswer;
    falseButton.dataset.correct = !question.correctAnswer;
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        document.body.classList.add('flash-green');
    } else {
        document.body.classList.add('flash-red');
    }
    setTimeout(() => {
        document.body.classList.remove('flash-green');
        document.body.classList.remove('flash-red');
    }, 300);
    showAnswer(correct);
}

function showAnswer(correct) {
    answerRevealElement.innerText = questions[currentQuestionIndex].explanation;
    answerRevealElement.classList.remove('hide');
    answerRevealElement.classList.add('fade-in');
    nextButton.classList.remove('hide');
    nextButton.classList.add('show');
    trueButton.disabled = true;
    falseButton.disabled = true;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        trueButton.disabled = false;
        falseButton.disabled = false;
        answerRevealElement.classList.add('hide');
        nextButton.classList.add('hide');
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

function showScore() {
    scoreElement.innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    let feedbackMessage;
    if (score <= 2) {
        feedbackMessage = "Péssima, mas pode melhorar refazendo o quiz!";
    } else if (score > 2 && score < questions.length) {
        feedbackMessage = "Você foi bem, e na próxima com certeza acertará tudo!";
    } else if (score === questions.length) {
        feedbackMessage = "Incrível! Você já sabe tudo sobre licenciatura em computação!";
    }
    feedbackElement.innerText = feedbackMessage;
    scoreContainer.classList.remove('hide');
    scoreContainer.classList.add('fade-in');
    questionContainer.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    nextButton.classList.add('hide');
    answerRevealElement.classList.add('hide');
}

trueButton.addEventListener('click', selectAnswer);
falseButton.addEventListener('click', selectAnswer);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startGame);

startGame();