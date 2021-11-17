var items = Array(1,2,3,4,5);
var item = items[Math.floor(Math.random()*items.length)];
console.log(items);
console.log(item);

let theBody = document.querySelector("body");

const buttonOne = document.getElementById("firstButton");
const buttonTwo = document.getElementById("secondButton");
const buttonThree = document.getElementById("thirdButton");
const buttonFour = document.getElementById("fourthButton");
const buttonFive = document.getElementById("fifthButton");
const successImage = document.getElementById("success");

buttonOne.addEventListener('click', function1);
buttonTwo.addEventListener('click', function2);
buttonThree.addEventListener('click', function3);
buttonFour.addEventListener('click', function4);
buttonFive.addEventListener('click', function5);

function function1(){
  console.log("button clicked!!");
  if (item == 1) {
    console.log("success");
    theBody.style.backgroundColor = "green";
    successImage.style.visibility = "visible";
  }
  else {
    console.log("failure");
    theBody.style.backgroundColor = "red";
    successImage.style.visibility = "hidden";
  }
}

function function2(){
  console.log("button clicked!!");
  if (item == 2) {
    console.log("success");
    theBody.style.backgroundColor = "green";
    successImage.style.visibility = "visible";
  }
  else {
    console.log("failure");
    theBody.style.backgroundColor = "red";
    successImage.style.visibility = "hidden";
  }
}

function function3(){
  console.log("button clicked!!");
  if (item == 3) {
    console.log("success");
    theBody.style.backgroundColor = "green";
    successImage.style.visibility = "visible";
  }
  else {
    console.log("failure");
    theBody.style.backgroundColor = "red";
    successImage.style.visibility = "hidden";
  }
}

function function4(){
  console.log("button clicked!!");
  if (item == 4) {
    console.log("success");
    theBody.style.backgroundColor = "green";
    successImage.style.visibility = "visible";
  }
  else {
    console.log("failure");
    theBody.style.backgroundColor = "red";
    successImage.style.visibility = "hidden";
  }
}

function function5(){
  console.log("button clicked!!");
  if (item == 5) {
    console.log("success");
    theBody.style.backgroundColor = "green";
    successImage.style.visibility = "visible";
  }
  else {
    console.log("failure");
    theBody.style.backgroundColor = "red";
    successImage.style.visibility = "hidden";
  }
}

