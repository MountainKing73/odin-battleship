class Ship {
  constructor(len) {
    this.len = len;
    this.hits = 0;
    this.sunk = false;
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
