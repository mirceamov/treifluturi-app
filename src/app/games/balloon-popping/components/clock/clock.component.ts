import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  @Input() duration: number = 0; // Total time in milliseconds
  remainingTime: number = 0; // Countdown
  interval: any;
  isShaking: boolean = false;

  ngOnInit(): void {
    this.startClock();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startClock(): void {
    this.remainingTime = this.duration / 1000; // Convert ms to seconds

    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;

        if (this.remainingTime <= 5) {
          this.isShaking = true; // Start shaking at 5 seconds
        }
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
