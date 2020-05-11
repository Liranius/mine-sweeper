import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { CellAction, CellOperation, CellResultData, CellState } from '../../../../../../../../shared/models/cell';
import { Point2d } from '../../../../../../../../shared/models/point-2d';

@Component({
  selector: 'mswp-game-main-minefield-cell',
  templateUrl: './game-main-minefield-cell.component.html',
  styleUrls: ['./game-main-minefield-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMainMinefieldCellComponent implements OnChanges {
  content = '';
  @Input() data?: CellResultData;
  @Output() reveal = new EventEmitter<CellAction>();
  @Input() x?: number;
  @Input() y?: number;

  private position?: Point2d;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y) {
      if (typeof this.x === 'number' && typeof this.y === 'number') {
        this.position = { x: this.x, y: this.y };
      }
    }

    if (changes.data?.currentValue) {
      const data = changes.data.currentValue as CellResultData;

      switch (data.state) {
        case CellState.Revealed:
          if (data.result === -1) {
            this.content = '💣';
          } else if (data.result === 0) {
            this.content = '';
          } else if (data.result > 0) {
            this.content = data.result.toString();
          }
          break;
        case CellState.Flagged:
          this.content = '🚩';
          break;
        case CellState.Marked:
          this.content = '?';
          break;
        case CellState.Unrevealed:
          this.content = '';
      }
    }
  }

  operateCell(event: MouseEvent): void {
    if (!this.data) {
      throw new Error(`[GameMainMinefieldCell Component] Cell data is not correctly set.`);
    }

    switch (event.button) {
      case 0: {
        if (this.data.state === CellState.Marked || this.data.state === CellState.Unrevealed) {
          this.operateCellImpl(CellOperation.Reveal);
        }
        break;
      }
      case 1: {
        if (this.data.state === CellState.Revealed && this.data.result !== undefined && this.data.result > 0) {
          this.operateCellImpl(CellOperation.RevealNeighbors);
        }
        break;
      }
      case 2: {
        switch (this.data.state) {
          case CellState.Unrevealed:
            this.operateCellImpl(CellOperation.Flag);
            break;
          case CellState.Flagged:
            this.operateCellImpl(CellOperation.Mark);
            break;
          case CellState.Marked:
            this.operateCellImpl(CellOperation.Unreveal);
        }
      }
    }
  }

  private operateCellImpl(operation: CellOperation): void {
    if (!this.position) {
      throw new Error(`[GameMainMinefieldCell Component] Cell position is not correctly set. x=${this.x}, y=${this.y}`);
    }

    this.reveal.emit({
      position: this.position,
      operation
    });
  }
}
