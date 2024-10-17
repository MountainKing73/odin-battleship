import { Gameboard } from "./gameboard";

test("Gameboard creation test", () => {
  const gameboard = new Gameboard();

  expect(gameboard.board).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("Place ship vertical", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([0, 0], 4, "V");

  expect(gameboard.board[0][0]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[0][1]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[0][2]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[0][3]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
});

test("Place ship horizontal", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "H");

  expect(gameboard.board[3][4]).toMatchObject({
    len: 3,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[4][4]).toMatchObject({
    len: 3,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[5][4]).toMatchObject({
    len: 3,
    hits: 0,
    sunk: false,
  });
});

test("Test successful attack", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "H");

  gameboard.receiveAttack([4, 4]);

  expect(gameboard.board[4][4].hits).toEqual(1);
});

test("Test missed attack", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "H");

  gameboard.receiveAttack([4, 5]);

  expect(gameboard.board[4][5]).toMatch("X");
});

test("Test sunk ships", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "H");

  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([4, 4]);
  gameboard.receiveAttack([5, 4]);

  expect(gameboard.allSunk()).toBeTruthy();
});

test("Test not sunk ships", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "H");

  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([4, 4]);

  expect(gameboard.allSunk()).toBeTruthy();
});
