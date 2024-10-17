import { Ship } from "./ship";

const initialize2DArray = (width, height, val = null) =>
  Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(val),
  );

class Gameboard {
  constructor() {
    this.board = initialize2DArray(10, 10);
  }

  placeShip(startLoc, length, direction) {
    let xInc = 0;
    let yInc = 0;

    if (direction === "V") {
      yInc = 1;
    } else {
      xInc = 1;
    }

    const ship = new Ship(length);
    for (let i = 0; i < length; i++) {
      this.board[startLoc[0] + xInc * i][startLoc[1] + yInc * i] = ship;
    }
  }
}

export { Gameboard };