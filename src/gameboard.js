import { Ship } from "./ship";

const initialize2DArray = (width, height, val = null) =>
  Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(val),
  );

class Gameboard {
  constructor() {
    this.board = initialize2DArray(10, 10);
    this.ships = new Array();
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
    this.ships.push(ship);
    for (let i = 0; i < length; i++) {
      this.board[startLoc[1] + yInc * i][startLoc[0] + xInc * i] = ship;
    }
  }
  getBoard() {
    return this.board;
  }

  receiveAttack(loc) {
    let content = this.board[loc[0]][loc[1]];

    if (content instanceof Ship) {
      content.hit();
    } else {
      this.board[loc[0]][loc[1]] = "X";
    }
  }

  allSunk() {
    return this.ships.filter((ship) => ship.isSunk());
  }
}

export { Gameboard };
