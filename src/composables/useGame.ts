import { ref, computed, watch } from "vue";
import type { CellValue, Player, MatchEntry, Result } from "../types";
import { WINNING_CONDITIONS, PLAYERS, STORAGE_KEY, RESULTS } from "../config";

const savedHistory = localStorage.getItem(STORAGE_KEY);
const history = ref<MatchEntry[]>(savedHistory ? JSON.parse(savedHistory) : []);

const { X_PLAYER, O_PLAYER } = PLAYERS;
const { DRAW } = RESULTS;
const board = ref<CellValue[]>(Array(9).fill(null));
const currentPlayer = ref<Player>(X_PLAYER);
const winner = ref<CellValue>(null);
const winningLine = ref<number[] | null>(null);

watch(
  history,
  (newHistory) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  },
  { deep: true },
);

export function useGame() {
  const scores = computed(() => ({
    X: history.value.filter((m) => m.winner === X_PLAYER).length,
    O: history.value.filter((m) => m.winner === O_PLAYER).length,
    draws: history.value.filter((m) => m.winner === DRAW).length,
    total: history.value.length,
  }));

  const isDraw = computed(() => {
    return !winner.value && board.value.every((cell) => cell !== null);
  });

  const saveMatchToHistory = (result: Result) => {
    const newMatch: MatchEntry = {
      id: crypto.randomUUID(),
      winner: result,
      date: new Date().toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      movesCount: board.value.filter((cell) => cell !== null).length,
    };
    history.value = [newMatch, ...history.value].slice(0, 50); // Trzymamy 50 ostatnich
  };

  const checkWinner = () => {
    for (const condition of WINNING_CONDITIONS) {
      const [a, b, c] = condition as [number, number, number];
      const cellA = board.value[a];
      const cellB = board.value[b];
      const cellC = board.value[c];

      if (cellA && cellA === cellB && cellA === cellC) {
        winner.value = cellA;
        winningLine.value = [a, b, c];

        saveMatchToHistory(cellA === X_PLAYER ? X_PLAYER : O_PLAYER);
        return;
      }
    }

    if (!winner.value && board.value.every((cell) => cell !== null)) {
      saveMatchToHistory(DRAW);
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
    history.value = [];
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
    history,
    resetScores,
  };
}
