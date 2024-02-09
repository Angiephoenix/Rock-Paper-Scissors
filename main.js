let userOptions = document.querySelectorAll(".rps");
userOptions.forEach((element) => element.addEventListener("click", draw));

document.querySelector(".reset").onclick = resetScores;

let scores = JSON.parse(localStorage.getItem("scores")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function resultCount() {
  document.querySelector(
    ".result-count"
  ).textContent = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}
resultCount();

function displayFeedback(result, moves) {
  document.querySelector(".result").textContent = result;
  document.querySelector(".moves").innerHTML = moves;
}

function resetScores() {
  scores = { wins: 0, losses: 0, ties: 0 };
  resultCount();
  displayFeedback("Factory Reset! 😂", "");
}

function draw(event) {
  let options = ["Rock", "Paper", "Scissors"];
  let computerMove = options[Math.floor(Math.random() * 3)];
  let userMoveImg = event.currentTarget.querySelector("img");
  let userMoveSymbol = userMoveImg.outerHTML; // Get the HTML of the image element

  let computerMoveImg = `<img src="./img/${computerMove.toLowerCase()}.png" alt="${computerMove}">`;

  let result;
  let moves;

  if (
    (userMoveSymbol.includes("rock.png") &&
      computerMoveImg.includes("scissors.png")) ||
    (userMoveSymbol.includes("paper.png") &&
      computerMoveImg.includes("rock.png")) ||
    (userMoveSymbol.includes("scissors.png") &&
      computerMoveImg.includes("paper.png"))
  ) {
    result = "You win! 🥳";
    moves = `You: ${userMoveSymbol}; Computer: ${computerMoveImg}.`;
    scores.wins += 1;
  } else if (userMoveSymbol === computerMoveImg) {
    result = "It's a tie! 😑";
    moves = `You: ${userMoveSymbol}; Computer: ${computerMoveImg}.`;
    scores.ties += 1;
  } else {
    result = "You lose! 😩";
    moves = `You: ${userMoveSymbol}; Computer: ${computerMoveImg}.`;
    scores.losses += 1;
  }

  displayFeedback(result, moves);
  resultCount();
  localStorage.setItem("scores", JSON.stringify(scores));
}
