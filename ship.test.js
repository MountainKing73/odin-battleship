import { Ship } from "./ship";

test("Ship creation test", () => {
  const ship = new Ship(5);

  expect(ship).toMatchObject({
    len: 5,
    hits: 0,
    sunk: false,
  });
});

test("Ship hit test", () => {
  const ship = new Ship(5);
  ship.hit();

  expect(ship.getHits()).toEqual(1);
});

test("Ship sunk test true", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toEqual(true);
});

test("Ship sunk test false", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toEqual(false);
});
