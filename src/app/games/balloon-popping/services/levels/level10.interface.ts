import { Level } from "./level.interface";

export interface LevelWithCrazyBalloons extends Level {
    minSpeed: number;  // Minimum floating speed
    maxSpeed: number;  // Maximum floating speed
}