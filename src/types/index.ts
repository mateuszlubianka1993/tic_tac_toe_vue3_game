import { PLAYERS } from "../config";

export type Player = (typeof PLAYERS)[keyof typeof PLAYERS];

export type CellValue = Player | null;

export interface GameScores {
  X: number;
  O: number;
  draws: number;
}
