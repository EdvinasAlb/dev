// document.querySelector('.message').textContent;
// document.querySelector('.message').textContent = 'Correct Number!';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 23;
// document.querySelector('.guess').value;

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
//---------------------------------------------------------------------
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

const displayNummber = function (number) {
  document.querySelector(".number").textContent = number;
};

const backgroundColor = function (color) {
  document.querySelector("body").style.backgroundColor = color;
};

const numberWidth = function (width) {
  document.querySelector(".number").style.width = width;
};

const highScore = function (highscore) {
  document.querySelector(".highscore").textContent = highscore;
};

const guessValue = function (value) {
  document.querySelector(".guess").value = value;
};

//------------------------------------------------------------------------
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  //When There Is No Input
  if (!guess) {
    displayMessage("No Number!");

    //When Player Wins
  } else if (guess === secretNumber) {
    displayMessage("Correct Number!");
    backgroundColor("#60b347");
    numberWidth("30rem");
    displayNummber(secretNumber);

    if (score > highscore) {
      highscore = score;
      highScore(highscore);
    }

    //When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too Hight!" : "Too Low!");
      score--;
      displayScore(score);
    } else {
      displayMessage("You Lost The Game!");
      displayScore(0);
    }
  }

  //When Guess Is Too High
  //   } else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too Hight!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You Lost The Game!';
  //       document.querySelector('.score').textContent = 0;
  //     }

  //When Guess Is Too Low
  //   } else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too Low!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You Lost The Game!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing...");
  displayScore(score);
  displayNummber("?");
  guessValue("");
  backgroundColor("#222");
  numberWidth("20rem");
});
