import { ref, computed } from "vue";
import type { CellValue, Player } from "../types";
import { WINNING_CONDITIONS } from "../config";
import { PLAYERS } from "../config";

const { X_PLAYER, O_PLAYER } = PLAYERS;

export function useGame() {
  const board = ref<CellValue[]>(Array(9).fill(null));
  const currentPlayer = ref<Player>(X_PLAYER);
  const winner = ref<CellValue>(null);
  const winningLine = ref<number[] | null>(null);

  const isDraw = computed(() => {
    return !winner.value && board.value.every((cell) => cell !== null);
  });

  const checkWinner = () => {
    for (const condition of WINNING_CONDITIONS) {
      const [a, b, c] = condition as [number, number, number];
      const cellA = board.value[a];
      const cellB = board.value[b];
      const cellC = board.value[c];

      if (cellA && cellA === cellB && cellA === cellC) {
        winner.value = cellA;
        winningLine.value = [a, b, c];
        return;
      }
    }
  };

  const makeMove = (index: number) => {
    if (board.value[index] || winner.value) return;

    board.value[index] = currentPlayer.value;

    checkWinner();

    if (!winner.value) {
      currentPlayer.value = currentPlayer.value === X_PLAYER ? O_PLAYER : X_PLAYER;
    }
  };

  const resetGame = () => {
    board.value = Array(9).fill(null);
    currentPlayer.value = X_PLAYER;
    winner.value = null;
    winningLine.value = null;
  };

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    makeMove,
    resetGame,
  };
}
