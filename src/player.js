import { Gameboard } from "./gameboard";

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  getGameboard() {
    return this.gameboard;
  }
}

export { Player };
