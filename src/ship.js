class Ship {
  constructor(name, shipLength) {
    this.name = name;
    this.shipLength = shipLength;
    this.hitTracker = 0;
    this.isSunk = false;
  }
  hit() {
    if (this.hitTracker < this.shipLength) this.hitTracker++;
    this.checkIfSunk();
  }
  checkIfSunk() {
    this.isSunk = this.hitTracker === this.length;
  }
  static shipSet = [
    new Ship("Carrier", 5),
    new Ship("Battleship", 4),
    new Ship("Cruiser", 3),
    new Ship("Submarine", 3),
    new Ship("Destroyer", 2),
  ];
}

export { Ship };
