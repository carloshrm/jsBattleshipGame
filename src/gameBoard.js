import { drawBoard } from "./domManager";
import { Ship } from "./ship";

class GameBoard {
  constructor() {
    this.attackCount = 0;
    this.playingBoard = GameBoard.setBlankBoard();
    this.placedShips = [];
  }

  static setBlankBoard() {
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

  addShipToList(shipObject, pos, orientation) {
    let shipEntry = { shipObject: shipObject, position: pos, isVertical: orientation };
    if (this.iterateShipLength(shipEntry) == false) {
      alert("has ship already");
      return false;
    }
    this.placedShips.push(shipEntry);
    this.refreshBoard();
  }

  refreshBoard() {
    this.placedShips.forEach((ship) => {
      let vertCoord = ship.position[0];
      let horCoord = ship.position[1];
      for (let i = 0; i < ship.shipObject.shipLength; i++) {
        this.playingBoard[vertCoord][horCoord] = {
          ship: ship.shipObject,
          hitMarker: false,
        };
        ship.isVertical ? vertCoord++ : horCoord++;
      }
    });
    drawBoard(this.playingBoard);
  }

  iterateShipLength(targetShip, switchRemove = false) {
    let vertPos = targetShip.position[0];
    let horPos = targetShip.position[1];
    for (let i = 0; i < targetShip.shipObject.shipLength; i++) {
      if (this.playingBoard[vertPos][horPos] !== false && !switchRemove) {
        return false;
      }
      if (switchRemove) this.playingBoard[vertPos][horPos] = false;
      targetShip.isVertical ? vertPos++ : horPos++;
    }
    return true;
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
