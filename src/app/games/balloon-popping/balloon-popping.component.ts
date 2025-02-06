import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balloon-popping',
  templateUrl: './balloon-popping.component.html',
  styleUrls: ['./balloon-popping.component.scss']
})
export class BalloonPoppingComponent implements OnInit {
  gameStarted = false;
  score = 0;
  balloons: any[] = [];
  gameInterval: any;
  gameDuration = 60000; // 1 minute

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/games']);
  }
  ngOnInit() {}



  startGame() {
    this.gameStarted = true;
    this.score = 0;
    this.balloons = [];

    this.spawnBalloons();

    setTimeout(() => {
      this.endGame();
    }, this.gameDuration);
  }

  spawnBalloons() {
    this.gameInterval = setInterval(() => {
      const randomX = Math.random() * 85; // Random left position
      const randomSpeed = Math.random() * 6 + 5; // Slower rise speed (8-14s)
  
      console.log(randomSpeed, randomX);
  
      const newBalloon = {
        id: Math.random(),
        style: {
          left: `${randomX}%`,
          bottom: `0%`, // Start at bottom of the container
          animation: `floatUp ${randomSpeed}s linear forwards`,
          background: this.getRandomColor(),
          opacity: 1 // Ensure full visibility
        }
      };
  
      this.balloons.push(newBalloon);
    }, 1000);
  }

  popBalloon(balloon: any) {
    this.score++;
  
    const popSound = new Audio('assets/sounds/pop.mp3');
    popSound.play();
  
    const balloonIndex = this.balloons.findIndex(b => b.id === balloon.id);
    if (balloonIndex !== -1) {
      const balloonElement = document.querySelector(`.balloon[data-id='${balloon.id}']`) as HTMLElement;
  
      if (balloonElement) {
        const computedStyle = window.getComputedStyle(balloonElement);
        const currentBottom = computedStyle.getPropertyValue("bottom");
  
        console.log(`Balon ${balloon.id} are bottom: ${currentBottom}`);
  
        this.balloons[balloonIndex] = {
          ...this.balloons[balloonIndex],
          style: {
            ...this.balloons[balloonIndex].style,
            bottom: currentBottom, // Setăm poziția curentă reală
            animation: "pop 0.3s ease-out",
          },
          popped: true,
        };
  
        setTimeout(() => {
          this.balloons = this.balloons.filter(b => b.id !== balloon.id);
        }, 300);
      }
    }
  }
  
  
  
  



  endGame() {
    clearInterval(this.gameInterval);
    this.gameStarted = false;
    alert(`Time's up! Your score: ${this.score}`);
  }

  getRandomColor() {
    const colors = ['#FF6F61', '#6A0572', '#FFC107', '#4CAF50', '#29B6F6', '#FF4081'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

