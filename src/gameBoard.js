import { Ship } from "./ship";

class GameBoard {
  constructor() {
    this.attackCount = 0;
    this.playingBoard = GameBoard.setBoard();
    this.placedShips = [];
  }
  static setBoard() {
    let horizontal = [];
    for (let i = 0; i < 10; i++) {
      let vertical = [];
      for (let j = 0; j < 10; j++) {
        vertical[j] = false;
      }
      horizontal[i] = vertical;
    }
    return horizontal;
  }
  addShipToList(length, pos, orientation) {
    let newShip = new Ship(length);
    let shipEntry = { shipObject: newShip, position: pos, isVertical: orientation };
    if (this.playingBoard[pos[0]][pos[1]] !== false) {
      // a ship is already there warning
      return;
    }
    this.placedShips.push(shipEntry);
    this.setShipsOnBoard();
  }
  setShipsOnBoard() {
    this.placedShips.forEach((ship) => {
      let horizontalCoord = ship.position[0];
      let verticalCoord = ship.position[1];
      for (let i = 0; i < ship.shipObject.shipLength; i++) {
        this.playingBoard[horizontalCoord][verticalCoord] = {
          ship: ship.shipObject,
          hitMarker: false,
        };
        ship.isVertical ? verticalCoord++ : horizontalCoord++;
      }
    });
  }
  dropShell(x, y) {
    //move to game logic
    let hitLocation = this.playingBoard[x][y];
    if (hitLocation === true) return;
    if (hitLocation.ship !== undefined && hitLocation.ship.isSunk === false) {
      hitLocation.ship.hit();
      hitLocation.hitMarker = true;
    } else {
      hitLocation = true;
    }
  }
  // each player gets a board
  // if certain number of ships, start game
  // TODO hit counter checks if the spot has been attacked, if not, marks the attack and checks if it hit a ship
  // if it hits a ship, set a counter on that object
  // TODO something that controls game flow, sets ships, makes boards, sets them on players players and swaps turns
}

export { GameBoard };
