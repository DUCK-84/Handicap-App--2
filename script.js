const btn = document.getElementById("submitBtn");
const blueTees = document.getElementById("chariot-blues");
const whiteTees = document.getElementById("chariot-whites");
const handyBtn = document.getElementById("handicapBtn");
const scoreInput = document.getElementById("score");
const ratingInput = document.getElementById("rating");
const slopeInput = document.getElementById("slope");
let paragraph = document.getElementById("paragraph");
// Add blueTees and whiteTees as default rating/slopes
blueTees.addEventListener("click", function () {
  ratingInput.value = 73.4;
  slopeInput.value = 133;
});
whiteTees.addEventListener("click", function () {
  ratingInput.value = 70.8;
  slopeInput.value = 130;
});
// Create Empty Object Arrays
const objectArray = [];
const scoreDifferentialArray = [];
//Create function to store user inputs into an array of objects
const scoreDifferential = () => {
  let golfData = {
    score: +scoreInput.value,
    rating: +ratingInput.value,
    slope: +slopeInput.value,
    avgScore: function () {
      return ((this.score - this.rating) * 113) / this.slope;
    },
  };
  // Push the object into the Array
  objectArray.push(golfData);
  scoreDifferentialArray.push(golfData.avgScore());
  // Clear score input fields once submitted
  scoreInput.value = "";
};
// Declare variable count outside of event listener to run a for loop
// .. so I can iterate over indexes and display current number variable
let count = 0;
// Set the button functionality
btn.addEventListener("click", function () {
  if (
    scoreInput.value != "" &&
    ratingInput.value != "" &&
    slopeInput.value != ""
  ) {
    scoreDifferential();

    paragraph.setAttribute("class", "innerHTML");
    let text = "Current Score Differential(s)..";
    paragraph.innerHTML = text;
    for (let i = 0; i < scoreDifferentialArray.length; i++) {
      // count++;
      // alert(count);
      // DISPLAY NUMBER WITH ONE DECIMAL PLACE ROUNDED
      let number = Math.round(scoreDifferentialArray[count] * 10) / 10;
      count++;
      paragraph.innerHTML += `<br>${number}`;
    }
    // Set variable count back to 0 when page is refreshed
    count = 0;
  } else {
    alert("All input fields are required before submitting a score");
  }
});
// Enter key
scoreInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    btn.click();
  }
});
//
//

// RUN HANDICAP BUTTON ONCE 3 SETS OF DATA HAVE BEEN ENTERED
handyBtn.addEventListener("click", function () {
  if (scoreDifferentialArray.length < 3) {
    alert(
      `You must provide a minimum of 3 Scores, ratings, and slope before getting handicap`
    );
  } else if (
    scoreDifferentialArray.length >= 9 &&
    scoreDifferentialArray.length < 12
  ) {
    // GET AVERAGE FOR THE SCORE DIFFERENTIALS
  } else if (scoreDifferentialArray.length >= 3) {
    let sum = 0;
    for (let number of scoreDifferentialArray) {
      sum += number;
    }
    // GET HANDICAP WITH SUM DIVIDED BY ARRAY LENGTH * 0.96
    let text = "HANDICAP: ";
    number = (sum / scoreDifferentialArray.length) * 0.96;
    let roundedNumber = Math.round(number * 10) / 10;
    paragraph.innerHTML = `${text} ${roundedNumber}`;
    if (number <= 10) {
      alert(`Impressive! Tiger Tiger Woods yall`);
    } else if (number > 10 && number < 15) {
      alert(`Not too bad! Average golf`);
    } else {
      alert(`Give the game up. It's time to take a look at other sports.`);
    }
  }
});
//
