import { CellResult, CellResultData } from './cell';

export interface GameConfig {
  width: number;
  height: number;
  mineCount: number;
}

export interface MinefieldConfig extends GameConfig {
  results: CellResultData[][];
}

export type PresetLevel = 'easy' | 'normal' | 'hard';
export function isPresetLevel(arg: any): arg is PresetLevel {
  return arg === 'easy' || arg === 'normal' || arg === 'hard';
}

export enum GameResult {
  Win = 'Win',
  Lose = 'Lose'
}

export interface CellOperationResult {
  cells: CellResult[];
  result?: GameResult;
}
