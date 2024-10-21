import { Gameboard } from "./gameboard";

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard(type === "Human");
  }

  getGameboard() {
    return this.gameboard;
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
