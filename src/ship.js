class Ship {
  constructor(name, len) {
    this.name = name;
    this.len = len;
    this.hits = 0;
    this.sunk = false;
  }

  getName() {
    return this.name;
  }

  getLength() {
    return this.len;
  }

  hit() {
    this.hits += 1;
    if (this.hits >= this.len) {
      this.sunk = true;
    }
  }

  getHits() {
    return this.hits;
  }

  isSunk() {
    return this.sunk;
  }
}

export { Ship };
