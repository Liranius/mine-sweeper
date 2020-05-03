import { Mine, MineState } from './mine';
import { Point2d } from './point-2d';

export enum CellState {
  Unrevealed,
  Marked,
  Flagged,
  Revealed
}

export enum CellOperation {
  Unreveal,
  Mark,
  Flag,
  Reveal,
  RevealNeighbors
}

export interface CellAction {
  position: Point2d;
  operation: CellOperation;
}

export type CellResult = {
  position: Point2d;
} & (
  | {
      state: CellState.Flagged | CellState.Unrevealed | CellState.Marked;
    }
  | {
      state: CellState.Revealed;
      result: number; // Total mines in adjacent cells, -1 means mine in current cell is exploded.
    }
);

export class Cell {
  get mine(): Mine | undefined {
    return this._mine;
  }

  get state(): CellState {
    return this._state;
  }

  set state(value: CellState) {
    switch (this._state) {
      case CellState.Unrevealed:
        if (value === CellState.Marked) {
          throw new Error('[Cell] Only flagged cell can be marked.');
        } else {
          this._state = value;
          break;
        }
      case CellState.Flagged:
        if (value === CellState.Flagged || value === CellState.Marked) {
          this._state = value;
          break;
        } else {
          throw new Error('[Cell] Flagged cell can only be marked.');
        }
      case CellState.Marked:
        if (value === CellState.Flagged) {
          throw new Error('[Cell] Marked cell can not be flagged.');
        } else {
          this._state = value;
          break;
        }
      case CellState.Revealed:
        if (value !== CellState.Unrevealed) {
          throw new Error('[Cell] This cell has been revealed. No way back.');
        } else {
          break;
        }
      default:
        throw new Error(`[Cell] Unknown cell state "${value}".`);
    }

    if (this._mine) {
      switch (this._state) {
        case CellState.Unrevealed:
        case CellState.Marked:
          this._mine.state = MineState.Unrevealed;
          break;
        case CellState.Flagged:
          this._mine.state = MineState.Flagged;
          break;
        case CellState.Revealed:
          this._mine.state = MineState.Exploded;
      }
    }
  }

  private _mine?: Mine;
  private _state: CellState = CellState.Unrevealed;

  constructor(public readonly position: Point2d) {}

  addMine(mine: Mine): void {
    if (!this._mine) {
      this._mine = mine;
    } else {
      throw new Error('[Cell] A mine has been added to this cell.');
    }
  }
}
