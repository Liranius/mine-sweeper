import { Component, OnInit } from '@angular/core';

import { GameConfig } from '../../../../../shared/models/game';

@Component({
  selector: 'mswp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameConfig?: GameConfig;
  position: 'home' | 'game' = 'home';

  ngOnInit(): void {}

  startGameWith(config: GameConfig): void {
    this.position = 'game';
    this.gameConfig = config;
  }
}
