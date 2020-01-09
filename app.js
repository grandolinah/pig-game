/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores,
  activePlayer,
  roundScore,
  isPlaying,
  lastTurn,
  lastTurnTwo,
  winningPoints;

const nextPlayer = () => {
  roundScore = 0;

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  document.querySelector(`#current-0`).textContent = 0;
  document.querySelector(`#current-1`).textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice-two').style.display = 'none';
  document.querySelector('.dice').style.display = 'none';
};

const setFinalScore = () => {
  let finalScore = Number(document.querySelector('#final-score').value);

  if (finalScore) {
    winningPoints = finalScore;
  }

  document.querySelector('#final-score').value = '';
}

const playTurn = () => {
  if (isPlaying) {
    let dice = Math.floor(Math.random() * 6 + 1);
    let diceTwo = Math.floor(Math.random() * 6 + 1);

    lastTurn = dice;
    lastTurnTwo = diceTwo;

    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice-two').style.display = 'block';

    document.querySelector('.dice-two').src = `dice-${diceTwo}.png`;
    document.querySelector('.dice').src = `dice-${dice}.png`;


    if (dice !== 1 && diceTwo !== 1) {
      roundScore += dice + diceTwo;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else if (lastTurn === 6 && dice === 6) {
      //lose all global and round points
      scores[activePlayer] = 0;
      document.querySelector(`#current-${activePlayer}`).textContent = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = 0;
      nextPlayer();
    } else {
      nextPlayer();
    }
  }
};

const holdScore = () => {
  if (isPlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    document.querySelector(`#current-${activePlayer}`).textContent = 0;

    if (scores[activePlayer] >= winningPoints) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';

      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-two').style.display = 'none';

      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');

      isPlaying = false;
    } else {
      nextPlayer();
    }
  }
};

const init = () => {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  isPlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-two').style.display = 'none';

  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-0').textContent = 0;

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.btn-new').addEventListener('click', init);
  document.querySelector('.btn-roll').addEventListener('click', playTurn);
  document.querySelector('.btn-hold').addEventListener('click', holdScore);
  document.querySelector('.btn-score').addEventListener('click', setFinalScore);
};

init();