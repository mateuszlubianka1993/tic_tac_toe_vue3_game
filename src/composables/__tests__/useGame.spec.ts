import { describe, it, expect, beforeEach } from "vitest";
import { useGame } from "../useGame";
import { PLAYERS } from "../../config";

describe("useGame Composable", () => {
  let game: ReturnType<typeof useGame>;

  beforeEach(() => {
    game = useGame();
  });

  it("should initialize with an empty board and X as the current player", () => {
    expect(game.board.value).toEqual(Array(9).fill(null));
    expect(game.currentPlayer.value).toBe(PLAYERS.X_PLAYER);
    expect(game.winner.value).toBeNull();
    expect(game.isDraw.value).toBe(false);
  });

  it("should toggle the current player after a valid move", () => {
    game.makeMove(0);
    expect(game.board.value[0]).toBe(PLAYERS.X_PLAYER);
    expect(game.currentPlayer.value).toBe(PLAYERS.O_PLAYER);
  });

  it("should not allow moving into an occupied cell", () => {
    game.makeMove(0);
    game.makeMove(0);
    expect(game.board.value[0]).toBe(PLAYERS.X_PLAYER);
    expect(game.currentPlayer.value).toBe(PLAYERS.O_PLAYER);
  });

  it("should not allow moves after a winner is determined", () => {
    game.makeMove(0);
    game.makeMove(3);
    game.makeMove(1);
    game.makeMove(4);
    game.makeMove(2);

    game.makeMove(5);
    expect(game.board.value[5]).toBeNull();
  });

  it("should identify a horizontal win for player X", () => {
    game.makeMove(0);
    game.makeMove(3);
    game.makeMove(1);
    game.makeMove(4);
    game.makeMove(2);

    expect(game.winner.value).toBe(PLAYERS.X_PLAYER);
    expect(game.isDraw.value).toBe(false);
  });

  it("should identify a draw correctly", () => {
    const moves = [0, 1, 2, 5, 3, 6, 4, 8, 7];
    moves.forEach((index) => game.makeMove(index));

    expect(game.winner.value).toBeNull();
    expect(game.isDraw.value).toBe(true);
  });

  it("should reset the game state to initial values", () => {
    game.makeMove(0);
    game.makeMove(4);
    game.resetGame();

    expect(game.board.value).toEqual(Array(9).fill(null));
    expect(game.winner.value).toBeNull();
    expect(game.currentPlayer.value).toBe(PLAYERS.X_PLAYER);
  });

  it("should return the correct winning line indices after a win", () => {
    game.makeMove(0);
    game.makeMove(3);
    game.makeMove(1);
    game.makeMove(4);
    game.makeMove(2);

    expect(game.winner.value).toBe(PLAYERS.X_PLAYER);
    expect(game.winningLine.value).toEqual([0, 1, 2]);
  });

  it("should reset the winning line when the game is reset", () => {
    game.makeMove(0);
    game.makeMove(3);
    game.makeMove(1);
    game.makeMove(4);
    game.makeMove(2);

    game.resetGame();

    expect(game.winningLine.value).toBeNull();
  });
});
