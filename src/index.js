class Ship {
  constructor(length) {
    this.shipLength = length;
    this.hitTracker = [];
    this.isSunk = false;
  }
  hit() {
    if (this.hitTracker.length < this.shipLength) this.hitTracker.push(true);
    this.checkIfSunk();
  }
  checkIfSunk() {
    this.isSunk = this.hitTracker.every(true) && this.hitTracker.length === this.shipLength;
  }
}

class GameBoard {
  constructor() {
    this.attackCount = 0;
    this.playingBoard = GameBoard.setBoard();
    this.shipList = [];
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

  addShip(length, pos, orientation) {
    let newShip = new Ship(length);
    let shipEntry = { shipObject: newShip, position: pos, isVertical: orientation };
    this.shipList.push(shipEntry);
    this.setShips();
  }

  setShips() {
    this.shipList.forEach((ship) => {
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

  dropShell(positionY, positionX) {
    const hitLocation = this.playingBoard[positionX][positionY].spotContent;
  }
  // each player gets a board
  // if certain number of ships, start game
  // TODO hit counter checks if the spot has been attacked, if not, marks the attack and checks if it hit a ship
  // if it hits a ship, set a counter on that object
}

const board = new GameBoard();
board.addShip(3, [3, 3], true);
console.log(board.playingBoard);
