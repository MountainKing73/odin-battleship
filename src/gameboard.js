import { Ship } from "./ship";

const initialize2DArray = (width, height, val = null) =>
  Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(val),
  );

class Gameboard {
  constructor(showShips) {
    this.board = initialize2DArray(10, 10);
    this.ships = new Array();
    this.ships.push(new Ship("Carrier", 5));
    this.ships.push(new Ship("Battleship", 4));
    this.ships.push(new Ship("Destroyer", 3));
    this.ships.push(new Ship("Submarine", 3));
    this.ships.push(new Ship("Patrol Boat", 2));
    this.showShips = showShips;
    this.moves = new Array();
  }

  #validPlacement(row, col, length, direction) {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      return false;
    }

    let xInc = 0;
    let yInc = 0;

    if (direction === "V") {
      yInc = 1;
    } else {
      xInc = 1;
    }

    console.log("for loop start:");

    for (let i = 0; i < length; i++) {
      if (row + i * yInc > 9 || col + i * xInc > 9) {
        return false;
      }
      if (this.board[row + yInc * i][col + xInc * i] != null) {
        return false;
      }
    }

    return true;
  }

  placeShip(ship, row, col, direction) {
    if (!this.#validPlacement(row, col, ship.getLength(), direction)) {
      throw new Error("Invalid placement");
    }
    let xInc = 0;
    let yInc = 0;

    if (direction === "V") {
      yInc = 1;
    } else {
      xInc = 1;
    }

    for (let i = 0; i < ship.getLength(); i++) {
      this.board[row + yInc * i][col + xInc * i] = ship;
    }
  }

  getBoard() {
    return this.board;
  }

  getShowShips() {
    return this.showShips;
  }

  getShips() {
    return this.ships;
  }

  getRemainingShips() {
    return this.ships.filter((ship) => !ship.isSunk()).length;
  }

  validMove(row, col) {
    // Use filter to test if move is in list
    let test = this.moves.filter((loc) => loc.row === row && loc.col === col);

    return row >= 0 && row < 10 && col >= 0 && col < 10 && test.length === 0;
  }

  receiveAttack(row, col) {
    let content = this.board[row][col];

    if (content instanceof Ship) {
      content.hit();
      this.board[row][col] = "H";
    } else {
      this.board[row][col] = "X";
    }

    this.moves.push({ row: row, col: col });
  }

  allSunk() {
    return this.ships.filter((ship) => ship.isSunk());
  }
}

export { Gameboard };
