import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  funFact: string = '';

  funFacts: string[] = [
    "Did you know? A butterfly can see more colors than humans! 🦋",
    "Fun fact! Some dice have been found that are over 5,000 years old! 🎲",
    "Did you know? Playing games helps kids learn faster! 🧠",
    "Cool fact! The first board game was played over 4,000 years ago! 🎮",
    "Did you know? There are over 200 species of butterflies in the world! 🌍"
  ];

  ngOnInit() {
    this.generateFunFact();
  }

  generateFunFact() {
    this.funFact = this.funFacts[Math.floor(Math.random() * this.funFacts.length)];
  }
}
