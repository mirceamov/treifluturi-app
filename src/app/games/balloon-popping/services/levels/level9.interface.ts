import { Level } from "./level.interface";

export interface Level9WithStars extends Level {
    starFallSpeed: { min: number; max: number };
}
