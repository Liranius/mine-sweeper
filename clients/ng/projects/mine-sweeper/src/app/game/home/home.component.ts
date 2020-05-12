import { Component, EventEmitter, Output } from '@angular/core';

import { GameConfig, PresetLevel } from '../../../../../../shared/models/game';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'mswp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  customConfig: GameConfig = {
    width: 9,
    height: 9,
    mineCount: 10
  };
  isSettingCustomGame = false;
  @Output() readonly gameStart = new EventEmitter<GameConfig>();

  constructor(private readonly gameService: GameService) {}

  cancelCustomGameSetting(): void {
    this.isSettingCustomGame = false;
  }

  startNewGame(config: PresetLevel | GameConfig): void {
    this.gameService.start(config).subscribe(gameConfig => {
      this.gameStart.emit(gameConfig);
      this.isSettingCustomGame = false;
    });
  }

  setCustomGame(): void {
    this.isSettingCustomGame = true;
  }
}
