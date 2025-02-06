import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  selectedGame: string | null = null;
  menuOpen = false;

  constructor(private router: Router) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  startGame(game: string) {
    if (game === 'balloon-pop') {
      this.router.navigate(['/games/balloon-pop']);
    }
  }
}
