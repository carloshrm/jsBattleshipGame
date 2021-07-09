class Ship {
  constructor(length) {
    this.length = length;
    this.hitTracker = [].fill(false, length);
    this.isSunk = false;
  }
  hit(pos) {
    if (this.hitTracker[pos] !== undefined) this.hitTracker[pos] = true;
    if (this.checkIfSunk()) this.isSunk = true;
  }
  checkIfSunk() {
    return this.hitTracker.every(true);
  }
}
// board is 2 arrays, inside each spot is either 0 for nothing, 1 for empty hit, or a reference to a ship object
// board = [[pos,pos,pos], [pos,pos,pos], [ship1,ship1,ship1]]
// to hit, board[2][0].hit()
// [{},]

class GameBoard {
  constructor(player1, player2) {
    this.attackCount = 0;
    this.board = [].fill([].fill({ shipOrWater: 0, isHit: false }, 10), 10);
    this.shipList = [];
    this.playerList = [player1, player2];
  }

  addShip(length, pos, orientation) {
    let newShip = new Ship(length);
    let shipEntry = { shipObject: newShip, position: pos, isVertical: orientation };
    this.shipList.push(shipEntry);
  }

  dropShell(positionY, positionX) {
    const hitLocation = this.board[positionX][positionY].shipOrWater;
  }
  // if certain number of ships, start game
}
