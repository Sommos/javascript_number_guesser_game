// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// GUI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessButton = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assigning GUI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

      
// listen for users guess
guessButton.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  
  // validate the users guess
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if user was correct
  if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct, you win!`);
  } else {
    // if user is wrong then subtract guess and check their lives
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(false, `${winningNum} was the winning number, you lost!`);
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left.`, 'red');
    }
  }
});

function gameOver(won, msg) {
  let color;
  // if won is equal to true, then that color will equal green, else that color will equal red
  won === true ? color = 'green' : color = 'red';
  // if user is correct disable input, change color of box and message to green and send message
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  // play again
  guessButton.value = 'Play again';
  guessButton.className += 'play-again';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}