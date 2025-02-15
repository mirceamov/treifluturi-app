import { Level } from "./level.interface";

export interface Level8WithSequence extends Level {
    sequenceToFind: number[];  // The correct sequence players must find
    precomputedBalloons: number[]; // Stores all balloon numbers (shuffled)
    currentSequenceIndex: number; // Tracks how far player is in the sequence
    shouldEndGame: (game: any) => boolean; // ✅ New method to determine when to stop the game

}