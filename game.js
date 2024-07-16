// variable to store the player's cash
let playerCash = 100;

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

// Load images for each reel
for (let reel of [reel1Images, reel2Images, reel3Images]) {
  for (let symbol in reel) {
    reel[symbol].src = `images/${symbol}.jpg`;
  }
}

let paytable = [
  { combination: ["cherry", "cherry", "cherry"], payout: 10 },
  { combination: ["lemon", "lemon", "lemon"], payout: 20 },
  { combination: ["orange", "orange", "orange"], payout: 30 },
  { combination: ["plum", "plum", "plum"], payout: 40 },
  { combination: ["bell", "bell", "bell"], payout: 50 },
  { combination: ["bar", "bar", "bar"], payout: 60 },
  { combination: ["seven", "seven", "seven"], payout: 70 },
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
  // decrease player's cash by 3
  playerCash -= 3;

  // update player's cash display
  updateCashDisplay();

  let reel1Index, reel2Index, reel3Index;
  // pick random indexes for each reel
  do {
    reel1Index = Math.floor(Math.random() * reel1.length);
    reel2Index = Math.floor(Math.random() * reel2.length);
    reel3Index = Math.floor(Math.random() * reel3.length);
  } while (reel1[reel1Index] !== reel2[reel2Index] && 
           reel1[reel1Index] !== reel3[reel3Index] && 
           reel2[reel2Index] !== reel3[reel3Index]);

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

function displaySlotMachine() {
  // get the canvas element and its context
  let canvas = document.getElementById("slotmachine");
  let ctx = canvas.getContext("2d");

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calculate the size and position of each image
  let imageSize = 200;
  let spacing = 60; // Space between images
  
  // display the current state of the slot machine
  ctx.drawImage(reel1Images[currentSlotMachineState[0]], 10, 10, imageSize, imageSize);
  ctx.drawImage(reel2Images[currentSlotMachineState[1]], 10 + imageSize + spacing, 10, imageSize, imageSize);
  ctx.drawImage(reel3Images[currentSlotMachineState[2]], 10 + 2 * (imageSize + spacing), 10, imageSize, imageSize);
  
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
  else if (payout > 0) {
    document.getElementById(currentSlotMachineState[0]).style.backgroundColor = "green";
    document.getElementById("slotmachine").style.borderColor = "green";
  }
  updateCashDisplay();
}

function animateSlotMachine() {
  let canvas = document.getElementById("slotmachine");
  let ctx = canvas.getContext("2d");
  // Add animation logic here if needed
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateCashDisplay() {
  let cashDisplay = playerCash >= 0 ? moneySign + playerCash : "-" + moneySign + Math.abs(playerCash);
  document.getElementById("cash").innerHTML = cashDisplay;
}

// Initialize the game
updateCashDisplay();
