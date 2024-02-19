const gameContainer = document.getElementById("game");
let flip1 = null;
let flip2 = null;
let cardFlip = 0;
let nonClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (nonClick) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!flip1 || !flip2) {
    currentCard.classList.add("flipped");
    flip1 = flip1 || currentCard;
    flip2 = currentCard === flip1 ? null : currentCard;
  }

  if (flip1 && flip2) {
    nonClick = true;
    // debugger
    let gif1 = flip1.className;
    let gif2 = flip2.className;

    if (gif1 === gif2) {
      cardFlip += 2;
      flip1.removeEventListener("click", handleCardClick);
      flip2.removeEventListener("click", handleCardClick);
      flip1 = null;
      flip2 = null;
      nonClick = false;
    } else {
      setTimeout(function () {
        flip1.style.backgroundColor = "";
        flip2.style.backgroundColor = "";
        flip1.classList.remove("flipped");
        flip2.classList.remove("flipped");
        flip1 = null;
        flip2 = null;
        nonClick = false;
      }, 1000);
    }
  }

  if (cardFlip === COLORS.length) alert("You Win, game over!");
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
console.log("hello!");
