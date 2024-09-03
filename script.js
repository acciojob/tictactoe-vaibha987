const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");
const gameBoard = document.getElementById("gameBoard");
const nameForm = document.getElementById("nameForm");
const cells = document.querySelectorAll(".cell");
const messageDiv = document.querySelector(".message");

// Initialize game variables
let currentPlayer = "";
let player1 = "";
let player2 = "";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;
let moveCount = 0; // Counter to track the number of moves

// Start game after names are submitted
submitButton.addEventListener("click", () => {
  player1 = player1Input.value;
  player2 = player2Input.value;
  if (player1 && player2) {
    currentPlayer = player1;
    messageDiv.innerText = `${currentPlayer}, you're up!`;
    nameForm.style.display = "none";
    gameBoard.style.display = "block";
  }
});

// Cell click event
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerText === "" && !isGameOver) {
      cell.innerText = currentPlayer === player1 ? "X" : "O";
      board[cell.id - 1] = cell.innerText;
      moveCount++;

      if (checkWinner()) {
        messageDiv.innerText = `${currentPlayer}, congratulations you won!`;
        isGameOver = true;
      } else if (moveCount === 9) {
        // Check for tie when all cells are filled
        messageDiv.innerText = `It's a tie!`;
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        messageDiv.innerText = `${currentPlayer}, you're up!`;
      }
    }
  });
});

// Check for winner
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

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
