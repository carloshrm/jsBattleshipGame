class Ship {
  constructor(shipLength, name) {
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
  static types = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
  ];
}

export { Ship };
