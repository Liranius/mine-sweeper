import { Cell } from './cell';

export enum MineState {
  Unrevealed,
  Flagged,
  Exploded
}

export class Mine {
  get state(): MineState {
    return this._state;
  }

  set state(value: MineState) {
    switch (this._state) {
      case MineState.Unrevealed:
        this._state = value;
        break;
      case MineState.Flagged:
        if (value !== MineState.Exploded) {
          this._state = value;
          break;
        } else {
          throw new Error('[Mine] A flagged mine must be unflagged before exploding.');
        }
      case MineState.Exploded:
        if (value !== MineState.Exploded) {
          throw new Error('[Mine] This mine is exploded. No way back.');
        }
        break;
      default:
        throw new Error(`[Mine] Unknown mine state "${value}".`);
    }
  }

  private _state: MineState = MineState.Unrevealed;

  constructor(public readonly cell: Cell) {}
}
