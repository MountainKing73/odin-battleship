import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { GameUI } from "./gameui";
import { Ship } from "./ship";

class GameController {
  constructor() {
    this.player1 = new Player("Human");
    this.player2 = new Player("Computer");
    this.gameUI = new GameUI(
      this.player1.getGameboard(),
      this.player2.getGameboard(),
      this.squareClicked,
    );
    this.gameUI.refreshBoards();
  }

  #getRandomLoc() {
    return [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
  }

  #getRandomDir() {
    const choice = ["V", "H"];
    const rnd = Math.floor(Math.random() * 2);
    return choice[rnd];
  }

  randomShips(player) {
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(this.#getRandomLoc(), 2, this.#getRandomDir());
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(this.#getRandomLoc(), 3, this.#getRandomDir());
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(this.#getRandomLoc(), 3, this.#getRandomDir());
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(this.#getRandomLoc(), 4, this.#getRandomDir());
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(this.#getRandomLoc(), 5, this.#getRandomDir());
        break;
      } catch (error) {}
    }

    this.gameUI.refreshBoards();
  }

  squareClicked = (event) => {
    if (event.target.getAttribute("boardNum") === "2") {
      this.player2
        .getGameboard()
        .receiveAttack([
          event.target.getAttribute("row"),
          event.target.getAttribute("col"),
        ]);
    }
    this.gameUI.refreshBoards();
  };

  run() {
    this.randomShips(this.player1);
    this.randomShips(this.player2);
  }
}

export { GameController };
