import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GameBoard from "../GameBoard.vue";
import Square from "../Square.vue";
import { PLAYERS } from "../../config";

describe("GameBoard.vue Integration", () => {
  it("renders all 9 squares", () => {
    const wrapper = mount(GameBoard);
    const squares = wrapper.findAllComponents(Square);
    expect(squares).toHaveLength(9);
  });

  it("updates square value and toggles player on click", async () => {
    const wrapper = mount(GameBoard);
    const squares = wrapper.findAllComponents(Square);

    await squares[0]?.trigger("click");
    expect(squares[0]?.props("value")).toBe(PLAYERS.X_PLAYER);

    await squares[1]?.trigger("click");
    expect(squares[1]?.props("value")).toBe(PLAYERS.O_PLAYER);
  });

  it("displays the winner message when a player wins", async () => {
    const wrapper = mount(GameBoard);
    const squares = wrapper.findAllComponents(Square);

    await squares[0]?.trigger("click");
    await squares[3]?.trigger("click");
    await squares[1]?.trigger("click");
    await squares[4]?.trigger("click");
    await squares[2]?.trigger("click");

    const statusText = wrapper.find("p");
    expect(statusText.text()).toContain(`Winner: ${PLAYERS.X_PLAYER}`);
  });

  it("disables all squares when game is over", async () => {
    const wrapper = mount(GameBoard);
    const squares = wrapper.findAllComponents(Square);

    await squares[0]?.trigger("click");
    await squares[3]?.trigger("click");
    await squares[1]?.trigger("click");
    await squares[4]?.trigger("click");
    await squares[2]?.trigger("click");

    expect(squares[5]?.props("disabled")).toBe(true);
  });

  it("highlights the winning squares", async () => {
    const wrapper = mount(GameBoard);
    const squares = wrapper.findAllComponents(Square);

    await squares[0]?.trigger("click");
    await squares[3]?.trigger("click");
    await squares[1]?.trigger("click");
    await squares[4]?.trigger("click");
    await squares[2]?.trigger("click");

    expect(squares[0]?.props("isWinningSquare")).toBe(true);
    expect(squares[1]?.props("isWinningSquare")).toBe(true);
    expect(squares[2]?.props("isWinningSquare")).toBe(true);
    expect(squares[5]?.props("isWinningSquare")).toBe(false);
  });
});
