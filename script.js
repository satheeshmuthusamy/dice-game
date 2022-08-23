'use strict';

//selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
//instead of querySelector we can use getElementById -Its much faster than queryselector and we can neglecte # symbol
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//declaring scores to 0
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//declaring variables

let scores,currentScore,playing,activePlayer;
const init=function(){

    //assigining the values
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
//calling or invoking the function to give all the initial values
init();
//starting new game
// const newGame=document.querySelector('.btn--new');

const switchPlayer = function () {
  //resetting player score to zero if the dice value is zero
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; //it does noth change anything
  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //adding opacity to the active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //here we can dynamically load all 6 images by changing src's -img src

    //3.check for rolled 1: if true ,switch to next player
    if (dice !== 1) {
      //add dice to current player
      currentScore += dice;
      console.log(dice);
      //current0El.textContent=currentScore;//
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent=currentScore;
    } else {
      //switchPlayer
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //console.log('Hold button');
    //Add current score to active players score
    scores[`${activePlayer}`] += currentScore;
    //scores[0]+=currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // score0El.textContent=scores[0];
    // score1El.textContent=scores[1];

    //2. check if the players score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//restarting the game again
btnNew.addEventListener('click', init);
//here we dont call this function js calls the function
