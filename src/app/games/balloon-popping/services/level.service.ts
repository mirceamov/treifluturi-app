import { Injectable } from "@angular/core";
import { Level } from "./levels/level.interface";
import { Level1, Level2, Level3, Level4 } from "./levels";

@Injectable({
  providedIn: "root",
})
export class LevelService {
  private levels: Level[] = [Level1, Level2, Level3, Level4]; // TODO Adauga nivel AICI
  private currentLevelIndex = 0;
  private score = 0;

  getCurrentLevel(): Level {
    return this.levels[this.currentLevelIndex];
  }

  resetGame() {
    this.currentLevelIndex = 0;
  }

  nextLevel(): boolean {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
      this.resetScore();
      return true;
    }
    return false;
  }

  restartLevel(): void {
    // Resetăm doar nivelul curent
    this.resetScore();
  }

  updateScore(amount: number) {
    this.score += amount;
  }
  getScore(): number {
    return this.score;
  }

  resetScore() {
    this.score = 0;
  }

  playPopSound() {
    const popSound = new Audio("assets/sounds/pop.mp3");
    popSound.play();
  }

}
