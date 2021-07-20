import { fleetList, drawBoard, formListeners } from "./domManager";
import { Player } from "./player";

const playerOne = new Player("Player");
fleetList(playerOne);
drawBoard(playerOne.board.playingBoard);
formListeners();

export { playerOne };

// another board for pc
// place ships in random places
// different display
