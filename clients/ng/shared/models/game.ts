import { CellResult } from './cell';

export interface GameConfig {
  width: number;
  height: number;
  mineCount: number;
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
