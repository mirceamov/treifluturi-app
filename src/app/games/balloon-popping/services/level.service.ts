import { Injectable } from "@angular/core";
import { Level } from "./levels/level.interface";
import { Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, Level11 } from "./levels";

export type Difficulty = "Easy" | "Normal" | "Hard";

@Injectable({
    providedIn: "root",
})
export class LevelService {
    private levels: Level[] = [
        Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, 
        Level11]; // TODO Adauga nivel AICI
        
    private currentLevelIndex = 0;
    private score = 0;
    private difficulty: Difficulty = "Easy";

    getCurrentLevel(): Level {
        return this.levels[this.currentLevelIndex];
    }

    setDifficulty(difficulty: Difficulty) {
        this.difficulty = difficulty;
    }

    getDifficulty(): Difficulty {
        return this.difficulty;
    }

    getSpawnRate(): number {
        switch (this.difficulty) {
            case "Easy": return 1500;
            case "Normal": return 1000;
            case "Hard": return 500;
            default: return 1500; // Default to Easy if not set
        }
    }

    getGameDuration(level: Level): number {
        const baseDuration = level.gameDuration; // Use level's default duration

        switch (this.difficulty) {
            case "Easy": return baseDuration; // No change
            case "Normal": return Math.floor(baseDuration * 0.75); // Reduce by 25%
            case "Hard": return Math.floor(baseDuration * 0.5); // Reduce by 50%
            default: return baseDuration; // Fallback
        }
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
        this.score = Math.max(0, this.score + amount);
    }

    getScore(): number {
        return this.score;
    }
    increaseScore(value: number): void {
        const nextScore = this.score + value;
        this.score = nextScore < 0 ? 0 : nextScore;
        
        //this.score += value;
    }
    resetScore() {
        this.score = 0;
    }

    playPopSound() {
        const popSound = new Audio("assets/sounds/pop.mp3");
        popSound.play();
    }

}
