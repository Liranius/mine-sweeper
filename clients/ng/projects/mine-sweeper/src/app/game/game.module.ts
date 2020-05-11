import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../shared/shared.module';

import { GameComponent } from './game.component';
import { HomeComponent } from './home/home.component';
import { GameMainComponent } from './main/game-main.component';
import { GameMainMinefieldCellComponent } from './main/minefield/cell/game-main-minefield-cell.component';
import { GameMainMinefieldComponent } from './main/minefield/game-main-minefield.component';

@NgModule({
  declarations: [GameComponent, HomeComponent, GameMainComponent, GameMainMinefieldComponent, GameMainMinefieldCellComponent],
  imports: [SharedModule]
})
export class GameModule {}
