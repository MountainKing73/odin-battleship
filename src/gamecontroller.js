import { Player } from "./player";
import { GameUI } from "./gameui";

class GameController {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.gameUI = null;
    const newBtn = document.querySelector("#NewGame");
    newBtn.addEventListener("click", this.newGame);
  }

  newGame = () => {
    this.player1 = new Player("Human");
    this.player2 = new Player("Computer");
    this.gameUI = new GameUI(
      this.player1.getGameboard(),
      this.player2.getGameboard(),
      this.squareClicked,
    );
    //this.gameUI.showPlaceShip(this.gameUI.Player1Container);
    this.player1.randomShips();
    this.player2.randomShips();
    this.gameUI.hideResult();
    this.gameUI.refreshPlayer1(false);
    this.gameUI.refreshPlayer2(true);
  };

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
