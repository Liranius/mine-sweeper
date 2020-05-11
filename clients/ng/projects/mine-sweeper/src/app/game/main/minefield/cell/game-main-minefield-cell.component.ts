import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Point2d } from '../../../../../../../../shared/models/point-2d';

@Component({
  selector: 'mswp-game-main-minefield-cell',
  templateUrl: './game-main-minefield-cell.component.html',
  styleUrls: ['./game-main-minefield-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMainMinefieldCellComponent implements OnChanges {
  @Output() reveal = new EventEmitter<Point2d>();
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
  }

  revealCell(): void {
    if (!this.position) {
      throw new Error(`[GameMainMinefieldCell Component] Cell position is not correctly set. x=${this.x}, y=${this.y}`);
    }

    this.reveal.emit(this.position);
  }
}
