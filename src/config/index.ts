export const WINNING_CONDITIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export const PLAYERS = {
  X_PLAYER: "X",
  O_PLAYER: "O",
} as const;

export const ROUTES = {
  HOME_PAGE: {
    path: "/",
    name: "home",
  },
  GAME_PAGE: {
    path: "/game",
    name: "game",
  },
  HISTORY_PAGE: {
    path: "/history",
    name: "history",
  },
} as const;

export const RESULTS = {
  X_WINNER: "X",
  O_WINNER: "O",
  DRAW: "Draw",
} as const;

export const STORAGE_KEY = "tictactoe-scores" as const;
