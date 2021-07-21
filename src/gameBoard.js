import { drawBoard } from "./domManager";
import { Ship } from "./ship";

class GameBoard {
  constructor() {
    this.attackCount = 0;
    this.playingBoard = GameBoard.setBlankBoard();
    this.placedShips = [];
    this.humanOwner = true;
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
    drawBoard(this.playingBoard, this.humanOwner);
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
    let hitLocation = this.playingBoard[x][y];
    if (hitLocation === true) return;
    if (hitLocation.ship !== undefined && hitLocation.ship.isSunk === false) {
      hitLocation.ship.hit();
      hitLocation.hitMarker = true;
    } else {
      hitLocation = true;
    }
  }
}

export { GameBoard };
