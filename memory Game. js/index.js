//naming variables
const moves = document.querySelector("#moves-count");
const wrongMoves = document.querySelector("#wrongmoves-count");
const timeValue = document.querySelector("#time");
const controlCont = document.querySelector(".controls-container");
let resetBtn = document.querySelector(".Reset");
let startBtn = document.querySelector(".startbutton");
let pauseBtn = document.querySelector(".pausebutton");
let resumeBtn = document.querySelector(".resumebutton");
const gameCont = document.querySelector(".game");
const gameCont2 = document.querySelector(".game2");
const result = document.querySelector("#result");
const resultTime = document.querySelector("#resulttime");

// added more emojis to the game
const emojis = ['🍕','🍕','😍','😍','😈','😈','🥶','🥶','🤑','🤑','👾','👾','❤','❤','👽','👽'];
var shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1);
//I created a function to play the game so I have put everything in a function to run it only when you start the game.
function playGame() {
  for ( var i =0; i<emojis.length; i++){
    let box = document.createElement('div')
    box.className ='items';
    box.innerHTML = shuf_emojis[i]
    //    game funtion js 
    box.onclick = function(){
        moveCard()
        this.classList.add('boxOpen')
        setTimeout(function(){
            if(document.querySelectorAll('.boxOpen').length > 1){
                if(document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML){
                    document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch')
                    document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch')
                    
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')
 
                    if(document.querySelectorAll('.boxMatch').length == emojis.length){
                      gameOver();
                    }
                } else {
                 //add some shake animations in the our style.css to the cards when clicked and unmatched
                   wrongMoveCard();
                   document.querySelectorAll('.boxOpen')[0].classList.add('shake');
                   document.querySelectorAll('.boxOpen')[1].classList.add('shake');
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')
                }
            }
        },500) 
    }
 
    gameCont.appendChild(box);
 }
}


//Initial Time
let seconds = 0;
let minutes = 0;
//For timer
let timeGenerator = () => {
  seconds += 1;
  //minutes condition
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //formatting time in displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//move conditions
let moveCount = 0;
function moveCard() {
  moveCount = moveCount + 1;
  moves.innerHTML = `<span>Moves:</span>${moveCount}`;
}

//wrongmove conditions
let wrongmoveCount = 0;
function wrongMoveCard() {
  wrongmoveCount = wrongmoveCount + 1;
  wrongMoves.innerHTML = `<span>Wrong Moves:</span>${wrongmoveCount}`;
}
// when all cards are matched it opens a page that tells you YOU WIN and the number of moves you made and time used to complete the game
function gameOver() {
  gameCont.classList.add("hidden")
  controlCont.classList.remove("hidden")
  resetBtn.classList.add("hidden");
  pauseBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  wrongMoves.classList.add("hidden");
  resumeBtn.classList.add("hidden");
  startBtn.classList.add("hidden");
  moves.classList.add("hidden");
  timeValue.classList.add("hidden");
  clearInterval(interval);
  result.innerHTML = `<h4>Moves:${moveCount}</h4>
  <h4>Wrong Moves:${wrongmoveCount}</h4>`
  resultTime.innerHTML = timeValue.innerHTML
  
}

// A function tp start playing the game when the startButton is clicked.
function startGame() {
  startBtn.classList.add("hidden");
  resumeBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  moveCount = 0;
  seconds = 0;
  minutes = 0;
  //play the game
  playGame();
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //gameOver();
}

// refreshes the page and takes you back to starting the game
function BacktoGame() {
 location.reload();
}
// A function to pause the game. it stops the timer and deactivates all actions in the gameContainer div
function pauseGame() {
  startBtn.classList.add("hidden");
  pauseBtn.classList.add("hidden");
  resumeBtn.classList.remove("hidden")
  clearInterval(interval);
  gameCont.classList.add("disabled");
}
//a function to resume the game after being paused. It set the timer moving and activate the buttons on the gameContainer
function resumeGame() {
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  resumeBtn.classList.add("hidden")
  gameCont.classList.remove("disabled");
  interval = setInterval(timeGenerator, 1000);
}
// function viewCards() {
//   let openCards = document.querySelectorAll(".boxOpen")
//   setInterval(openCards.classList.add("boxMatch"),3000) 
// }