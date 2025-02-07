import { Level } from "./level.interface";

export const Level4: Level = {
    id: 4,
    name: "Even Number Pop",
    description: "Only pop even-numbered balloons! Odd numbers will decrease your score.",
    minScoreToAdvance: 5,
    balloonSpeedRange: { min: 5, max: 8 },
    gameDuration: 60000,
  
    generateBalloon: () => {
      const number = Math.floor(Math.random() * 9) + 1; // Random number 1-9
      return {
        id: Math.random(),
        number: number,
        style: {
          left: `${Math.random() * 85}%`,
          bottom: `-5%`,
          animation: `floatUp 8s linear forwards`,
          background: Level4.getRandomColor(),
          width: "60px",
          height: "80px",
          opacity: 1,
        },
      };
    },
  
    getRandomColor: () => {
      return ["red", "blue", "green", "yellow", "purple"][
        Math.floor(Math.random() * 5)
      ];
    },
  
    isBalloonValid: () => true, // All balloons can be popped
  
    getScoreForBalloon: (balloon, game) => {
      if (balloon.number % 2 === 0) {
        return 1; // Even number = +1 point
      } else {
        return game.score > 0 ? -1 : 0; // Odd number = -1, but score can't go below 0
      }
    },
  
    shouldPopBalloon: () => true,
  
    getBalloonBadge: (balloon) => `${balloon.number}`, // Display number on balloon
  };
  