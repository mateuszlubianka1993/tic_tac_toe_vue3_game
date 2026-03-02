import { PLAYERS } from "../config";

export type Player = (typeof PLAYERS)[keyof typeof PLAYERS];
export type CellValue = Player | null;
