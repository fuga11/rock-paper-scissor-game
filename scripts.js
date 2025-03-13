let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();
let PlayerBalance = 10;
let isAutoPlaying = false;
let intervalID;
function UpdateBalance(){
  document.querySelector('.balance').textContent = `You balance:${PlayerBalance}`;
}
function autoplay(){
  if (!isAutoPlaying){
    intervalID = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    UpdateBalanc();
  }else{
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
} 

function playGame(playerMove) {
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