const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
