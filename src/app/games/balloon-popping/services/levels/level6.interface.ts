import { Level } from "./level.interface";

export interface Level6WithMathChallenge extends Level {
    targetNumber: number; 
    correctBalloonsToFind: number;   
}
