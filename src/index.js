import {
  fleetList,
  formListeners,
  removeDragDropListeners,
  setGameplayListeners,
  boardDisplay,
  generateRandomCoords,
  removeGameplayListeners,
} from "./domManager";
import { Player } from "./player";

let playerOne = new Player("Player");
let playerTwo = undefined;
fleetList(playerOne);
playerOne.board.setShipsOnBoard();
formListeners();

function startGame() {
  removeDragDropListeners();
  boardDisplay();
  playerTwo = Player.computerPlayerSetup();
  setGameplayListeners();
}
function runTurn(clickX, clickY) {
  playerTwo.board.dropShell(clickX, clickY);
  setTimeout(attackPlayer(), 1500);
  function attackPlayer() {
    let result;
    while (!result) {
      let [x, y] = generateRandomCoords();
      result = playerOne.board.dropShell(x, y);
    }
  }
  playerTwo.board.setShipsOnBoard();
  playerOne.board.setShipsOnBoard();
  setGameplayListeners();
  if (playerTwo.shipList.every((ship) => ship.isSunk === true)) {
    showWinner(playerOne.name);
  } else if (playerOne.shipList.every((ship) => ship.isSunk === true)) {
    showWinner(playerTwo.name);
  }
}

function showWinner(player) {
  removeGameplayListeners();
  feedback_log.innerText = player + " has won!";
}

export { playerOne, startGame, runTurn };

// another board for pc
// place ships in random places
// different display
