const moves = document.querySelector("#moves-count")
const timeValue = document.querySelector("#time")
const controlCont = document.querySelector(".controls-container")
let resetBtn = document.querySelector(".Reset")
let startBtn = document.querySelector(".startbutton")
const gameCont = document.querySelector(".game")
const result = document.querySelector("#result")

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
const timeGenerator = () => {
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
let winnCount = 0;
function moveCard() {
  moveCount = moveCount + 1;
  moves.innerHTML = `<span>Moves:</span>${moveCount}`;
}
// when all cards are matched it opens a page that tells you YOU WIN and the number of moves you made to complete the game
function gameOver() {
  gameCont.classList.add("hidden")
  controlCont.classList.remove("hidden")
  resetBtn.classList.add("hidden");
  startBtn.classList.add("hidden");
  moves.classList.add("hidden");
  result.innerHTML = `<h4>Moves:${moveCount}</h4>`
  clearInterval(interval);
}

function startGame() {
  //movesCount = 0;
  seconds = 0;
  minutes = 0;
  //play the game
  playGame();
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //gameOver();
}
//yet to work on it
// function playAgain() {
//   location.reload();
//   window.onload = playGame();
// }

// refreshes the page and takes you back to starting the game
function BacktoGame() {
 location.reload();
}