import { Level } from "./level.interface";

export const Level1: Level = {
  id: 1,
  name: "Balloon Popping",
  description: "Pop as many balloons as you can!",
  minScoreToAdvance: 10,
  gameDuration: 30000,
  showScore: true,
  
  generateBalloon: () => {
    const randomX = Math.random() * 85;
    const randomSpeed = Math.random() * (10 - 6) + 6; // Between 6s and 10s

    return {
      id: Math.random(),
      style: {
        left: `${randomX}%`,
        bottom: `-5%`,
        animation: `floatUp ${randomSpeed}s linear forwards`,
        background: Level1.getRandomColor(),
        opacity: 1
      },
    };
  },

  getRandomColor: () => {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  getScoreForBalloon: () => 1,
  shouldPopBalloon: (balloon) => true,
  getBalloonBadge: () => null,

};

