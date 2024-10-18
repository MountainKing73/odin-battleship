import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

class GameUI {
  constructor(player1Gameboard, player2Gameboard) {
    this.player1Gameboard = player1Gameboard;
    this.player2Gameboard = player2Gameboard;
    this.Player1Container = document.querySelector("#Player1Container");
    this.Player2Container = document.querySelector("#Player2Container");
  }

  #drawBoard(container, gameboard, boardNum) {
    for (let i = 0; i < gameboard.getBoard().length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < gameboard.getBoard().length; j++) {
        const col = document.createElement("div");
        col.classList.add("square");
        col.setAttribute("col", j);
        col.setAttribute("row", i);
        col.setAttribute("boardNum", boardNum);
        if (gameboard.getBoard()[i][j] instanceof Ship) {
          col.classList.add("ship");
        }
        col.addEventListener("click", this.squareClicked);
        row.appendChild(col);
      }
      container.appendChild(row);
    }
  }
  refreshBoards() {
    this.Player1Container.innerHTML = "";
    this.#drawBoard(this.Player1Container, this.player1Gameboard, 1);
    this.Player2Container.innerHTML = "";
    this.#drawBoard(this.Player2Container, this.player2Gameboard, 2);
  }

  squareClicked(event) {
    console.log(
      "Square was clicked on Board #" +
        event.target.getAttribute("boardNum") +
        ": [" +
        event.target.getAttribute("col") +
        ", " +
        event.target.getAttribute("row") +
        "]",
    );
  }
}

export { GameUI };
