import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { GameConfig } from '../../../../../../shared/models/game';

@Component({
  selector: 'mswp-game-main',
  templateUrl: './game-main.component.html',
  styleUrls: ['./game-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMainComponent implements OnInit {
  @Input() readonly config?: GameConfig;

  constructor() {}

  ngOnInit(): void {}
}
