import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { timer, NEVER } from 'rxjs';
import { take } from 'rxjs/operators';

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
  private readonly touchDoublePressThreshold = 300;
  private readonly touchLongPressThreshold = 500;
  private touchLongPressTimer = NEVER.subscribe();
  private touchDoublePressTimer = NEVER.subscribe();

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

  cancelTouchstartWhenMoveAway(event: TouchEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const { clientX, clientY } = event.targetTouches[0];

    if (
      (clientX - rect.right > 0 || rect.left - clientX > 0 || clientY - rect.bottom > 0 || rect.top - clientY > 0) &&
      !this.touchLongPressTimer.closed
    ) {
      this.touchLongPressTimer.unsubscribe();
    }
  }

  handleClick(event?: MouseEvent): void {
    event?.preventDefault();

    this.operateCell(event?.button || 0);
  }

  handleContextMenu(event?: MouseEvent): void {
    event?.preventDefault();

    this.operateCell(2);
  }

  handleDblClick(event?: MouseEvent): void {
    event?.preventDefault();

    this.operateCell(1);
  }

  simulateClickOrDblClick(event: TouchEvent): void {
    event.preventDefault();

    if (!this.touchDoublePressTimer.closed) {
      if (!this.touchLongPressTimer.closed) {
        this.touchLongPressTimer.unsubscribe();
        this.touchDoublePressTimer = timer(this.touchDoublePressThreshold)
          .pipe(take(1))
          .subscribe(() => this.handleClick());
      }
    } else {
      this.touchDoublePressTimer.unsubscribe();
      this.handleDblClick();
      this.touchDoublePressTimer = NEVER.subscribe();
    }
  }

  simulateRightClick(event: TouchEvent): void {
    event.preventDefault();

    this.touchLongPressTimer = timer(this.touchLongPressThreshold)
      .pipe(take(1))
      .subscribe(() => {
        if (!this.touchLongPressTimer.closed) {
          this.touchLongPressTimer.unsubscribe();
          this.handleContextMenu();
        }
      });
  }

  private operateCell(button: MouseEvent['button']): void {
    if (!this.data) {
      throw new Error(`[GameMainMinefieldCell Component] Cell data is not correctly set.`);
    }

    switch (button) {
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
