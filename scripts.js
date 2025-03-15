let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function IsZeroBalance() {
  if (PlayerBalance >= 1) {
    return true;
  } else {
    const balanceElement = document.querySelector('.balance');
    balanceElement.textContent = `Your balance is not enough for the game, please top it up.`;
    setTimeout(() => {
      balanceElement.textContent = `Your balance: ${PlayerBalance}`;
    }, 3000);
    return false;
  }
}
/*
function autoplay(){
  if (!isAutoPlaying){
    intervalID = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }else{
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
} 
*/
const autoplayButton = document.querySelector('.auto-play-button');
let intervalId = null;
autoplayButton.addEventListener('click', () => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    autoplayButton.textContent = 'Stop autoplay';
  } else {
    autoplayButton.textContent = 'Autoplay';
    clearInterval(intervalId);
    intervalId = null;
  }
});

updateScoreElement();
let PlayerBalance = 2;
function UpdateBalance(){
  document.querySelector('.balance').textContent = `You balance:${PlayerBalance}`;
}
function IsZeroBalance() {
  if (PlayerBalance >= 1) {
    return true;
  } else {
    document.querySelector('.balance').textContent = `Your balance is not enough for the game, please top it up.`;
    setTimeout(() => {
      document.querySelector('.balance').textContent = `Your balance: ${PlayerBalance}`;
    }, 3000);
    return false;
  }
}

function playGame(playerMove) {
  if (IsZeroBalance()){
    const computerMove = pickComputerMove();
    let result = '';
    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
        PlayerBalance -= 1;
      } else if (computerMove === 'paper') {
        result = 'You win.';
        PlayerBalance += 1;
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
        PlayerBalance -= 0.25;
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
        PlayerBalance += 1;
      } else if (computerMove === 'paper') {
        result = 'Tie.';
        PlayerBalance -= 0.25;
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
        PlayerBalance -= 1;
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
        PlayerBalance -= 0.25;
      } else if (computerMove === 'paper') {
        result = 'You lose.';
        PlayerBalance -= 1;
      } else if (computerMove === 'scissors') {
        result = 'You win.';
        PlayerBalance += 1;
      }
    }

    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = 
    `You
    <img class="move-ico" src="image/${playerMove}-emoji.png" alt="">
    - 
    <img class = "move-ico" src = "image/${computerMove}-emoji.png">
    Computer`;
    UpdateBalance();
  }
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function resetscore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}
let confirmationAcrive = false;
function resetButtonManager(){
  console.log('вход')
  if (!confirmationAcrive){
    confirmationAcrive = true;
    document.querySelector('.cinfirmationmessageowner').innerHTML=(
      '<div class="confirmationmessage"><p class="confirmmessagetext">Are youn sure you want to reset the score?</p><button class="yes">yes</button><button class="no">no</button></div>'
    )
    document.querySelector('.yes').addEventListener('click',()=>{
      resetscore();
      document.querySelector('.cinfirmationmessageowner').innerHTML=('');
      confirmationAcrive = false;
    })
    document.querySelector('.no').addEventListener('click',()=>{
      document.querySelector('.cinfirmationmessageowner').innerHTML=('');
      confirmationAcrive = false;
    })
  }else{confirmationAcrive = false;document.querySelector('.cinfirmationmessageowner').innerHTML=('')};
}