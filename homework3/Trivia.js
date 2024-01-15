const questions = [
    {
        question: "Care este capitala Franței?",
        options: ["Berlin", "Londra", "Paris", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Câte state are SUA?",
        options: ["49", "50", "51", "48"],
        correctAnswer: "50"
    },
    {
        question: "Care este cel mai înalt munte din lume?",
        options: ["Muntele Everest", "K2", "Makalu", "Lhotse"],
        correctAnswer: "Muntele Everest"
    },
    {
        question: "Cine a scris drama Hamlet?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Fyodor Dostoevsky"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "Cât este răspunsul la 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "În ce an a fost înființat Google?",
        options: ["1995", "2001", "1998", "2004"],
        correctAnswer: "1998"
    },
    {
        question: "Cine a pictat Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "Care este cea mai mare planetă din sistemul solar?",
        options: ["Marte", "Jupiter", "Saturn", "Venus"],
        correctAnswer: "Jupiter"
    },
    {
        question: "Ce element chimic are simbolul 'O'?",
        options: ["Oxigen", "Osmiu", "Ouriu", "Osoriu"],
        correctAnswer: "Oxigen"
    },
    {
        question: "Care este capitala Japoniei?",
        options: ["Seoul", "Pekin", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const scoreElement = document.getElementById("score");

    if (currentQuestion < questions.length) {
        const currentQues = questions[currentQuestion];

        questionElement.innerText = currentQues.question;

        optionsContainer.innerHTML = "";

        currentQues.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.addEventListener("click", () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });

        scoreElement.innerText = `Score: ${score} / ${questions.length}`;
    } else {
        const triviaContainer = document.getElementById("trivia-container");
        const finalScoreElement = document.getElementById("final-score");
        const tryAgainButton = document.createElement("button");
        tryAgainButton.innerText = "Încercă din nou!";
        tryAgainButton.addEventListener("click", () => location.reload());
        const percentageScore = ((score / questions.length) * 100).toFixed(2);
        triviaContainer.innerHTML = `<h1>Jocul s-a încheiat!</h1><p id="final-score">Scor final: ${score} / ${questions.length} (${percentageScore}%)</p>`;
        triviaContainer.appendChild(tryAgainButton);
    }
}

function checkAnswer(selectedAnswer) {
    const currentQues = questions[currentQuestion];
    const optionsContainer = document.getElementById("options-container");

    disableButtons();

    if (selectedAnswer === currentQues.correctAnswer) {
        optionsContainer.innerHTML = `<p class="correct">Corect!</p>`;
        score++;
    } else {
        optionsContainer.innerHTML = `<p class="incorrect">Greșit! Răspunsul corect este: ${currentQues.correctAnswer}</p>`;
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
        enableButtons();
    }, 2000);
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function disableButtons() {
    const buttons = document.querySelectorAll("#options-container button");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function enableButtons() {
    const buttons = document.querySelectorAll("#options-container button");
    buttons.forEach(button => {
        button.disabled = false;
    });
}

loadQuestion();