import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { CellAction, CellState } from '../../../../../../../shared/models/cell';
import { GameConfig, GameResult, MinefieldConfig } from '../../../../../../../shared/models/game';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'mswp-game-main-minefield',
  templateUrl: './game-main-minefield.component.html',
  styleUrls: ['./game-main-minefield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMainMinefieldComponent implements OnChanges, OnInit {
  @Input() readonly config?: GameConfig;
  minefieldConfig?: MinefieldConfig;

  private gameResult?: GameResult;

  constructor(private readonly gameService: GameService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config?.currentValue) {
      const config = changes.config.currentValue as GameConfig;

      this.minefieldConfig = {
        ...config,
        results: new Array(config.width)
          .fill(null)
          .map(() => new Array(config.height).fill(null).map(() => ({ state: CellState.Unrevealed })))
      };
    }
  }

  ngOnInit(): void {}

  revealCell(action: CellAction): void {
    if (this.gameResult) {
      return;
    }

    this.gameService.operateCell(action).subscribe(result => {
      if (!this.minefieldConfig) {
        throw new Error('[GameMainMinefield Component] Minefield config is not correctly set.');
      }

      if (result.result) {
        this.gameResult = result.result;
      }
      result.cells.forEach(cellResult => {
        this.minefieldConfig!.results[cellResult.position.x][cellResult.position.y] = cellResult.data;
      });
    });
  }

  trackByIndex<T>(index: number, item: T): number {
    return index;
  }
}
