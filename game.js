
// variable to store the player's cash
let playerCash = 100;
let numberOfResets = -1;

// array to store the possibilities for each reel
let reel1 = ["cherry", "lemon", "orange", "plum", "bell", "bar", "seven", "blank"];
let reel2 = ["cherry", "lemon", "orange", "plum", "bell", "bar", "seven", "blank"];
let reel3 = ["cherry", "lemon", "orange", "plum", "bell", "bar", "seven", "blank"];

// array to store the current state of the slot machine
let currentSlotMachineState = [];

let animationIndex = 0;
let animationImages = ["images/cherry.jpg", "images/lemon.jpg", "images/plum.jpg", "images/orange.jpg"];
let animationInterval = setInterval(animateSlotMachine, 100);

let moneySign = "$";

let reel1Images = {
  "cherry": new Image(),
  "lemon": new Image(),
  "orange": new Image(),
  "plum": new Image(),
  "bell": new Image(),
  "bar": new Image(),
  "seven": new Image(),
  "blank": new Image(),
};

let reel2Images = {
  "cherry": new Image(),
  "lemon": new Image(),
  "orange": new Image(),
  "plum": new Image(),
  "bell": new Image(),
  "bar": new Image(),
  "seven": new Image(),
  "blank": new Image(),
};

let reel3Images = {
  "cherry": new Image(),
  "lemon": new Image(),
  "orange": new Image(),
  "plum": new Image(),
  "bell": new Image(),
  "bar": new Image(),
  "seven": new Image(),
  "blank": new Image(),
};

reel1Images["cherry"].src = "images/cherry.jpg";
reel1Images["lemon"].src = "images/lemon.jpg";
reel1Images["orange"].src = "images/orange.jpg";
reel1Images["plum"].src = "images/plum.jpg";
reel1Images["bell"].src = "images/bell.jpg";
reel1Images["bar"].src = "images/bar.jpg";
reel1Images["seven"].src = "images/seven.jpg";
reel1Images["blank"].src = "images/blank.jpg";

reel2Images["cherry"].src = "images/cherry.jpg";
reel2Images["lemon"].src = "images/lemon.jpg";
reel2Images["orange"].src = "images/orange.jpg";
reel2Images["plum"].src = "images/plum.jpg";
reel2Images["bell"].src = "images/bell.jpg";
reel2Images["bar"].src = "images/bar.jpg";
reel2Images["seven"].src = "images/seven.jpg";
reel2Images["blank"].src = "images/blank.jpg";

reel3Images["cherry"].src = "images/cherry.jpg";
reel3Images["lemon"].src = "images/lemon.jpg";
reel3Images["orange"].src = "images/orange.jpg";
reel3Images["plum"].src = "images/plum.jpg";
reel3Images["bell"].src = "images/bell.jpg";
reel3Images["bar"].src = "images/bar.jpg";
reel3Images["seven"].src = "images/seven.jpg";
reel3Images["blank"].src = "images/blank.jpg";

let paytable = [
  { combination: ["cherry", "cherry", "cherry"], payout: 10 },
  { combination: ["lemon", "lemon", "lemon"], payout: 20 },
  { combination: ["orange", "orange", "orange"], payout: 30 },
  { combination: ["plum", "plum", "plum"], payout: 40 },
  { combination: ["bell", "bell", "bell"], payout: 50 },
  { combination: ["bar", "bar", "bar"], payout: 60 },
  { combination: ["seven", "seven", "seven"], payout: 70 },
  // add more combinations as necessary
];

