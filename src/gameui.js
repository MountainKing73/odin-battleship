import { Gameboard } from "./gameboard";
import { GameController } from "./gamecontroller";
import { Ship } from "./ship";

class GameUI {
  constructor(player1Gameboard, player2Gameboard, attackCallback) {
    this.player1Gameboard = player1Gameboard;
    this.player2Gameboard = player2Gameboard;
    this.attackCallback = attackCallback;
    this.Player1Container = document.querySelector("#Player1Container");
    this.Player2Container = document.querySelector("#Player2Container");
  }

  #drawBoard(container, gameboard, boardNum, clickable) {
    for (let i = 0; i < gameboard.getBoard().length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < gameboard.getBoard().length; j++) {
        const col = document.createElement("div");
        col.classList.add("square");
        col.setAttribute("col", j);
        col.setAttribute("row", i);
        col.setAttribute("boardNum", boardNum);
        if (clickable) {
          col.addEventListener("click", this.attackCallback);
        } else {
          col.removeEventListener("click", this.attackCallback);
        }
        if (
          gameboard.getBoard()[i][j] instanceof Ship &&
          gameboard.getShowShips()
        ) {
          col.classList.add("ship");
        } else if (gameboard.getBoard()[i][j] === "X") {
          col.innerText = "X";
          col.removeEventListener("click", this.attackCallback);
        } else if (gameboard.getBoard()[i][j] === "H") {
          col.classList.add("hit");
          col.removeEventListener("click", this.attackCallback);
        }
        //col.addEventListener("click", this.squareClicked);
        row.appendChild(col);
      }
      container.appendChild(row);
    }
    const status = document.createElement("div");
    const shipsRemaining = gameboard.getRemainingShips();
    status.innerText = "Remaining ships: " + shipsRemaining;
    container.appendChild(status);
  }

  refreshPlayer1(clickable) {
    this.Player1Container.innerHTML = "";
    this.#drawBoard(this.Player1Container, this.player1Gameboard, 1, clickable);
  }

  refreshPlayer2(clickable) {
    this.Player2Container.innerHTML = "";
    this.#drawBoard(this.Player2Container, this.player2Gameboard, 2, clickable);
  }

  refreshBoards() {
    this.refreshPlayer1();
    this.refreshPlayer2();
  }
}

export { GameUI };
