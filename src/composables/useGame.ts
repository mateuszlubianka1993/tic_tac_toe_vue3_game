import { ref, computed } from "vue";
import type { CellValue, Player, GameScores } from "../types";
import { WINNING_CONDITIONS, PLAYERS, STORAGE_KEY } from "../config";

const savedScores = localStorage.getItem(STORAGE_KEY);
const initialScores: GameScores = savedScores ? JSON.parse(savedScores) : { X: 0, O: 0, draws: 0 };

const { X_PLAYER, O_PLAYER } = PLAYERS;
const scores = ref<GameScores>(initialScores);
const board = ref<CellValue[]>(Array(9).fill(null));
const currentPlayer = ref<Player>(X_PLAYER);
const winner = ref<CellValue>(null);
const winningLine = ref<number[] | null>(null);

export function useGame() {
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

        if (cellA === PLAYERS.X_PLAYER) {
          scores.value.X++;
        } else {
          scores.value.O++;
        }

        return;
      }
    }

    if (!winner.value && board.value.every((cell) => cell !== null)) {
      scores.value.draws++;
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

  const resetScores = () => {
    scores.value = { X: 0, O: 0, draws: 0 };
  };

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    makeMove,
    resetGame,
    scores,
    resetScores,
  };
}
