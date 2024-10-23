import { Gameboard } from "./gameboard";

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard(type === "Human");
  }

  getGameboard() {
    return this.gameboard;
  }

  #getRandomLoc() {
    return Math.floor(Math.random() * 9);
  }

  #getRandomDir() {
    const choice = ["V", "H"];
    const rnd = Math.floor(Math.random() * 2);
    return choice[rnd];
  }

  resetBoard() {
    this.gameboard = new Gameboard(this.type === "Human");
  }

  randomShips() {
    const ships = this.gameboard.getShips();
    for (let ship of ships) {
      while (true) {
        try {
          this.getGameboard().placeShip(
            ship,
            this.#getRandomLoc(),
            this.#getRandomLoc(),
            this.#getRandomDir(),
          );
          break;
        } catch (error) {}
      }
    }
  }

  computerTurn(opponent) {
    let rndRow = Math.floor(Math.random() * 10);
    let rndCol = Math.floor(Math.random() * 10);

    while (!opponent.getGameboard().validMove(rndRow, rndCol)) {
      rndRow = Math.floor(Math.random() * 10);
      rndCol = Math.floor(Math.random() * 10);
    }
    opponent.getGameboard().receiveAttack(rndRow, rndCol);
  }
}

export { Player };
