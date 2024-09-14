let player1, player2;
document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
 
    // Validate the player names
    if (player1 === '' || player2 === '') {
        alert('Please enter both player names');
        return;
    }

    // Hide the name input section and show the game section
    document.querySelector('section').style.display = 'none';
    document.querySelector('.game--container').style.display = 'grid';

    // Display the current player's turn
    document.querySelector('.game--status').textContent = `${player1}'s turn`;
});

const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Player ${currentPlayer === 'X' ? player1 : player2} wins!`;

const drawMessage = 'Draw!';
const currentPlayerTurn = () => `It's ${currentPlayer === 'X' ? player1 : player2}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.querySelector('.game--container').addEventListener('click', handleCellClick);

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
function handleRestartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
  
  // Clear the player names
  document.getElementById('player1').value = '';
  document.getElementById('player2').value = '';

  // Hide the game section and show the name input section
  document.querySelector('.game--container').style.display = 'none';
  document.querySelector('section').style.display = 'block';

  // Clear the game status
  statusDisplay.innerHTML = '';
}
function handleCellClick(clickedCellEvent) {
  if (clickedCellEvent.target.classList.contains('cell')) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id) - 1;
    if (!gameActive || gameState[clickedCellIndex] !== '') return;
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
}