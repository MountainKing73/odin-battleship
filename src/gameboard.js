import { Ship } from "./ship";

const initialize2DArray = (width, height, val = null) =>
  Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(val),
  );

class Gameboard {
  constructor(showShips) {
    this.board = initialize2DArray(10, 10);
    this.ships = new Array();
    this.showShips = showShips;
  }

  #validPlacement(startLoc, length, direction) {
    if (
      startLoc[0] < 0 ||
      startLoc[0] > 9 ||
      startLoc[1] < 0 ||
      startLoc[1] > 9
    ) {
      return false;
    }

    let xInc = 0;
    let yInc = 0;

    if (direction === "V") {
      yInc = 1;
    } else {
      xInc = 1;
    }

    for (let i = 0; i < length; i++) {
      if (startLoc[1] + i * yInc > 9 || startLoc[0] + i * xInc > 9) {
        return false;
      }
      if (this.board[startLoc[1] + yInc * i][startLoc[0] + xInc * i] != null) {
        return false;
      }
    }

    return true;
  }

  placeShip(startLoc, length, direction) {
    if (!this.#validPlacement(startLoc, length, direction)) {
      throw new Error("Invalid placement");
    }
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

  getShowShips() {
    return this.showShips;
  }

  getRemainingShips() {
    return this.ships.filter((ship) => !ship.isSunk()).length;
  }

  receiveAttack(loc) {
    let content = this.board[loc[0]][loc[1]];

    if (content instanceof Ship) {
      content.hit();
      this.board[loc[0]][loc[1]] = "H";
    } else {
      this.board[loc[0]][loc[1]] = "X";
    }
  }

  allSunk() {
    return this.ships.filter((ship) => ship.isSunk());
  }
}

export { Gameboard };
