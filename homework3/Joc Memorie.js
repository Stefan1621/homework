document.addEventListener('DOMContentLoaded', function () {
    const audioFiles = ['dog.wav', 'cat.wav', 'bird.wav'];
    let sequence = [];
    let userSequence = [];
    let gameStarted = false;
    let score = 0;

    const startButton = document.getElementById('start-btn');
    const buttonsContainer = document.getElementById('buttons-container');
    const scoreElement = document.getElementById('score');

    startButton.addEventListener('click', startGame);

    function startGame() {
        gameStarted = true;
        startButton.disabled = true;
        score = 0;
        updateScore();
        generateSequence();
        playSequence();
    }

    function generateSequence() {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        sequence.push(audioFiles[randomIndex]);
    }

    function playSequence() {
        let i = 0;
        const intervalId = setInterval(function () {
            playSound(sequence[i]);
            i++;
            if (i >= sequence.length) {
                clearInterval(intervalId);
                userSequence = [];
                enableUserInput();
            }
        }, 1000);
    }

    function playSound(sound) {
        const audio = new Audio(sound);
        audio.play();
    }

    function enableUserInput() {
        buttonsContainer.innerHTML = '';
        for (let i = 0; i < audioFiles.length; i++) {
            const buttonWrapper = document.createElement('div');
            buttonWrapper.classList.add('button-wrapper');

            const button = document.createElement('button');
            const buttonText = audioFiles[i].replace('.wav', '');
            button.textContent = buttonText.charAt(0).toUpperCase() + buttonText.slice(1);
            button.addEventListener('click', function () {
                userSequence.push(audioFiles[i]);
                checkUserInput();
                updateClickCount(buttonWrapper);
            });

            const clickCount = document.createElement('span');
            clickCount.textContent = '0';

            buttonWrapper.appendChild(button);
            buttonWrapper.appendChild(clickCount);
            buttonsContainer.appendChild(buttonWrapper);
        }
    }

    function checkUserInput() {
        const index = userSequence.length - 1;
        if (userSequence[index] !== sequence[index]) {
            endGame();
        } else if (userSequence.length === sequence.length) {
            disableUserInput();
            score++;
            updateScore();
            setTimeout(function () {
                generateSequence();
                playSequence();
            }, 1000);
        }
    }

    function disableUserInput() {
        buttonsContainer.innerHTML = '';
    }

    function endGame() {
        gameStarted = false;
        startButton.disabled = false;
        alert(`Game Over! Your score is ${score}.`);
        sequence = [];
        resetClickCounts();
    }

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateClickCount(buttonWrapper) {
        const clickCountElement = buttonWrapper.querySelector('span');
        let currentClickCount = parseInt(clickCountElement.textContent, 10);
        currentClickCount++;
        clickCountElement.textContent = currentClickCount.toString();
    }

    function resetClickCounts() {
        const clickCountElements = document.querySelectorAll('.button-wrapper span');
        clickCountElements.forEach((element) => {
            element.textContent = '0';
        });
    }
});