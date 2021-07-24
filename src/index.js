import {
  fleetList,
  formListeners,
  removeDragDropListeners,
  setGameplayListeners,
  boardDisplay,
  generateRandomCoords,
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
  let result;
  do {
    let [x, y] = generateRandomCoords();
    result = playerOne.board.dropShell(x, y);
  } while (!result);
  playerTwo.board.setShipsOnBoard();
  playerOne.board.setShipsOnBoard();
  setGameplayListeners();
}

export { playerOne, startGame, runTurn };

// another board for pc
// place ships in random places
// different display
