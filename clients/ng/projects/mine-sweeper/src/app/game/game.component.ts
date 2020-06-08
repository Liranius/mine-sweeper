import { Component, OnInit } from '@angular/core';

import { GameConfig } from '../../../../../shared/models/game';
import { GameService } from '../core/services/game.service';

@Component({
  selector: 'mswp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameConfig?: GameConfig;
  position: 'home' | 'game' = 'home';

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {}

  startGameWith(config: GameConfig): void {
    this.position = 'game';
    this.gameService.start(config).subscribe(acceptedConfig => (this.gameConfig = acceptedConfig));
  }
}