function checkPayout(state) {
  for (let i = 0; i < paytable.length; i++) {
    if (paytable[i].combination.toString() === state.toString()) {
      return paytable[i].payout;
    }
  }
  return 0;
}
function spin() {
  if (playerCash > 0) {
  // decrease player's cash by 3
  playerCash -= 3;

  // update player's cash display
  updateCashDisplay();

  let reel1Index, reel2Index, reel3Index;
  // pick random indexes for each reel
  do {
    reel1Index = Math.floor(Math.random() * reel1.length);
    reel2Index = Math.floor(Math.random() * reel1.length);
    reel3Index = Math.floor(Math.random() * reel1.length);
  } while (reel1[reel1Index] !== reel2[reel2Index] && reel1[reel1Index] !== reel3[reel3Index] && reel2[reel2Index] !== reel3[reel3Index]);

  // store the result in the currentSlotMachineState array
  currentSlotMachineState = [reel1[reel1Index], reel2[reel2Index], reel3[reel3Index]];
  
  // get the canvas element and its context
  let canvas = document.getElementById("slotmachine");
  let ctx = canvas.getContext("2d");
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // animateSlotMachine
  animateSlotMachine()
  
  
  // call a function to display the current state of the slot machine
  displaySlotMachine();
  }
  else {
    alert("You don't have enough money to spin!");
	// Create reset button
	if (numberOfResets == -1){
	let resetButton = document.createElement("button");
	resetButton.innerHTML = "Reset";
	resetButton.id = "reset-cash";
	resetButton.onclick = resetCash;
	let buttonContainer = document.getElementById("reset-button");
	buttonContainer.appendChild(resetButton);
	numberOfResets++;
	}
  }
}
function displaySlotMachine() {
  // get the canvas element and its context
  let canvas = document.getElementById("slotmachine");
  let ctx = canvas.getContext("2d");

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  

  // display the current state of the slot machine
  ctx.drawImage(reel1Images[currentSlotMachineState[0]], 10, 10, 80, 80);
  ctx.drawImage(reel2Images[currentSlotMachineState[1]], 115, 10, 80, 80);
  ctx.drawImage(reel3Images[currentSlotMachineState[2]], 220, 10, 80, 80);
  
  // Reset the table 
  document.getElementById("cherry").style.backgroundColor = "inherit";
  document.getElementById("lemon").style.backgroundColor = "inherit";
  document.getElementById("orange").style.backgroundColor = "inherit";
  document.getElementById("plum").style.backgroundColor = "inherit";
  document.getElementById("bell").style.backgroundColor = "inherit";
  document.getElementById("bar").style.backgroundColor = "inherit";
  document.getElementById("seven").style.backgroundColor = "inherit";
  
  // calculate and display the payout
  let payout = checkPayout(currentSlotMachineState);
  playerCash += payout;
  if (payout <= 0){
	document.getElementById("slotmachine").style.borderColor = "red";
  } 
  else if (payout == 10) {
	  document.getElementById("cherry").style.backgroundColor = "green";
	  document.getElementById("slotmachine").style.borderColor = "green";
  }
  else if (payout == 20) {
	  document.getElementById("lemon").style.backgroundColor = "green";
	  document.getElementById("slotmachine").style.borderColor = "green";
  }
  else if (payout == 30) {
	  document.getElementById("orange").style.backgroundColor = "green";
	  document.getElementById("slotmachine").style.borderColor = "green";
  }
  else if (payout == 40) {
	  document.getElementById("plum").style.backgroundColor = "green";
	  document.getElementById("slotmachine").style.borderColor = "green";
  }
  else if (payout == 50) {
	  document.getElementById("bell").style.backgroundColor = "green";
	  document.getElementById("slotmachine").style.borderColor = "green";
  }
  else if (payout == 60) {
	  document.getElementById("bar").style.backgroundColor = "green";
	  document.getElementById("slotmachine").style.borderColor = "green";
  }
  else if (payout == 70) {
	  document.getElementById("seven").style.backgroundColor = "green";
	  document.getElementById("slotmachine").style.borderColor = "green";
  }
  else {
	  
	document.getElementById("slotmachine").style.borderColor = "green";
  }
  updateCashDisplay();
}

function animateSlotMachine() {
	let canvas = document.getElementById("slotmachine");
  let ctx = canvas.getContext("2d");
  //ctx.drawImage(animationImages[randomInteger(0,animationImages.length-1)], 10, 10, 80, 80);
  for (let i = 0; i < animationInterval; i++) {

    //ctx.drawImage(animationImages[randomInteger(0,animationImages.length-1)], 10, 10, 80, 80);
}
  
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetCash() {
	playerCash = 100;
	updateCashDisplay();
	numberOfResets++;
}

function updateCashDisplay() {
	
	document.getElementById("cash").innerHTML = moneySign.concat(playerCash);
}