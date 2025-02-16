import { Level } from "./level.interface";

export const Level1: Level = {
  id: 1,
  name: "Balloon Popping",
  description: `Pop as many <span style="font-size: 1.5rem;">🎈</span> balloons as you can!`,
  minScoreToAdvance: 10,
  gameDuration: 60000,
  showScore: true,

  generateBalloon: () => {
    const randomX = Math.random() * 85;
    const randomSpeed = Math.random() * (10 - 6) + 6; // Between 6s and 10s

    return {
      id: Math.random(),
      className: "balloon",
      style: {
        left: `${randomX}%`,
        bottom: `-80px`,
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

