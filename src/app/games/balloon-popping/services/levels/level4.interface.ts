import { Level } from "./level.interface";

export interface Level4WithPrecomputedBalloons extends Level {
    precomputedBalloons: any[]; // List of pre-generated balloons
    createBalloon: (isEven: boolean) => any; // Function to generate a balloon
    shuffleArray: (array: any[]) => any[]; // Function to shuffle balloons
    getMinEvenBalloonCount: (difficulty: any, minScore: number)=> number; 
}
