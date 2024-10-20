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
  }

  // Pass the oppenent to check for remaining ships
  checkWin(player) {
    return player.getGameboard().getRemainingShips() === 0;
  }

  squareClicked = (event) => {
    this.player2
      .getGameboard()
      .receiveAttack([
        event.target.getAttribute("row"),
        event.target.getAttribute("col"),
      ]);
    this.gameUI.refreshPlayer2(false);
    this.computerTurn();
    if (this.checkWin(this.player2)) {
      window.alert("Player Wins!");
    }
  };

  computerTurn() {
    this.player2.computerTurn(this.player1);
    this.gameUI.refreshPlayer1(false);
    this.gameUI.refreshPlayer2(true);
    if (this.checkWin(this.player1)) {
      window.alert("Computer Wins!");
    }
  }

  run() {
    this.randomShips(this.player1);
    this.randomShips(this.player2);
    this.gameUI.refreshPlayer1(false);
    this.gameUI.refreshPlayer2(true);
  }
}

export { GameController };
