import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Difficulty, LevelService } from "./services/level.service";
import { Level } from "./services/levels/level.interface";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-balloon-popping',
    templateUrl: './balloon-popping.component.html',
    styleUrls: ['./balloon-popping.component.scss']
})
export class BalloonPoppingComponent implements OnInit {
    currentLevel!: Level;

    gameStarted = false;
    balloons: any[] = [];
    
    gameInterval: any;
    gameTimeout: any;

    gameEnded = false;
    gameResultMessage = "";
    canAdvance = false;

    constructor(
        public levelService: LevelService,
        private router: Router,
        private sanitizer: DomSanitizer) { }

    getSafeDescription(): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(this.levelService.getCurrentLevel().description);
    }

    getSafeHtml(text: string | null | undefined): SafeHtml {
        if(!text) return ''

        return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    goBack() {
        this.router.navigate(['/games']);
    }
    ngOnInit() {
        this.loadLevel();
    }

    ngOnDestroy() {
        this.levelService.resetGame();
    }

    loadLevel() {
        this.currentLevel = this.levelService.getCurrentLevel();

        this.gameStarted = false;
        this.gameEnded = false;
        this.levelService.resetScore();
        this.balloons = [];

        if (this.currentLevel.initLevel) {
            this.currentLevel.initLevel(this); // Initialize level-specific settings
        }
    }

    changeDifficulty(event: any) {
        const selectedDifficulty = event.target.value as Difficulty;
        this.levelService.setDifficulty(selectedDifficulty);
    }

    startGame() {        
        // ✅ Clear any previous game-ending timeout before setting a new one
        if (this.gameTimeout) {
            clearTimeout(this.gameTimeout);
        }
    
        const gameDuration = this.levelService.getGameDuration(this.currentLevel); // Set duration based on difficulty
    
        this.gameStarted = true;
        this.levelService.resetScore();
        this.balloons = [];
    
        this.spawnBalloons();
    
        console.log(gameDuration);
    
        // ✅ Store the timeout ID so we can clear it if needed
        this.gameTimeout = setTimeout(() => {
            this.endGame();
        }, gameDuration);
    }
    

    spawnBalloons() {
        this.balloons = []; // Clear previous balloons

        const spawnType = this.currentLevel.spawnType ?? "gradual"; // Default to "gradual"

        if (spawnType === "instant") {
            // Use totalItemsCount if available; otherwise, estimate based on game duration
            const totalBalloons = this.currentLevel.totalItemsCount ??
                Math.floor((this.currentLevel.gameDuration / 1000) * 3);

            for (let i = 0; i < totalBalloons; i++) {
                const newBalloon = this.currentLevel.generateBalloon(this);
                this.balloons.push(newBalloon);
            }
        } else {
            // Gradual spawn: Balloons appear over time
            const spawnRate = this.levelService.getSpawnRate();
            this.gameInterval = setInterval(() => {
                const newBalloon = this.currentLevel.generateBalloon(this);
                this.balloons.push(newBalloon);
            }, spawnRate);
        }
    }

    endGame() {
        if(this.gameInterval)
            clearInterval(this.gameInterval);

        if (this.gameTimeout) {
            clearTimeout(this.gameTimeout);
            this.gameTimeout = null;
        }

        this.gameStarted = false;
        this.gameEnded = true; // Activăm ecranul final

        if (this.levelService.getScore() >= this.currentLevel.minScoreToAdvance) {
            this.gameResultMessage = `🎉 You won! <br> Your score: ${this.levelService.getScore()}`;
            this.canAdvance = true;
        } else {
            this.gameResultMessage = `😢 Game Over! <br> Your score: ${this.levelService.getScore()}`;
            this.canAdvance = false;
        }
    }

    restartGame() {
        this.gameEnded = false;
        this.gameStarted = false;
        this.loadLevel();
    }

    nextLevel() {
        if (this.levelService.nextLevel()) {
            this.loadLevel();
            this.gameEnded = false;
        }
    }
    
    popBalloon(balloon: any) {
        if (balloon.popped) return;
    
        const balloonIndex = this.balloons.findIndex(b => b.id === balloon.id);
        if (balloonIndex === -1) return;
    
        const shouldPop = this.currentLevel.shouldPopBalloon(balloon, this);
    
        if (shouldPop) {
            this.levelService.increaseScore(this.currentLevel.getScoreForBalloon(balloon, this));
    
            // Play pop sound
            const popSound = new Audio("assets/sounds/pop.mp3");
            popSound.play();
    
            // Get current position (works for both balloons & stars)
            const balloonElement = document.querySelector(`[data-id='${balloon.id}']`) as HTMLElement;
            if (balloonElement) {
                const computedStyle = window.getComputedStyle(balloonElement);
                const currentBottom = computedStyle.getPropertyValue("bottom");
    
                this.balloons[balloonIndex] = {
                    ...this.balloons[balloonIndex],
                    style: {
                        ...this.balloons[balloonIndex].style,
                        bottom: currentBottom,
                        animation: "pop 0.3s ease-out",
                    },
                    popped: true,
                };
    
                setTimeout(() => {
                    this.balloons = this.balloons.filter(b => b.id !== balloon.id);
                    
                    if (this.currentLevel.shouldEndGame && this.currentLevel.shouldEndGame(this)) {
                        this.endGame();
                    }
                }, 300);
            }
        } else {  
            const balloonElement = document.querySelector(`[data-id='${balloon.id}']`) as HTMLElement;
            
            if (balloonElement) {
                
                // Remove and re-add class to restart animation
                balloonElement.classList.remove("shaking");
                void balloonElement.offsetWidth; // ✅ Force reflow
                balloonElement.classList.add("shaking");
        
                setTimeout(() => {
                    balloonElement.classList.remove("shaking"); // Remove shake effect
                    setTimeout(() => {
                        balloonElement.style.animationPlayState = "running"; // Resume original animation
                    }, 50);
                }, 200);
            }
        }        
    }
    

    onDifficultyChange(difficulty: Difficulty) {
        this.levelService.setDifficulty(difficulty);
        if (this.currentLevel.initLevel) {
            this.currentLevel.initLevel(this);
        }
    }

    getEndLevelMessage() {
        const msg = this.currentLevel.endLevelMessage ?? this.gameResultMessage
        return this.getSafeHtml(msg);
    }
}

