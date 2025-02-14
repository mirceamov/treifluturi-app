import { Level } from "./level.interface";

export interface Level7MatchingPairs extends Level {
    emojiList: string[];
    lastPoppedBalloon: { id: number, emoji: string } | null;
    pairList?: string[]; 
}
