import { makeShipList, drawBoard } from "./domManager";
import { Player } from "./player";

const playerOne = new Player("Anon");
drawBoard(playerOne.board.playingBoard);
makeShipList(playerOne.shipList);

export { playerOne };

// another board for pc
// place ships in random places
// different display
