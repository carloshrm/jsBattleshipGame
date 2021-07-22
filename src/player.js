import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";

class Player {
  constructor(name) {
    this.name = name; //get from DOM
    this.board = new GameBoard();
    this.shipList = Ship.shipSet;
  }
  // needs AI
}

export { Player };
