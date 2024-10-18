import { Player } from "./player";

test("Create player", () => {
  let player = new Player("Human");

  expect(player.type).toEqual("Human");
  expect(player.gameboard).toBeDefined();
});
