import { fleetList, drawBoard, setDragDropListeners } from "./domManager";
import { Player } from "./player";

const playerOne = new Player("Anon");
fleetList(playerOne);
drawBoard(playerOne);
// const playerTwo = new Player("Anon");
// drawBoard(playerTwo.board.playingBoard, false);

export { playerOne };

// another board for pc
// place ships in random places
// different display
