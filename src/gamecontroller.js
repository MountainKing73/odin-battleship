import { Player } from "./player";
import { GameUI } from "./gameui";

class GameController {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.gameUI = null;
  }

  newGame = () => {
    this.player1 = new Player("Human");
    this.player2 = new Player("Computer");
    this.gameUI = new GameUI(
      this.player1.getGameboard(),
      this.player2.getGameboard(),
      this.squareClicked,
    );
    this.randomShips(this.player1);
    this.randomShips(this.player2);
    this.gameUI.hideResult();
    this.gameUI.refreshPlayer1(false);
    this.gameUI.refreshPlayer2(true);
  };

  #getRandomLoc() {
    return Math.floor(Math.random() * 9);
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
          .placeShip(
            this.#getRandomLoc(),
            this.#getRandomLoc(),
            2,
            this.#getRandomDir(),
          );
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(
            this.#getRandomLoc(),
            this.#getRandomLoc(),
            3,
            this.#getRandomDir(),
          );
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(
            this.#getRandomLoc(),
            this.#getRandomLoc(),
            3,
            this.#getRandomDir(),
          );
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(
            this.#getRandomLoc(),
            this.#getRandomLoc(),
            4,
            this.#getRandomDir(),
          );
        break;
      } catch (error) {}
    }
    while (true) {
      try {
        player
          .getGameboard()
          .placeShip(
            this.#getRandomLoc(),
            this.#getRandomLoc(),
            5,
            this.#getRandomDir(),
          );
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
      .receiveAttack(
        event.target.getAttribute("row"),
        event.target.getAttribute("col"),
      );
    this.gameUI.refreshPlayer2(false);
    this.computerTurn();
    if (this.checkWin(this.player2)) {
      this.gameUI.showResult("Player Wins!", this.newGame);
    }
  };

  computerTurn() {
    this.player2.computerTurn(this.player1);
    this.gameUI.refreshPlayer1(false);
    this.gameUI.refreshPlayer2(true);
    if (this.checkWin(this.player1)) {
      this.gameUI.showResult("Computer Wins!", this.newGame);
    }
  }

  run() {
    this.newGame();
  }
}

export { GameController };
