import { CellResult } from './cell';

export interface GameConfig {
  width: number;
  height: number;
  mineCount: number;
}

export enum GameResult {
  Win = 'Win',
  Lose = 'Lose'
}

export interface CellOperationResult {
  cells: CellResult[];
  result?: GameResult;
}
