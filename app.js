// Choices and elements
const choices = ["rock", "paper", "scissor"];
const userScore = document.querySelector("#user-score");
const computerScore = document.querySelector("#computer-score");
const popUp = document.querySelector("#result-popup");
const resultHeading = document.querySelector("#result-popup h2");
const resultText = document.querySelector("#result-popup p");

// Track popup state
let popupJustOpened = false;
let popupTimeout = null;

// Function to show popup with guaranteed display time
function showPopup() {
  // Clear any existing timeout
  if (popupTimeout) {
    clearTimeout(popupTimeout);
  }

  // Force remove any existing show class first
  popUp.classList.remove("show");

  // Use a brief delay before showing to ensure DOM updates
  setTimeout(() => {
    // Now show the popup
    popUp.classList.add("show");

    // Set flag to prevent immediate closing
    popupJustOpened = true;

    // Reset the flag after a short delay
    setTimeout(() => {
      popupJustOpened = false;
    }, 10);

    // Set timeout to auto-close popup
    popupTimeout = setTimeout(() => {
      popUp.classList.remove("show");
    }, 1500);
  }, 10);
}

// Function to manually close popup
function closePopup() {
  if (popupJustOpened) return; // Don't close if just opened

  popUp.classList.remove("show");
  if (popupTimeout) {
    clearTimeout(popupTimeout);
  }
}

// Add click event listener to all choices
document.querySelectorAll(".choice").forEach((element) => {
  element.addEventListener("click", function (e) {
    // Prevent event bubbling
    e.stopPropagation();

    const userChoice = this.querySelector("img").getAttribute("name");
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];

    // Determine the winner
    let result = "";
    if (userChoice === randomChoice) {
      result = "draw";
    } else if (
      (userChoice === "rock" && randomChoice === "scissor") ||
      (userChoice === "paper" && randomChoice === "rock") ||
      (userChoice === "scissor" && randomChoice === "paper")
    ) {
      result = "user";
    } else {
      result = "computer";
    }

    // Update scores and result text based on the outcome
    if (result === "user") {
      userScore.innerText = parseInt(userScore.innerText) + 1;
      resultHeading.innerText = "You Won!";
      resultText.innerText = `${capitalize(userChoice)} beats ${capitalize(
        randomChoice
      )}`;
    } else if (result === "computer") {
      computerScore.innerText = parseInt(computerScore.innerText) + 1;
      resultHeading.innerText = "Computer Won!";
      resultText.innerText = `${capitalize(randomChoice)} beats ${capitalize(
        userChoice
      )}`;
    } else {
      resultHeading.innerText = "It's a Draw!";
      resultText.innerText = `${capitalize(userChoice)} ties with ${capitalize(
        randomChoice
      )}`;
    }

    // Show the popup
    showPopup();
  });
});

// Function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Prevent clicks on the popup itself from closing it
document.querySelector(".popup").addEventListener("click", function (e) {
  e.stopPropagation();
});

// Close popup when clicking outside
document.addEventListener("click", function (e) {
  if (popUp.classList.contains("show")) {
    const popupContent = document.querySelector(".popup");

    // Check if click is outside popup content
    if (!popupContent.contains(e.target)) {
      closePopup();
    }
  }
});

// Add this code at the end to ensure any pre-existing show class is removed on page load
document.addEventListener("DOMContentLoaded", function () {
  popUp.classList.remove("show");
});
