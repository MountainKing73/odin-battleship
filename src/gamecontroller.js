import { Player } from "./player";
import { GameUI } from "./gameui";

class GameController {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.gameUI = null;
    const newBtn = document.querySelector("#NewGame");
    newBtn.addEventListener("click", this.newGame);
    const startBtn = document.querySelector("#startBtn");
    startBtn.disabled = true;
    startBtn.addEventListener("click", this.startGame);
    const randomBtn = document.querySelector("#randomBtn");
    randomBtn.disabled = true;
  }

  newGame() {
    this.player1 = new Player("Human");
    this.player2 = new Player("Computer");
    this.gameUI = new GameUI(
      this.player1.getGameboard(),
      this.player2.getGameboard(),
      this.squareClicked,
    );

    this.gameUI.hideResult();
    this.gameUI.hidePlayerContainers();
    const startBtn = document.querySelector("#startBtn");
    startBtn.disabled = true;
    const randomBtn = document.querySelector("#randomBtn");
    randomBtn.addEventListener("click", this.randomClicked);
    randomBtn.disabled = false;
    this.gameUI.showPlaceShip(this.player1.getGameboard(), this.placeClicked);
  }

  startGame = () => {
    this.gameUI.hidePlaceShip();
    this.gameUI.showPlayerContainers();
    //this.player1.randomShips();
    this.player2.randomShips();
    this.gameUI.refreshPlayer1(false);
    this.gameUI.refreshPlayer2(true);
  };

  // Pass the oppenent to check for remaining ships
  checkWin(player) {
    return player.getGameboard().getRemainingShips() === 0;
  }

  randomClicked = () => {
    this.player1.resetBoard();
    this.player1.randomShips();
    this.gameUI.refreshSelectBoard(this.player1.getGameboard());

    const startBtn = document.querySelector("#startBtn");
    startBtn.disabled = false;
  };

  placeClicked = (event) => {
    const shipNum = event.target.getAttribute("shipnum");
    const [row, col, dir] = this.gameUI.getShipEntryData(shipNum);

    try {
      this.player1
        .getGameboard()
        .placeShip(
          this.player1.getGameboard().getShips()[shipNum],
          row,
          col,
          dir,
        );
    } catch (error) {
      alert("Invalid ship placement. Try again.");
      return;
    }

    this.gameUI.refreshSelectBoard(this.player1.getGameboard());
    event.target.disabled = true;
    if (this.player1.getGameboard().allShipsPlaced()) {
      const startBtn = document.querySelector("#startBtn");
      startBtn.disabled = false;
    }
  };

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
