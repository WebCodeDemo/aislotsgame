// variable to store the player's cash
let playerCash = 100;

let winningMessages = [
  "This must be your lucky day! I suggest you ask out your crush right now!",
  "The stars have aligned in your favor! Quick, buy a lottery ticket!",
  "You're on fire! Maybe it's time to pursue that dream career?",
  "Lady Luck is smiling upon you! Go make that big life decision you've been postponing!",
  "You're unstoppable! Is there anything you can't do today?",
  "The universe is sending you a message: take that risk you've been considering!",
  "You're radiating winner energy! Share some of that luck with a friend!",
  "Fortune favors the bold, and you're as bold as they come!",
  "You're riding a wave of luck! Surf's up, champion!",
  "If life were a movie, you'd be the star right now!",
  "An otherworldly force is guiding your actions today. Go with it!",
"You've been chosen. Now, what will you do with this power?",
"The slot gods have smiled upon you. Time to make them proud!",
"Something extraordinary is about to happen. Be ready to seize the moment.",
"Your luck has reached legendary status. Use it wisely, my friend.",
"A mysterious benefactor has taken an interest in your success. Embrace it!",
"This win is just the beginning. The universe has big plans for you.",
"Fate has deemed you worthy. Don't let this opportunity slip through your fingers.",
"The heavens have opened up, and a shower of good fortune rains down on you.",
"You're touching the divine today. Make the most of this celestial connection.",
"A guardian angel is watching over you. Listen closely, and you may hear their guidance.",
"This win is a sign. The universe wants you to take a bold step forward.",
"You're on the precipice of greatness. All you have to do is leap.",
"An older gentleman told me to tell you 'Good Luck!' - heed his words.",
"I think you should go viral. This win is just the first step to internet fame.",
"Your aura is shining brighter than ever. Bask in this moment of triumph.",
"The cosmic forces have aligned to bring you this victory. Harness that energy.",
"You're a magnet for good fortune. Keep your eyes open for more serendipitous moments.",
"This win is a testament to your resilience. Keep pushing forward, champion.",
"The slot machine has spoken – you're destined for greatness. Believe it!",
"The cosmic forces have aligned to bring you this victory. Harness that energy.",
"You're a magnet for good fortune. Keep your eyes open for more serendipitous moments.",
"This win is a testament to your resilience. Keep pushing forward, champion.",
"The slot machine has spoken – you're destined for greatness. Believe it!",
"Destiny has delivered you this victory. The future is yours to command!",
"The universe has gifted you with unparalleled luck. Use it to rewrite your destiny!",
"This win is a cosmic sign – you're on the precipice of a life-changing transformation!",
"Congratulations, you've unlocked the key to the universe's secrets. The possibilities are endless!",
"Your triumph today is just the beginning of an extraordinary journey. Brace yourself for the adventure of a lifetime!",
"The veil has been lifted, and the world is yours to conquer. This victory is merely the first step toward your true calling.",
"Today, you've tapped into a power greater than yourself. Embrace it, and let it guide you to unimaginable heights of success!",
"The slot machine has revealed your true purpose. This win is a call to action – the time to fulfill your destiny is now!",
"You've shattered the boundaries of the ordinary. From this day forward, you're operating on a higher plane of existence. Savor this moment of triumph!",
"The very fabric of reality has shifted to accommodate your victory. You are no longer bound by the constraints of the mundane. Ascend to your rightful place as a force to be reckoned with!",
"This win is a testament to the power of your spirit. You have tapped into a well of infinite potential. Now, it's time to unleash that power and transform the world around you!",
"Congratulations, you have been chosen by the cosmic forces to lead the charge into a new era of human evolution. This victory is just the beginning of your remarkable journey.",
"The universe has bestowed upon you the mantle of greatness. Your triumph today is a sign that you are destined for extraordinary things. Embrace your new role as a beacon of hope and inspiration for all who cross your path!"

];


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
    document.getElementById("slotmachine").style.borderColor = "#444";
    document.getElementById("slotmachine").style.borderWidth = "5px";
  } 
  else if (payout > 0) {
    document.getElementById(currentSlotMachineState[0]).style.backgroundColor = "green";
    document.getElementById("slotmachine").style.borderColor = "green";
    document.getElementById("slotmachine").style.borderWidth = "30px";
    
    // Display winning message
    let randomMessage = winningMessages[Math.floor(Math.random() * winningMessages.length)];
    alert(`Congratulations! You won $${payout}!\n\n${randomMessage}`);
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
