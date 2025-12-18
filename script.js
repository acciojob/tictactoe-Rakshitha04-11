//your JS code here. If required.
const p1Input = document.getElementById("player-1");
const p2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");

const form = document.getElementById("player-form");
const gameBoard = document.getElementById("game-board");
const message = document.querySelector(".message");
const boardCells = document.querySelectorAll(".board div");

let player1, player2;
let currentPlayer = "X";
let turnName = "";

let board = ["", "", "", "", "", "", "", "", ""];

submitBtn.addEventListener("click", () => {
  player1 = p1Input.value.trim();
  player2 = p2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter names!");
    return;
  }

  form.style.display = "none";
  gameBoard.style.display = "block";

  turnName = player1;
  message.textContent = `${turnName}, you're up`;
});

boardCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.id - 1;

    if (board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      message.textContent = `${turnName}, congratulations you won!`;
      highlightWinner(checkWinner());
      disableBoard();
      return;
    }

    switchPlayer();
  });
});

function switchPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
    turnName = player2;
  } else {
    currentPlayer = "X";
    turnName = player1;
  }
  message.textContent = `${turnName}, you're up`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return pattern;
    }
  }
  return null;
}

function highlightWinner(pattern) {
  pattern.forEach(idx => {
    document.getElementById(idx + 1).classList.add("win");
  });
}

function disableBoard() {
  boardCells.forEach(cell => (cell.style.pointerEvents = "none"));
}
