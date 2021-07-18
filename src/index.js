import { fleetList, drawBoard } from "./domManager";
import { Player } from "./player";

const playerOne = new Player("Anon");
drawBoard(playerOne.board.playingBoard);
fleetList(playerOne.shipList);
const playerTwo = new Player("Anon");
drawBoard(playerTwo.board.playingBoard, false);

export { playerOne };

// another board for pc
// place ships in random places
// different display
