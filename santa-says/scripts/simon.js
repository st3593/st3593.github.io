/*
Simon Game Guide: https://freshman.tech/simon-game/

Libraries:
SweetAlert2 (used to design alert): https://sweetalert2.github.io/#examples
Animate.css (used to animate alert): https://animate.style/
particles.js (used for background snow and falling gifts animation): https://vincentgarreau.com/particles.js/
*/

let sequence = [];
let playerSequence = [];
let level = 0;
let display_gifts = false;

const startButton = document.getElementById("start-button");
const message = document.getElementById("message");
const heading = document.getElementById("heading");
const tileContainer = document.getElementById("tile-container");
const tileGreen = document.getElementById("tile-green");
const tileRed = document.getElementById("tile-red");
const tileYellow = document.getElementById("tile-yellow");
const tileBlue = document.getElementById("tile-blue");
const gifts = document.getElementById("gifts");

startButton.addEventListener('click', startGame); // the game starts when the start button is clicked 
tileGreen.addEventListener('click', handleClick);
tileRed.addEventListener('click', handleClick);
tileYellow.addEventListener('click', handleClick);
tileBlue.addEventListener('click', handleClick);

function resetGame(error) { // reset to original state 
  if (error) { // display failure alert 
    Swal.fire({
      icon: 'error',
      title: 'Oops! Game over, you pressed the wrong tile.',
      text: 'Santa failed to deliver your presents.',
      showClass: {
        popup: 'animate__animated animate__shakeX',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
  else { // display success alert 
    Swal.fire({
      icon: 'success',
      title: 'Congrats! You completed all the levels.',
      text: 'Santa has delivered all your presents!',
      showClass: {
        popup: 'animate__animated animate__tada',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    display_gifts = true; // display falling gifts 
  }
  console.log(display_gifts)
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
  if (display_gifts) { // display falling gifts 
    particlesJS("gifts", {
      "particles": {
          "number": {
              "value": 20,
              "density": {
                  "enable": true,
                  "value_area": 800
              }
          },
          "color": {
              "value": "#ffffff"
          },
          shape: {
            type: "image",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: {
              src:
                "images/falling-gift.png",
              width: 250,
              height: 250
            }
          },
          "opacity": {
              "value": 1,
              "random": false,
              "anim": {
                  "enable": false
              }
          },
          "size": {
              "value": 10,
              "random": false,
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

function handleClick() { // tile is clicked 
  const id = this.id;
  const color = id.slice(5); // just get the color from the id 
  
  const index = playerSequence.push(color) - 1;  // push returns length of array, so subtract 1 to get index 
  activateTile(color);

  if (color !== sequence[index]) {
    resetGame(true); // error = true 
    return;
  }

  if (playerSequence.length === sequence.length) { // level is over 
    console.log(playerSequence);
    if (playerSequence.length === 10) { // completed all levels
      resetGame(false); // error = false
      return;
    }
    // obtain gift for level completion 
    const gift = document.getElementById("gift" + level);
    gift.classList.remove("transparent"); // remove transparency of gift

    tileContainer.classList.add("unclickable"); // make tiles unclickable again 
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

// Background snow animation 
particlesJS("snow2", {
  "particles": {
      "number": {
          "value": 100,
          "density": {
              "enable": true,
              "value_area": 800
          }
      },
      "color": {
          "value": "#ffffff"
      },
      "opacity": {
          "value": 0.7,
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

// Falling gifts 
/*
particlesJS("gifts", {
  "particles": {
      "number": {
          "value": 20,
          "density": {
              "enable": true,
              "value_area": 800
          }
      },
      "color": {
          "value": "#ffffff"
      },
      shape: {
        type: "image",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: {
          src:
            "images/falling-gift.png",
          width: 250,
          height: 250
        }
      },
      "opacity": {
          "value": 1,
          "random": false,
          "anim": {
              "enable": false
          }
      },
      "size": {
          "value": 10,
          "random": false,
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
*/