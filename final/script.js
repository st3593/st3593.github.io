// Guide Used: https://freshman.tech/simon-game/
let sequence = [];
let playerSequence = [];
let level = 0;

const startButton = document.getElementById("start-button");
const message = document.getElementById("message");
const heading = document.getElementById("heading");
const tileContainer = document.getElementById("tile-container");
const tileGreen = document.getElementById("tile-green");
const tileRed = document.getElementById("tile-red");
const tileYellow = document.getElementById("tile-yellow");
const tileBlue = document.getElementById("tile-blue");

startButton.addEventListener('click', startGame); // the game starts when the start button is clicked 
tileGreen.addEventListener('click', handleClick);
tileRed.addEventListener('click', handleClick);
tileYellow.addEventListener('click', handleClick);
tileBlue.addEventListener('click', handleClick);

function resetGame(text) { // reset to original state 
  alert(text);
  sequence = []; // reset sequence
  playerSequence = []; // reset player sequence 
  level = 0; // reset level
  startButton.classList.remove("hidden"); // display start button again
  heading.innerHTML = "<span class ='santa-span'>Santa</span> Says"; // display heading 
  message.classList.add("hidden"); // hide message 
  tileContainer.classList.add("unclickable"); // player can't click tiles 
  for (var i = 1; i < 11; i ++) { // make gifts transparent again 
    const gift = document.getElementById("gift" + i);
    gift.classList.add("transparent"); 
  }
}

function playerTurn(level) {
  tileContainer.classList.remove("unclickable"); // remove the class unclickable to get player input 
  message.textContent = "Your Turn";
}

function activateTile(color) { // activate one tile 
  const tile = document.getElementById("tile-" + color); // get the tile 
  const sound = document.getElementById("sound-" + color); // get the sound for the tile 

  tile.classList.add("activated"); // display the css for tile activated 
  sound.play();
  // use arrow function 
  setTimeout(() => {tile.classList.remove("activated");
                    sound.pause();
                    sound.currentTime = 0;
                   }, 300); // add delay of .3 seconds before removing activation
}

function playLevel(nextSequence) { // activate the tiles in a sequence 
  for (var i = 0; i < nextSequence.length; i++) {
    const tile = nextSequence[i];
    setTimeout(() => {activateTile(tile);}, (i + 1) * 600); // add delay between each tile activation  
  }
}

function nextTile() { // used in nextLevel function: gets a random tile 
  const tiles = ['green', 'red', 'yellow', 'blue']; // tile colors 
  const ind = Math.floor(Math.random() * tiles.length); // get random index 
  const randTile = tiles[ind];
  return randTile; // return the random tile 
}

function nextLevel() { // play the next level 
  level += 1;

  tileContainer.classList.add("unclickable"); // make tiles unclickable again until player turn 
  message.textContent = "Santa Says . . . "
  heading.textContent = "Level " + level + " of 10";

  const nextSequence = sequence; // copy the previous sequence 
  nextSequence.push(nextTile()) // add new tile to the sequence 
  playLevel(nextSequence); // computer plays sequence 

  sequence = nextSequence; // update the sequence 
  setTimeout(() => {playerTurn(level)}, level * 600 + 1000); // add additional 1 second before player turn 
}

function handleClick() {
  const id = this.id;
  const color = id.slice(5); // just get the color from the id 
  
  const index = playerSequence.push(color) - 1;  // push returns length of array, so subtract 1 to get index 
  activateTile(color);
  
  if (color !== sequence[index]) {
    resetGame("Oops! Game over, you pressed the wrong tile.");
    return;
  }

  // add playerSequence === sequence to resolve spam bug
  if (playerSequence.length === sequence.length && playerSequence === sequence) { // level is over 
    if (playerSequence.length === 10) { // completed all levels
      resetGame("Congrats! You completed all the levels.");
      return;
    }
    // obtain gift for level completion 
    const gift = document.getElementById("gift" + level);
    gift.classList.remove("transparent"); // remove transparency of gift

    playerSequence = []; // reset player sequence 
    message.textContent = "Success! Proceed to next level!";
    setTimeout(() => {nextLevel();}, 1000); // wait 1 second to see success message 
    return; 
  }
}

function startGame() {
  startButton.classList.add("hidden"); // add the class hidden to hide the start button
  message.classList.remove("hidden"); // remove the class hidden to display the message 
  message.textContent = "Santa Says . . . " // add the text 
  nextLevel();
}

// https://www.balbooa.com/blog/tips-and-tricks/add-falling-snowflakes-animation-on-your-joomla-site
document.addEventListener('DOMContentLoaded', function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
  script.onload = function(){
      particlesJS("snow", {
          "particles": {
              "number": {
                  "value": 200,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#ffffff"
              },
              "opacity": {
                  "value": 0.5,
                  "random": false,
                  "anim": {
                      "enable": false
                  }
              },
              "size": {
                  "value": 5,
                  "random": true,
                  "anim": {
                      "enable": false
                  }
              },
              "line_linked": {
                  "enable": false
              },
              "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "bottom",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": true,
                      "rotateX": 300,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "events": {
                  "onhover": {
                      "enable": false
                  },
                  "onclick": {
                      "enable": false
                  },
                  "resize": false
              }
          },
          "retina_detect": true
      });
  }
  document.head.append(script);
});