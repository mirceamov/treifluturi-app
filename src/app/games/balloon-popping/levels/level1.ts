import { Level } from "./level.interface";

export const Level1: Level = {
  id: 1,
  name: "Balloon Popping",
  description: "Pop as many balloons as you can in one minute!",
  minScoreToAdvance: 10, // Scor minim necesar
  allowedColors: ["red", "blue", "green", "yellow", "purple"], // Orice culoare permisă
  allowFakeBalloons: false,
  requireEvenNumbers: false,
  balloonSpeedRange: { min: 6, max: 10 }, // Baloane între 6 și 10 secunde
};
