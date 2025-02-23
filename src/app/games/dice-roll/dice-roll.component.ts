import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dice-roll',
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.scss']
})
export class DiceRollComponent implements OnInit {
  @Input() numarDeZaruri: number = 2;
  dice: any[] = [];
  finalResults: number[] = [];
  isRolling = false;
  soundEnabled = true;
  rollHistory: number[][] = []; // Stores previous rolls
  statistics: { [key: number]: number } = {}; // Stores statistics
  expanded: boolean = false;
  
  showModal = false; // Controls the toggle confirmation modal

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeDice();
  }

  initializeDice() {
    this.dice = Array(this.numarDeZaruri)
      .fill(0)
      .map(() => ({
        result: '?',
        transform: 'rotateX(0deg) rotateY(0deg)'
      }));
  }

  rollDice() {
    if (this.isRolling) return;
    
    this.isRolling = true;
    
    // Keep dice as "?" during rolling
    this.dice = this.dice.map(d => ({ ...d, result: '?', transform: 'rotateX(0deg) rotateY(0deg)' }));

    // Play sound if enabled
    if (this.soundEnabled) {
      const audioSrc = this.numarDeZaruri === 1 
        ? 'assets/sounds/roll_one_die.mp3' 
        : 'assets/sounds/roll_two_dice.mp3';
      new Audio(audioSrc).play().catch(err => console.warn("Audio playback failed:", err));
    }

    // Generate random results
    this.finalResults = this.dice.map(() => Math.floor(Math.random() * 6) + 1);
  }

  onAnimationEnd(event: AnimationEvent, index: number) {
    if (event.animationName === 'diceRoll') {
      const finalResult = this.finalResults[index];
      this.dice[index] = {
        result: finalResult,
        transform: this.getTransform(finalResult)
      };

      if (this.dice.every(d => d.result !== '?')) {
        this.isRolling = false;
        this.updateHistoryAndStatistics();
      }
    }
  }

  updateHistoryAndStatistics() {
    // Add roll to history
    this.rollHistory.unshift([...this.finalResults]); // Keep history recent at the top

    // Update statistics
    if (this.numarDeZaruri === 1) {
      // Single dice mode: track counts of each number (1-6)
      this.statistics[this.finalResults[0]] = (this.statistics[this.finalResults[0]] || 0) + 1;
    } else {
      // Two dice mode: track counts of each sum (2-12)
      const sum = this.finalResults[0] + this.finalResults[1];
      this.statistics[sum] = (this.statistics[sum] || 0) + 1;
    }
  }

  sortedStatistics() {
    return Object.entries(this.statistics)
      .map(([key, value]) => ({ key: +key, value })) // Convert key to number
      .sort((a, b) => b.value - a.value); // Sort descending by most rolled
  }

  getTransform(result: number): string {
    const transforms: any = {
      1: 'rotateX(0deg) rotateY(0deg)',
      2: 'rotateX(0deg) rotateY(-90deg)',
      3: 'rotateX(0deg) rotateY(180deg)',
      4: 'rotateX(0deg) rotateY(90deg)',
      5: 'rotateX(-90deg) rotateY(0deg)',
      6: 'rotateX(90deg) rotateY(0deg)'
    };
    return transforms[result] || 'rotateX(0deg) rotateY(0deg)';
  }

  goBack() {
    this.router.navigate(['/games']);
  }

  confirmToggleDice() {
    this.showModal = true;
  }

  cancelToggle() {
    this.showModal = false;
  }

  toggleDice() {
    this.showModal = false;
    if (this.isRolling) return;
    
    // Reset history and statistics
    this.rollHistory = [];
    this.statistics = {};

    this.numarDeZaruri = this.numarDeZaruri === 2 ? 1 : 2;
    this.initializeDice();
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
  }
}
