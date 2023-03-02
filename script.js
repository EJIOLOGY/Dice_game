'use strict';
//Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current0E2 = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayers = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current0E2.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();
//Starting Conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

//Rolling dice functionality
btnRoll.addEventListener('click', function() {
        //1. Generate a random dice roll
        if (playing) {
            const dice = Math.trunc(Math.random() * 6) + 1;
            console.log(dice);
            //2. Display dice
            diceEl.classList.remove('hidden');
            diceEl.src = `dice-${dice}.png`;
            //3. Check if it is a 1, if true, switch to next player
            if (dice !== 1) {
                currentScore += dice;
                document.getElementById(`current--${activePlayer}`).textContent =
                    currentScore;
            } else {
                //Switch to next player}
                switchPlayers();
            }
        }
    }),
    'false';
//Holding Functionality
btnHold.addEventListener('click', function() {
    // 1.Add curent score to active player's score
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // 2.Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            diceEl.classList.add('hidden');
        }
        // 4. Switch to next player
        switchPlayers();
    }
});

btnNew.addEventListener('click', init, 'false');