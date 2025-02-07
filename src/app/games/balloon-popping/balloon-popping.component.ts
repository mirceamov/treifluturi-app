import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LevelService } from "./services/level.service";
import { Level } from "./services/levels/level.interface";

@Component({
    selector: 'app-balloon-popping',
    templateUrl: './balloon-popping.component.html',
    styleUrls: ['./balloon-popping.component.scss']
})
export class BalloonPoppingComponent implements OnInit {
    currentLevel!: Level;

    gameStarted = false;
    score = 0;
    balloons: any[] = [];
    gameInterval: any;


    gameEnded = false;
    gameResultMessage = "";
    canAdvance = false;

    constructor(private router: Router, private levelService: LevelService) { }

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
    }


    startGame() {
        this.gameStarted = true;
        this.score = 0;
        this.balloons = [];

        this.spawnBalloons();

        setTimeout(() => {
            this.endGame();
        }, this.currentLevel.gameDuration);
    }

    spawnBalloons() {
        this.gameInterval = setInterval(() => {
            const newBalloon = this.currentLevel.generateBalloon(); // Use level-specific logic
            this.balloons.push(newBalloon);
        }, 1500);
    }

    endGame() {
        clearInterval(this.gameInterval);
        this.gameStarted = false;
        this.gameEnded = true; // Activăm ecranul final

        if (this.score >= this.currentLevel.minScoreToAdvance) {
            this.gameResultMessage = `🎉 You won! Your score: ${this.score}`;
            this.canAdvance = true;
        } else {
            this.gameResultMessage = `😢 Game Over! Your score: ${this.score}`;
            this.canAdvance = false;
        }
    }

    restartGame() {
        this.gameEnded = false;
        this.startGame();
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
    
        const shouldPop = this.currentLevel.shouldPopBalloon(balloon);
    
        if (shouldPop) {
            this.score += this.currentLevel.getScoreForBalloon(balloon, this);
    
            // Play pop sound
            const popSound = new Audio("assets/sounds/pop.mp3");
            popSound.play();
    
            // Get current position
            const balloonElement = document.querySelector(`.balloon[data-id='${balloon.id}']`) as HTMLElement;
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
                }, 300);
            }
        } else {
            const balloonElement = document.querySelector(`.balloon[data-id='${balloon.id}']`) as HTMLElement;
            if (balloonElement) {
                balloonElement.style.animationPlayState = "paused"; // Pause floatUp
balloonElement.classList.add("shaking"); // Apply shake effect

setTimeout(() => {
    balloonElement.classList.remove("shaking"); // Remove shake effect
    balloonElement.style.animationPlayState = "running"; // Resume floatUp
}, 200);
  
                
            }
        }
    }
    /*
        spawnBalloonsWithInterval() {
            const { min, max } = this.currentLevel.balloonSpeedRange;
            this.gameInterval = setInterval(() => {
                const randomX = Math.random() * 85;
                const randomSpeed = Math.random() * (max - min) + min;
                const randomHue = Math.floor(Math.random() * 360); // Random color
                const balloonId = Math.random();
                let bottomPosition = -5;
                const frameRate = 16.67; // 60fps update time
                const totalFrames = (randomSpeed * 1000) / frameRate; // Total frames for this balloon
                const movePerFrame = 100 / totalFrames; // How much the balloon moves per frame
    
                const newBalloon = {
                    id: balloonId,
                    style: {
                        left: `${randomX}%`,
                        bottom: `-5%`, // Start at the bottom
                    },
                    hueRotation: randomHue,
                    intervalId: null as any,
                };
    
                this.balloons.push(newBalloon);
    
                // Animate the balloon moving up
                const interval = setInterval(() => {
                    const balloon = this.balloons.find(b => b.id === balloonId);
                    if (!balloon) {
                        clearInterval(interval); // Safety check to prevent memory leaks
                        return;
                    }
    
                    bottomPosition += movePerFrame; // Moves up smoothly
                    balloon.style.bottom = `${bottomPosition}%`;
    
                    // Remove balloon when it reaches the top
                    if (bottomPosition >= 100) {
                        this.removeBalloon(balloonId, interval);
                    }
                }, frameRate);
    
                newBalloon.intervalId = interval; // Store interval reference
            }, 1500);
            
        }
    
        removeBalloon(balloonId: number, intervalId: any) {
            clearInterval(intervalId); // Stop movement interval
            this.balloons = this.balloons.filter(b => b.id !== balloonId);
        }
    
    
    
        popBalloon(balloon: any) {
            if (balloon.popped) return; // Prevent multiple clicks
    
            this.score++;
    
            const popSound = new Audio('assets/sounds/pop.mp3');
            popSound.play();
    
            const balloonIndex = this.balloons.findIndex(b => b.id === balloon.id);
            if (balloonIndex !== -1) {
                this.balloons[balloonIndex] = {
                    ...this.balloons[balloonIndex],
                    popped: true, // Prevents further clicks
                };
    
                setTimeout(() => {
                    this.removeBalloon(balloon.id, balloon.intervalId);
                    //this.balloons = this.balloons.filter(b => b.id !== balloon.id);
                }, 200);
            }
        }
    */





    getRandomColor() {
        const colors = ['#FF6F61', '#6A0572', '#FFC107', '#4CAF50', '#29B6F6', '#FF4081'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

