import { PLAYERS, RESULTS } from "../config";

export type Player = (typeof PLAYERS)[keyof typeof PLAYERS];

export type CellValue = Player | null;

export type Result = (typeof RESULTS)[keyof typeof RESULTS];

export interface MatchEntry {
  id: string;
  winner: Result;
  date: string;
  movesCount: number;
}
