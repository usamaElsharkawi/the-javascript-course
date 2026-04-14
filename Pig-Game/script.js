'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const Score0 = document.getElementById('score--0');
const Score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHOld = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let playing, currentScore, activePlayer, score;
const switchPlayers = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const init = function () {
  playing = true;
  score = [0, 0];
  Score0.textContent = 0;
  Score1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  Score0.textContent = 0;
  Score1.textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  diceEl.classList.add('hidden');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

btnHOld.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', init);
