import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { GameUI } from "./gameui";
import { Ship } from "./ship";

class GameController {
  constructor() {
    this.player1 = new Player("Human");
    this.player2 = new Player("Human");
    this.gameUI = new GameUI(
      this.player1.getGameboard(),
      this.player2.getGameboard(),
    );
    this.gameUI.refreshBoards();
  }

  randomShips(player) {
    player.getGameboard().placeShip([0, 0], 2, "V");
    player.getGameboard().placeShip([1, 0], 3, "V");
    player.getGameboard().placeShip([2, 0], 3, "V");
    player.getGameboard().placeShip([3, 0], 4, "V");
    player.getGameboard().placeShip([4, 0], 5, "V");
    this.gameUI.refreshBoards();
  }

  run() {
    console.log("starting game");
    this.randomShips(this.player1);
  }
}

export { GameController };
