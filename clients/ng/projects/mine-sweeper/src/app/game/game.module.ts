import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../shared/shared.module';

import { GameComponent } from './game.component';
import { HomeComponent } from './home/home.component';
import { GameMainComponent } from './main/game-main.component';

@NgModule({
  declarations: [GameComponent, HomeComponent, GameMainComponent],
  imports: [SharedModule]
})
export class GameModule {}
