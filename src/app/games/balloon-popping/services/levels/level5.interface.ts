import { Difficulty } from "../level.service";
import { Level } from "./level.interface";

export interface LevelWithRedBalloons extends Level {
    redBalloonCount: number;
    precomputedBalloons: boolean[]; // Precomputed red balloon positions

    getMinRedBalloonCount: (difficulty: Difficulty, minScore: number) => number;
    createBalloon: (color: string) => any;
}