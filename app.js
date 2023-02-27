const user = document.getElementById('user');
let userMove = '';
let cptMove = '';
let displayResult = '';
let userScore = 0;
let cptScore = 0;
let userBox = document.getElementById('user-move');
let cptBox = document.getElementById('cpt-move');
let resultBox = document.getElementById('result');
let userScoreBox = document.getElementById('user-score');
let cptScoreBox = document.getElementById('cpt-score');
let userRock = '&#129308';
let cptRock = '&#129307';
let scissorImg = '&#9996';
let paperImg = '&#128400';
let userImg = document.getElementById('user-img');
let cptImg = document.getElementById('cpt-img');
let plusOne = document.getElementById('plus-one');
let cptOne = document.getElementById('cpt-one');

let yPosition = 14;
let handTimer = 0;
let lowerTimer = 0;

let onePosition = 7;
let oneTimer = 0;

function moveHand() {
    for (i = 0; i < 10; i++) {
    yPosition += 0.0625;
    userImg.style.bottom = yPosition + 'rem';
    cptImg.style.bottom = yPosition + 'rem';
    }
    handTimer = setTimeout(moveHand, 30);
    if (yPosition > 14.625) {
        lowerHand();
    }
}
function lowerHand() {
    for (i = 0; i < 10; i++) {
        yPosition -= 0.0625;
        userImg.style.bottom = yPosition + 'rem';
        cptImg.style.bottom = yPosition + 'rem';
        }
        lowerTimer = setTimeout(lowerHand, 30);
        if (yPosition < 14) {
            clearTimeout(lowerTimer);
        }
    clearTimeout(handTimer);
}

function addOne() {
    plusOne.hidden = false;
    onePosition += 1;
    plusOne.style.bottom = onePosition + 'rem';
}

function hideOne() {
    plusOne.hidden = true;
    onePosition = 7;
}

function showOne() {
    addOne();
    setTimeout(addOne, 50);
    setTimeout(addOne, 100);
    setTimeout(addOne, 150);
    setTimeout(addOne, 200);
    setTimeout(addOne, 250);
    setTimeout(hideOne, 1200);
}

function addCpt() {
    cptOne.hidden = false;
    onePosition += 1;
    cptOne.style.bottom = onePosition + 'rem';
}

function cptHide() {
    cptOne.hidden = true;
    onePosition = 7;
}

function showCpt() {
    addCpt();
    setTimeout(addCpt, 50);
    setTimeout(addCpt, 100);
    setTimeout(addCpt, 150);
    setTimeout(addCpt, 200);
    setTimeout(addCpt, 250);
    setTimeout(cptHide, 1200);
}

function startGame() {
    moveHand();
    setTimeout(moveHand, 300);
    setTimeout(moveHand, 600);
    setTimeout(moveHand, 900);
    setTimeout(userTurn, 1200);
}


function userTurn() {
    if (document.getElementById('rock').checked) {
        userMove = 'Rock';
    } else if (document.getElementById('paper').checked) {
        userMove = 'Paper';
    } else if (document.getElementById('scissors').checked) {
        userMove = 'Scissors'
    } else { userMove = ''; }
    document.getElementById('user-selection').hidden = true;
    
    cptTurn();
}

function cptTurn() {
    let cptPick = Math.floor(Math.random() * 3) + 1;
    if (cptPick === 1) {
        cptMove = 'Rock';
    } else if (cptPick === 2) {
        cptMove = 'Paper';
    } else if (cptPick === 3) {
        cptMove = 'Scissors';
    } else { cptMove = ''; }

    runGame();
}

function runGame() {
    if (userMove === 'Paper') {
        userImg.innerHTML = paperImg;
    } else if (userMove === 'Scissors') {
        userImg.innerHTML = scissorImg;
    } else { userImg.innerHTML = userRock; }

    if (cptMove === 'Paper') {
        cptImg.innerHTML = paperImg;
    } else if (cptMove === 'Scissors') {
        cptImg.innerHTML = scissorImg;
    } else { cptImg.innerHTML = cptRock; }

    if (userMove === '' || cptMove === '') {
        displayResult = 'Invalid move, try again';
    } else if (userMove === cptMove) {
        displayResult = 'Tie!';
    } else if (userMove === 'Rock' && cptMove === 'Paper') {
        displayResult = 'Paper covers rock, Computer wins!';
        cptScore++;
        showCpt();
    } else if (userMove === 'Rock' && cptMove === 'Scissors') {
        displayResult = 'Rock smashes scissors, you win!';
        userScore++;
        showOne();
    } else if (userMove === 'Paper' && cptMove === 'Rock') {
        displayResult = 'Paper covers rock, you win!';
        userScore++;
        showOne();
    } else if (userMove === 'Paper' && cptMove === 'Scissors') {
        displayResult = 'Scissors cut paper, Computer wins!';
        cptScore++;
        showCpt();
    } else if (userMove === 'Scissors' && cptMove === 'Rock') {
        displayResult = 'Rock smashes scissors, Computer wins!';
        cptScore++;
        showCpt();
    } else if (userMove === 'Scissors' && cptMove === 'Paper') {
        displayResult = 'Scissors cut paper, you win!';
        userScore++;
        showOne();
    } else { displayResult = 'Something went wrong, please try again.' }

    document.getElementById('repeat').hidden = false;
    updateDisplay();
}

function updateDisplay() {
    let displayUser = document.createTextNode(userMove);
    let displayCpt = document.createTextNode(cptMove);
    let result = document.createTextNode(displayResult);

    userBox.appendChild(displayUser);
    cptBox.appendChild(displayCpt);
    resultBox.appendChild(result);
    userScoreBox.innerHTML = userScore;
    cptScoreBox.innerHTML = cptScore;
}

function tryAgain() {
    userBox.removeChild(userBox.lastChild);
    cptBox.removeChild(cptBox.lastChild);
    resultBox.removeChild(resultBox.lastChild);

    userImg.innerHTML = userRock;
    cptImg.innerHTML = cptRock;

    userMove = '';
    cptMove = '';
    displayResult = '';

    document.getElementById('repeat').hidden = true;
    document.getElementById('user-selection').hidden = false;
}