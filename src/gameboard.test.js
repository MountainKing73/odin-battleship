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

  gameboard.placeShip(0, 0, 4, "V");

  expect(gameboard.board[0][0]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[1][0]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[2][0]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[3][0]).toMatchObject({
    len: 4,
    hits: 0,
    sunk: false,
  });
});

test("Place ship horizontal", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, 4, 3, "H");

  expect(gameboard.board[3][4]).toMatchObject({
    len: 3,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[3][5]).toMatchObject({
    len: 3,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.board[3][6]).toMatchObject({
    len: 3,
    hits: 0,
    sunk: false,
  });
});

test("Test ship placement off board", () => {
  const gameboard = new Gameboard();

  expect(() => {
    gameboard.placeShip(10, 0, 3, "V");
  }).toThrow("Invalid placement");
});

test("Test ship placement ends off board", () => {
  const gameboard = new Gameboard();

  expect(() => {
    gameboard.placeShip(0, 9, 3, "H");
  }).toThrow("Invalid placement");
});

test("Test successful attack", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, 4, 3, "V");

  gameboard.receiveAttack(3, 4);

  expect(gameboard.board[3][4]).toEqual("H");
});

test("Test missed attack", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, 4, 3, "H");

  gameboard.receiveAttack(0, 0);

  expect(gameboard.board[0][0]).toMatch("X");
});

test("Test sunk ships", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, 4, 3, "H");

  gameboard.receiveAttack(3, 4);
  gameboard.receiveAttack(4, 4);
  gameboard.receiveAttack(5, 4);

  expect(gameboard.allSunk()).toBeTruthy();
});

test("Test not sunk ships", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, 4, 3, "H");

  gameboard.receiveAttack(3, 4);
  gameboard.receiveAttack(4, 4);

  expect(gameboard.allSunk()).toBeTruthy();
});

test("Test duplicate move check", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 4, 3, "H");
  gameboard.receiveAttack(2, 6);
  gameboard.receiveAttack(3, 4);
  gameboard.receiveAttack(0, 9);
  gameboard.receiveAttack(6, 2);
  expect(gameboard.validMove(3, 4)).toBeFalsy();
});
