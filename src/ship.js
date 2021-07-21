class Ship {
  constructor(name, shipLength) {
    this.name = name;
    this.shipLength = shipLength;
    this.hitTracker = [];
    this.isSunk = false;
  }
  hit() {
    if (this.hitTracker.length < this.shipLength) this.hitTracker.push(true);
    this.checkIfSunk();
  }
  checkIfSunk() {
    this.isSunk = this.hitTracker.length === this.shipLength && this.hitTracker.every(true);
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
