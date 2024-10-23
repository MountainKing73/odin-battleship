import { Ship } from "./ship";

class GameUI {
  constructor(player1Gameboard, player2Gameboard, attackCallback) {
    this.player1Gameboard = player1Gameboard;
    this.player2Gameboard = player2Gameboard;
    this.attackCallback = attackCallback;
  }

  hidePlayerContainers() {
    const gameContainer = document.querySelector("#GameContainer");
    gameContainer.style.display = "none";
  }

  showPlayerContainers() {
    const gameContainer = document.querySelector("#GameContainer");
    gameContainer.style.display = "flex";
  }

  hidePlaceShip() {
    console.log("Hide ship placement");
    const shipPlacementContainer = document.querySelector(
      "#ShipPlacementContainer",
    );
    shipPlacementContainer.style.display = "none";
  }

  showPlaceShip(gameBoard, clickedCallback) {
    const shipPlacementContainer = document.querySelector(
      "#ShipPlacementContainer",
    );
    shipPlacementContainer.style.display = "block";

    const placeShip = document.querySelector("#ShipEntry");
    placeShip.innerHTML = "";
    const nameHdr = document.createElement("div");
    nameHdr.innerText = "";
    placeShip.append(nameHdr);
    const rowHdr = document.createElement("div");
    rowHdr.innerText = "Row";
    placeShip.append(rowHdr);
    const colHdr = document.createElement("div");
    colHdr.innerText = "Col";
    placeShip.append(colHdr);
    const dirHdr = document.createElement("div");
    dirHdr.innerText = "Dir";
    placeShip.append(dirHdr);
    const placeHdr = document.createElement("div");
    placeHdr.innerText = "";
    placeShip.append(placeHdr);
    const ships = gameBoard.getShips();
    for (let i = 0; i < ships.length; i++) {
      const shipName = document.createElement("p");
      shipName.innerText =
        ships[i].getName() + " (" + ships[i].getLength() + " spaces)";
      placeShip.append(shipName);

      const rowInput = document.createElement("INPUT");
      rowInput.setAttribute("type", "number");
      rowInput.setAttribute("name", "rowInput");
      rowInput.id = "rowInput" + i;
      rowInput.classList.add("ShipInput");
      placeShip.append(rowInput);

      const colInput = document.createElement("INPUT");
      colInput.setAttribute("type", "number");
      colInput.setAttribute("name", "colInput");
      colInput.id = "colInput" + i;
      colInput.classList.add("ShipInput");
      placeShip.append(colInput);

      const dirList = document.createElement("select");
      dirList.id = "dirList" + i;
      const vertical = document.createElement("option");
      vertical.value = "V";
      vertical.text = "V";
      dirList.append(vertical);
      const horizontal = document.createElement("option");
      horizontal.value = "H";
      horizontal.text = "H";
      dirList.append(horizontal);
      placeShip.append(dirList);

      const placeBtn = document.createElement("Button");
      placeBtn.innerText = "Place";
      placeBtn.setAttribute("shipNum", i);
      placeBtn.addEventListener("click", clickedCallback);
      placeShip.append(placeBtn);
    }
    shipPlacementContainer.append(placeShip);
    const boardContainer = document.querySelector("#selectBoard");
    boardContainer.innerHTML = "";
    shipPlacementContainer.append(boardContainer);
    this.#drawBoard(boardContainer, this.player1Gameboard, 1, false);
  }

  getShipEntryData(shipNum) {
    const rowInput = document.querySelector("#rowInput" + shipNum);
    const colInput = document.querySelector("#colInput" + shipNum);
    const dirInput = document.querySelector("#dirList" + shipNum);
    // TODO: Add error handling
    console.log("rowInput type: " + typeof rowInput.value);
    return [Number(rowInput.value), Number(colInput.value), dirInput.value];
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
  }

  #showShips(container, gameboard) {
    const status = document.createElement("div");
    const shipsRemaining = gameboard.getRemainingShips();
    status.innerText = "Remaining ships: " + shipsRemaining;
    const ships = gameboard.getShips();
    for (let ship of ships) {
      const shipDiv = document.createElement("div");
      shipDiv.innerText = ship.getName();
      if (ship.isSunk()) {
        shipDiv.classList.add("sunk");
      }
      status.appendChild(shipDiv);
    }
    container.appendChild(status);
  }

  refreshPlayer1(clickable) {
    const player1Container = document.querySelector("#Player1Container");
    player1Container.innerHTML = "";
    this.#drawBoard(player1Container, this.player1Gameboard, 1, clickable);
    this.#showShips(player1Container, this.player1Gameboard);
  }

  refreshPlayer2(clickable) {
    const player2Container = document.querySelector("#Player2Container");
    player2Container.innerHTML = "";
    this.#drawBoard(player2Container, this.player2Gameboard, 2, clickable);
    this.#showShips(player2Container, this.player2Gameboard);
  }

  refreshSelectBoard(board) {
    const boardContainer = document.querySelector("#selectBoard");
    boardContainer.innerHTML = "";
    this.#drawBoard(boardContainer, board, 0, false);
  }

  refreshBoards() {
    this.refreshPlayer1();
    this.refreshPlayer2();
  }

  showResult(msg, newGameCallback) {
    const result = document.querySelector("#Result");
    result.innerText = msg;
  }

  hideResult() {
    const result = document.querySelector("#Result");
    result.innerText = "";
  }
}

export { GameUI };
