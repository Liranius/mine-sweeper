import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mswp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private readonly router: Router) {}

  startNewGame(): void {
    // TODO: Start a new game.
    this.router.navigateByUrl('/game');
  }
}
