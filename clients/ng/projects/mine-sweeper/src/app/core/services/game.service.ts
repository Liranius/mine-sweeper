import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { CellAction, CellOperation, CellResult, CellState } from '../../../../../../shared/models/cell';
import { isPresetLevel, CellOperationResult, GameConfig, GameResult, PresetLevel } from '../../../../../../shared/models/game';
import { Minefield } from '../../../../../../shared/models/minefield';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  static readonly Preset: { [P in PresetLevel]: GameConfig } = {
    easy: { width: 9, height: 9, mineCount: 10 },
    normal: { width: 16, height: 16, mineCount: 40 },
    hard: { width: 30, height: 16, mineCount: 99 }
  };

  private result?: GameResult;
  private readonly gameEndedError = new Error('[Game Service] Game is ended. No more operation accepted.');
  private minefield?: Minefield;

  operateCell(action: CellAction): Observable<CellOperationResult> {
    if (!this.minefield) {
      throw new Error('[Game Service] Game not started.');
    }

    if (this.result) {
      throw this.gameEndedError;
    }

    return of({ cells: this.operateCellImpl(this.minefield, action), result: this.result ? this.result : undefined });
  }

  start(arg: PresetLevel | GameConfig): Observable<GameConfig> {
    const config = isPresetLevel(arg) ? GameService.Preset[arg] : arg;

    this.result = undefined;
    this.minefield = new Minefield(...(Object.values(config) as [number, number, number]));

    return of(config);
  }

  private end(result: GameResult): void {
    this.result = result;
  }

  private operateCellImpl(minefield: Minefield, action: CellAction): CellResult[] {
    const cellResults: CellResult[] = [];
    const target = minefield.cells[action.position.x][action.position.y];

    switch (action.operation) {
      case CellOperation.Flag: {
        if (target.state === CellState.Flagged) {
          break;
        }

        target.state = CellState.Flagged;
        cellResults.push({
          position: target.position,
          data: {
            state: target.state
          }
        });
        break;
      }
      case CellOperation.Mark: {
        if (target.state === CellState.Marked) {
          break;
        }

        target.state = CellState.Marked;
        cellResults.push({
          position: target.position,
          data: {
            state: target.state
          }
        });
        break;
      }
      case CellOperation.Unreveal: {
        if (target.state === CellState.Unrevealed) {
          break;
        }

        target.state = CellState.Unrevealed;
        cellResults.push({
          position: target.position,
          data: {
            state: target.state
          }
        });
        break;
      }
      case CellOperation.Reveal: {
        if (target.state === CellState.Revealed || target.state === CellState.Flagged) {
          break;
        }

        target.state = CellState.Revealed;

        if (target.mine) {
          this.end(GameResult.Lose);
          cellResults.push({
            position: target.position,
            data: {
              state: target.state,
              result: -1
            }
          });
          this.minefield!.cells.reduce((pre, cur) => pre.concat(cur))
            .filter(cell => cell !== target)
            .filter(cell => cell.state !== CellState.Revealed && cell.state !== CellState.Flagged)
            .map(cell => this.operateCellImpl(minefield, { position: cell.position, operation: CellOperation.Reveal }))
            .forEach(results => cellResults.push(...results));
          break;
        }

        const neighbors = minefield.getNeighborCells(target);
        const result = neighbors.filter(cell => !!cell.mine).length;

        cellResults.push({
          position: target.position,
          data: {
            state: target.state,
            result
          }
        });

        if (!result) {
          neighbors
            .map(cell => this.operateCellImpl(minefield, { position: cell.position, operation: CellOperation.Reveal }))
            .forEach(results => cellResults.push(...results));
        }
        break;
      }
      case CellOperation.RevealNeighbors: {
        const availableNeighbors = minefield
          .getNeighborCells(target)
          .filter(cell => cell.state !== CellState.Revealed && cell.state !== CellState.Flagged);

        if (target.state !== CellState.Revealed || !availableNeighbors.length) {
          break;
        }

        availableNeighbors
          .map(cell => this.operateCellImpl(minefield, { position: cell.position, operation: CellOperation.Reveal }))
          .forEach(results => cellResults.push(...results));
        break;
      }
      default:
        throw new Error(`[Game Service] Unknown cell operation "${action.operation}".`);
    }

    if (
      !minefield.cells.reduce((pre, cur) => pre.concat(cur)).filter(cell => cell.state === CellState.Unrevealed).length &&
      this.result !== GameResult.Lose
    ) {
      this.end(GameResult.Win);
    }

    return cellResults;
  }
}
