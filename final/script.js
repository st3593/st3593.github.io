let greenTile= document.getElementById("tile-green");
let redTile = document.getElementById("tile-red");
let yellowTile = document.getElementById("tile-yellow");
let blueTile = document.getElementById("tile-blue");

let greenSound = document.getElementById("bell");
let redSound = document.getElementById("ho-ho-ho");
let yellowSound = document.getElementById("giggle");
let blueSound = document.getElementById("chime");

greenTile.addEventListener('click', playGreenSound);
redTile.addEventListener('click', playRedSound);
yellowTile.addEventListener('click', playYellowSound);
blueTile.addEventListener('click', playBlueSound);

function playGreenSound() {
  greenSound.play();
}

function playRedSound() {
  redSound.play();
}

function playYellowSound() {
  yellowSound.play();
}

function playBlueSound() {
  blueSound.play();
}