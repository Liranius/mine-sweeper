import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { GameConfig } from '../../../../../../../shared/models/game';
import { Point2d } from '../../../../../../../shared/models/point-2d';

@Component({
  selector: 'mswp-game-main-minefield',
  templateUrl: './game-main-minefield.component.html',
  styleUrls: ['./game-main-minefield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMainMinefieldComponent implements OnInit {
  @Input() readonly config?: GameConfig;

  constructor() {}

  ngOnInit(): void {}

  revealCell(position: Point2d): void {
    console.log(position);
    // TODO: Real logic.
  }
}
